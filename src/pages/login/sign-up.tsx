import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LockKeyhole, Mail, MailCheck, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout.tsx';
import { AuthCard } from './components/auth-card.tsx';
import { FormInputField } from './components/form-input.tsx';
import { signUpSchema } from '@/lib/validation/validationSchema.tsx';
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
import { LABEL } from '@/lib/constants/appStrings.ts';
import { z } from 'zod';
import { OtpType, RegistrationType, UserRole } from '@/lib/constants/enum.ts';

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
  const otpType = OtpType.REGISTRATION;
  const registrationType = RegistrationType.EMAIL;
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

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
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
        navigate('/home');
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
        title={isOtpSent ? LABEL.VERIFY_YOUR_EMAIL : LABEL.SECONDS_TO_SIGN_UP}
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
                {isSendOtpLoading ? LABEL.SENDING : LABEL.SIGN_UP}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <MailCheck className="mx-auto sm:w-16 sm:h-16 lg:w-14 lg:h-14" />
            <div>
              <p className="font-semibold text-3xl text-gray-600">
                {LABEL.WE_JUST_EMAILED_YOU}
              </p>
              <p className="text-sm text-gray-500">
                {LABEL.PLEASE_ENTER_THE_CODE_WE_JUST_EMAILED_YOU}: <br />
                <span className="font-medium text-base">
                  {form.getValues('email')
                    ? form.getValues('email')
                    : 'dummy@gmail.com'}
                </span>
              </p>
              <p className="text-gray-500 mt-4">{LABEL.CONFIRMATION_CODE}</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
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
              {LABEL.VERIFY}
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                type="button"
                className="text-indigo-600 hover:text-indigo-700"
                onClick={onResendOtp}
                disabled={isSendOtpLoading}
              >
                {isSendOtpLoading ? LABEL.SENDING : LABEL.RESENDING_CODE}
              </Button>
            </div>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
};
export default SignUp;
