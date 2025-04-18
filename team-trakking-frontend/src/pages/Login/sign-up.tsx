import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LockKeyhole, Mail, User } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout.tsx';
import { AuthCard } from './components/auth-card.tsx';
import { FormInputField } from './components/form-input.tsx';

// Define form schema with Zod - now including name field
const loginSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(2, { message: 'Please enter your password' }),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with Zod schema
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    navigate('/home');
  };

  return (
    <AuthLayout isLoginPage={false}>
      <AuthCard title="Seconds to sign up!" onGoogleClick={() => {}}>
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
              className="w-full rounded-lg h-[50px] font-bold text-md bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </Button>
          </form>
        </Form>
      </AuthCard>
    </AuthLayout>
  );
};
