import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Eye, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout';
import { AuthCard } from './components/auth-card';
import { FormInputField } from './components/form-input.tsx';
import { emailInputSchema, passwordResetSchema } from '@/lib/config/validationSchema.tsx';
import { usePostForgotPasswordMutation, usePostSendOtpMutation, usePostVerifyOtpMutation } from '@/service/rtkQuery.ts';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { z } from 'zod';
import { LABEL } from '@/lib/constants/strings.ts';
import { OtpType, RegistrationType, UserRole } from '@/lib/constants/app.ts';
import { toast } from 'sonner';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [
    sendOtp,
    { isLoading: isSendOtpLoading },
  ] = usePostSendOtpMutation();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verifyOtp, { isLoading:isVerifyOtpLoading }] = usePostVerifyOtpMutation();
  const [passwordReset, { isLoading:isPasswordResetLoading } ] = usePostForgotPasswordMutation();
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'new_password'>('email');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const otpType = OtpType.PASSWORD_REST;
  const registrationType = RegistrationType.EMAIL;

  // Initialize form for email submission
  const form = useForm({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: '',
    },
  });

  const passwordResetForm = useForm({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password:'',
      confirmPassword:''
    }
  });
  
  const onSubmit = async (data:z.infer<typeof emailInputSchema>) => {
    const otpForm = {
      email: data.email,
      otpType: otpType,
      type: registrationType,
    };
    await sendOtp(otpForm);
    setIsOtpSent(true);
    setStep('otp');
    setErrorMessage(null);
  };

  const onVerifyOtp = async () => {
    const verifyOtpForm = {
      email: form.getValues('email'),
      otpType: otpType,
      type: registrationType,
      otp: otp,
    };
    // First verify OTP
    try {
      await verifyOtp(verifyOtpForm);
      setStep('new_password');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to Verify OTP'); 
    }
    
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
      setErrorMessage(error.message || LABEL.FAILED_TO_SEND_VERIFICATION_CODE);
    }
  };

  const onPasswordResetSubmit = async (data:z.infer<typeof passwordResetSchema>) => {
    const resetPasswordForm = {
      ...data,
      email: form.getValues('email'),
      otp:otp,
      roleId: UserRole.User
    }
    try {
      await passwordReset(resetPasswordForm);
      toast.success('Password has been reset!');
      navigate('/home');
    } catch (error) {
      toast.error('Something went wrong please try again.');
    }
  }

  return (
    <AuthLayout isLoginPage={false}>
      <AuthCard
        title={isOtpSent ? LABEL.VERIFY_YOUR_EMAIL : LABEL.FORGOT_YOUR_PASSWORD }
        isOtpSent={true}
        onGoogleClick={() => {}}
      >
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm rounded border border-red-200">
            {errorMessage}
          </div>
        )}

        {/* Step 1: Email Submission */}
        {step === 'email' && (
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
                {isSendOtpLoading ? LABEL.SENDING : LABEL.SEND_VERIFICATION_CODE}
              </Button>
            </form>
          </Form>
        )}

        {/* Step 2: OTP Input */}
        { step === 'otp' && (
          <div className="space-y-6">
            <p className="text-center text-sm text-gray-500">
              {LABEL.WE_JUST_EMAILED_YOU}:{' '}
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
              onClick={onVerifyOtp}
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
                {isSendOtpLoading ? LABEL.SENDING : LABEL.RESENDING_CODE }
              </Button>
            </div>
          </div>
        )}
        { /* Step 3: Input new Password */}
        { step === 'new_password' && (
          <Form {...passwordResetForm}>
            <form onSubmit={passwordResetForm.handleSubmit(onPasswordResetSubmit)} className="space-y-4">
              <FormInputField
                control={passwordResetForm.control}
                name="password"
                label="Password"
                placeholder='Enter your new password'
                icon={Eye}
              />
              <FormInputField
                control={passwordResetForm.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                icon={Eye}
              />
              <Button type="submit"
              className='w-full rounded-lg h-[50px] font-bold text-md bg-indigo-600 hover:bg-indigo-700' disabled={isPasswordResetLoading}>
                { isPasswordResetLoading ? LABEL.SENDING : LABEL.SEND }
              </Button>
            </form>
          </Form>
        )}
      </AuthCard>
    </AuthLayout>
  );
};
export default ForgotPassword;
