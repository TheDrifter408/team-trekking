import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout';
import { AuthCard } from './components/auth-card';
import { FormInputField } from './components/form-input.tsx';
import { emailInputSchema } from '@/lib/config/validationSchema.tsx';
import { usePostSendOtpMutation } from '@/service/rtkQuery.ts';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [
    sendOtp,
    { isLoading: isSendOtpLoading, isSuccess: isSendOtpSuccess },
  ] = usePostSendOtpMutation();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const otpType = 'PASSWORD_RESET';
  const registrationType = 'EMAIL';

  // Initialize form for email submission
  const form = useForm({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('data', data);

    const otpForm = {
      email: data.email,
      otpType: otpType,
      type: registrationType,
    };
    await sendOtp(otpForm);
    setIsOtpSent(true);
    setOtp('');
    setErrorMessage(null);
  };

  const onResendOtp = async () => {
    try {
      const otpForm = {
        email: form.getValues('email'),
        otpType: otpType,
        type: registrationType,
      };
      await sendOtp(otpForm);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to resend verification code');
    }
  };

  return (
    <AuthLayout isLoginPage={false}>
      <AuthCard
        title={isOtpSent ? 'Verify your email' : 'Forgot your password?'}
        isOtpSent={true}
        onGoogleClick={() => {}}
      >
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm rounded border border-red-200">
            {errorMessage}
          </div>
        )}

        {/* Step 1: Email Submission */}
        {!isSendOtpSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email address"
                icon={Mail}
              />

              <Button
                type="submit"
                className="w-full rounded-lg h-[50px] font-extrabold text-md bg-indigo-600 hover:bg-indigo-700"
                disabled={isSendOtpLoading}
              >
                {isSendOtpLoading ? 'Sending...' : 'Send verification code'}
              </Button>
            </form>
          </Form>
        ) : (
          /* Step 2: OTP Input */
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
              className="w-full rounded-lg h-[50px] font-bold text-md bg-indigo-600 hover:bg-indigo-700"
              disabled={otp.length !== 6}
            >
              Continue
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
