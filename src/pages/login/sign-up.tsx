import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LockKeyhole, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout.tsx';
import { AuthCard } from './components/auth-card.tsx';
import { FormInputField } from './components/form-input.tsx';
import { signUpSchema } from '@/lib/config/validationSchema.tsx';
import { UserRole } from '@/lib/constants/app.ts';
import {
  usePostSendOtpMutation,
  usePostVerifyOtpMutation,
  usePostCreateUserMutation,
} from '@/service/rtkQuery.ts';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export const SignUp = () => {
  const navigate = useNavigate();
  const [
    sendOtp,
    { isLoading: isSendOtpLoading, isSuccess: isSendOtpSuccess },
  ] = usePostSendOtpMutation();
  const [verifyOtp] = usePostVerifyOtpMutation();
  const [createUser] = usePostCreateUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const otpType = 'REGISTRATION';
  const registrationType = 'EMAIL';
  const permissionIds = [2];

  // Initialize form with Zod schema
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const otpForm = {
      email: data.email,
      otpType: otpType,
      type: registrationType,
    };
    await sendOtp(otpForm);
    setIsOtpSent(true);
    setOtp('');
  };

  const onVerifyOtp = async () => {
    const verifyOtpForm = {
      email: form.getValues('email'),
      otpType: otpType,
      type: registrationType,
      otp: otp,
    };

    // First verify OTP
    const verifyResponse = await verifyOtp(verifyOtpForm).unwrap();

    // If verification is successful, create the user
    if (verifyResponse) {
      const createUserForm = {
        fullName: form.getValues('name'),
        email: form.getValues('email'),
        password: form.getValues('password'),
        roleId: Number(UserRole.User),
        permissionIds: permissionIds,
        otp: otp,
      };

      // Create user and navigate on success
      const createResponse = await createUser(createUserForm).unwrap();
      if (createResponse) {
        navigate('/login');
      }
    }
  };
  const onResendOtp = async () => {
    const otpForm = {
      email: form.getValues('email'),
      otpType: otpType,
      type: registrationType,
    };
    await sendOtp(otpForm);
  };

  return (
    <AuthLayout isLoginPage={false}>
      <AuthCard
        isOtpSent={isOtpSent}
        title={isOtpSent ? 'Verify your email' : 'Seconds to sign up!'}
        onGoogleClick={() => {}}
      >
        {!isSendOtpSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInputField
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                icon={User}
              />

              <FormInputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="example@site.com"
                icon={Mail}
              />

              <FormInputField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Minimum 8 characters"
                icon={LockKeyhole}
                type={showPassword ? 'text' : 'password'}
                rightElement={
                  <Button
                    variant="link"
                    type="button"
                    className="absolute right-3 text-normal top-1 hover:decoration-dashed text-indigo-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? 'Show' : 'Hide'}
                  </Button>
                }
              />

              <Button
                type="submit"
                className="w-full font-extrabold rounded-lg h-[50px] text-md bg-indigo-600 hover:bg-indigo-700"
                disabled={isSendOtpLoading}
              >
                {isSendOtpLoading ? 'Sending...' : 'Sign up'}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <p className="text-center text-sm text-gray-500">
              A verification code has been sent to your email:{' '}
              <span className="font-medium">{form.getValues('email')}</span>
            </p>

            <div className="flex flex-col items-center space-y-4">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={onVerifyOtp}
              className="w-full rounded-lg h-[50px] font-bold text-md bg-indigo-600 hover:bg-indigo-700"
              disabled={otp.length !== 6}
            >
              Verify
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                type="button"
                className="text-indigo-600 hover:text-indigo-700"
                onClick={onResendOtp}
                disabled={isSendOtpLoading}
              >
                {isSendOtpLoading ? 'Sending...' : 'Resend code'}
              </Button>
            </div>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
};
export default SignUp;
