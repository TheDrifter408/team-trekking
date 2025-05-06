import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LockKeyhole, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout';
import { AuthCard } from './components/auth-card';
import { FormInputField } from './components/form-input.tsx';
import { loginSchema } from '@/lib/config/validation-schema.tsx';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const isLoading = false;
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialize form with Zod schema
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async () => {};

  return (
    <AuthLayout isLoginPage={false}>
      <AuthCard
        title={'Forgot your password?'}
        isOtpSent={true}
        onGoogleClick={() => {}}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your work email"
              icon={Mail}
            />

            <Button
              type="submit"
              className="w-full rounded-lg h-[50px] font-extrabold text-md bg-indigo-600 hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Send me the link'}
            </Button>
          </form>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
};
