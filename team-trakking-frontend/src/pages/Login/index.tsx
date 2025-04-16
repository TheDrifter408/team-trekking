import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/hooks/use-auth.ts';
import {
  GoogleIcon,
  GithubIcon,
  IllustrationIcon,
  AuthIcon,
} from '@/assets/icons';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const { authenticate } = useAuth();

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authenticate(activeTab === 'login', email, password);
  };

  const onHandleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onHandlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onHandleSocialAuth = () => {
    console.log('Social Auth triggered');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Left side - Promotional content */}
      <div className="hidden items-center justify-center bg-indigo-600 p-12 md:flex md:w-1/2">
        <div className="max-w-md">
          <h1 className="mb-6 text-4xl font-bold text-white">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-indigo-100">
            Streamline your workflow and boost productivity with our powerful
            tools.
          </p>
          <div className="mt-12 flex h-64 items-center justify-center rounded-lg bg-indigo-500">
            <IllustrationIcon />
          </div>
        </div>
      </div>

      {/* Right side - Authentication form */}
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <AuthIcon />
          </div>

          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <form onSubmit={onHandleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={onHandleEmailChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={onHandlePasswordChange}
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                      >
                        {activeTab === 'login' ? 'Sign in' : 'Create account'}
                      </Button>

                      <div>
                        <div className="relative my-4">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="bg-background px-2 text-muted-foreground">
                              Or continue with
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => onHandleSocialAuth()}
                            className="w-full"
                          >
                            <GithubIcon />
                            Github
                          </Button>
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => onHandleSocialAuth()}
                            className="w-full"
                          >
                            <GoogleIcon />
                            Google
                          </Button>
                        </div>
                      </div>

                      <div className="text-center text-sm">
                        <Button
                          variant="link"
                          type="button"
                          onClick={() =>
                            setActiveTab(
                              activeTab === 'login' ? 'signup' : 'login'
                            )
                          }
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {activeTab === 'login'
                            ? "Don't have an account? Sign up"
                            : 'Already have an account? Login'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
