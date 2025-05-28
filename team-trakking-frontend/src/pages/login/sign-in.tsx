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
import { loginSchema } from '@/lib/config/validationSchema.tsx';
import { usePostSignInMutation } from '@/service/rtkQuery.ts';
import { UserRole } from '@/lib/constants/app.ts';
import { UserResponse } from '@/types/request-response/ApiResponse.ts';
import { useTMTStore } from '@/stores/zustand/index.tsx';

export const Login = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = usePostSignInMutation();
  const { saveUser } = useTMTStore();
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialize form with Zod schema
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const loginForm = {
      ...data,
      roleId: UserRole.User,
    };
    const response = await signIn(loginForm).unwrap();
    if (response.error) {
      setErrorMessage(response.error.data.message);
    } else if (response) {
      saveUser(response as UserResponse);
      navigate('/home');
    }
  };

  const onForgotPasswordClick = () => {
    navigate('/forgot');
  };

  return (
    <AuthLayout isLoginPage={true}>
      <AuthCard title="Welcome back!" onGoogleClick={() => {}}>
        {errorMessage && (
          <p className={'text-sm text-center font-medium text-destructive'}>
            {errorMessage}
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your work email"
              icon={Mail}
            />

            <FormInputField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              icon={LockKeyhole}
              rightElement={
                <Button
                  variant="link"
                  type="button"
                  className="absolute right-3 text-normal top-1 hover:decoration-dashed text-indigo-600"
                  onClick={onForgotPasswordClick}
                >
                  Forgot Password
                </Button>
              }
            />

            <Button
              type="submit"
              className="w-full rounded-lg h-[50px] font-extrabold text-md bg-indigo-600 hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
};
