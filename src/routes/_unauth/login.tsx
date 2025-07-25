import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Form } from '@/components/shadcn-ui/form';
import { LockKeyhole, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AuthCard } from './-components/auth-card';
import { FormInputField } from './-components/form-input.tsx';
import { loginSchema } from '@/lib/validation/validationSchema.tsx';
import { usePostSignInMutation } from '@/service/rtkQueries/authQuery.ts';
import { useLazyWorkspaceGlobalQuery } from '@/service/rtkQueries/workspaceQuery.ts';
import { UserResponse } from '@/types/request-response/auth/ApiResponse.ts';
import { useAuthStore } from '@/stores/zustand/auth-store.tsx';
import { z } from 'zod';
import { UserRole } from '@/lib/constants/enum.ts';
import { handleMutation } from '@/lib/utils/utils.ts';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';

const Login = () => {
  const navigate = useNavigate();
  const { setWorkspaceGlobal } = useWorkspaceStore();
  const [signIn, { isLoading }] = usePostSignInMutation();
  const [fetchWorkspaceGlobal] = useLazyWorkspaceGlobalQuery();
  const { saveUser } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialize form with Zod schema
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (userData: z.infer<typeof loginSchema>) => {
    const loginForm = {
      ...userData,
      roleId: UserRole.User,
    };
    const { data, error } = await handleMutation(signIn, loginForm);
    if (data) {
      saveUser(data as UserResponse);
      const response = await fetchWorkspaceGlobal().unwrap();
      setWorkspaceGlobal(response);
      navigate({ to: '/home' });
    } else if (error) {
      setErrorMessage(error.data.message);
    }
  };
  const onForgotPasswordClick = () => {
    navigate({ to: '..' });
  };

  return (
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
            type="password"
            rightElement={
              <Button
                variant="link"
                type="button"
                className="absolute right-3 text-normal top-1 hover:decoration-dashed text-indigo-600"
                onClick={onForgotPasswordClick}
              >
                Forgot Password ?
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
  );
};

export const Route = createFileRoute('/_unauth/login')({
  component: Login,
});
