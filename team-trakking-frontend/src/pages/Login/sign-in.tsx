import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LockKeyhole, Mail } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout.tsx';
import { AuthCard } from './components/auth-card';
import { FormInputField } from './components/form-input.tsx';

// Define form schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(2, { message: 'Please enter your password' }),
});

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with Zod schema
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    navigate('/home');
  };

  return (
    <AuthLayout isLoginPage={true}>
      {/* MAIN => Card */}
      <AuthCard title="Welcome back!" onGoogleClick={() => {}}>
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
              type={showPassword ? 'text' : 'password'}
              rightElement={
                <Button
                  variant="link"
                  className="absolute right-3 text-normal top-1 hover:decoration-dashed text-indigo-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  Forgot Password
                </Button>
              }
            />

            <Button
              type="submit"
              className="w-full rounded-lg h-[50px] font-bold text-md bg-indigo-600 hover:bg-indigo-700"
            >
              Log In
            </Button>
          </form>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
};
