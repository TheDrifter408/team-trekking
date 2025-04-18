import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { Mail, LockKeyhole, User } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './components/auth-layout.tsx';

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

  const onSubmit = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log(values);
    navigate('/home');
  };

  return (
    <AuthLayout isLoginPage={false}>
      {/* MAIN => Card */}
      <div className="flex justify-center">
        <Card className="lg:w-[480px] w-[360px] border-none">
          <CardHeader className={'justify-center'}>
            <CardTitle className="text-4xl font-bold">
              Seconds to sign up!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-gray-300 text-base font-medium gap-2"
            >
              <FcGoogle size={20} />
              Continue with Google
            </Button>

            <div className="w-full flex items-center">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-sm text-gray-300">OR</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Added Name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="pl-10 py-5 placeholder:text-base placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            placeholder="example@site.com"
                            className="pl-10 py-5 placeholder:text-base placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Password</Label>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Minimum 8 characters"
                            className="pl-10 py-5 placeholder:text-base placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          variant="link"
                          type={'button'}
                          className="absolute right-3 text-normal top-1 hover:decoration-dashed text-indigo-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? 'Show' : 'Hide'}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type={'submit'}
                  className="w-full rounded-lg h-[50px] font-bold text-md bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};
