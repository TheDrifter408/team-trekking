import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Form } from '@/components/shadcn-ui/form';
import { LockKeyhole, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout';
import { AuthCard } from './components/auth-card';
import { FormInputField } from './components/form-input.tsx';
import { loginSchema } from '@/lib/validation/validationSchema.tsx';
import { usePostSignInMutation } from '@/service/rtkQueries/authQuery.ts';
import { UserResponse } from '@/types/request-response/auth/ApiResponse.ts';
import { useTMTStore } from '@/stores/zustand/index.tsx';
import { z } from 'zod';
import { UserRole } from '@/lib/constants/enum.ts';
import { handleMutation } from '@/lib/utils/utils.ts';
import { useWorkspaceStore } from '@/stores/zustand/workspace-store.ts';
import { useLazyWorkspaceGlobalQuery } from '@/service/rtkQueries/workspaceQuery.ts';

export const Login = () => {
  const navigate = useNavigate();
  const { setWorkspaceGlobal } = useWorkspaceStore();
  const [getWorkspaceGlobal] = useLazyWorkspaceGlobalQuery();
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

  const onSubmit = async (userData: z.infer<typeof loginSchema>) => {
    const loginForm = {
      ...userData,
      roleId: UserRole.User,
    };
    const { data, error } = await handleMutation(signIn, loginForm);
    if (data) {
      saveUser(data as UserResponse);
      const workspaceGlobal = await getWorkspaceGlobal().unwrap();
      setWorkspaceGlobal(workspaceGlobal);
      navigate('/home');
    } else if (error) {
      setErrorMessage(error.data.message);
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
    </AuthLayout>
  );
};
export default Login;
