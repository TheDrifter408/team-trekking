import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Button, IconButton} from '@/components/index'
import { useThemeStore } from '@store/zustand';
import {useAuth} from '@/hooks/useAuth'
import {GoogleIcon, GithubIcon, SunIcon, MoonIcon, IllustrationIcon, AuthIcon} from '@/assets/icons/Icons'


export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { currentTheme, setTheme } = useThemeStore();
  const {authenticate, handleSocialAuth} = useAuth();

  // Check system preference for dark mode on component mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme || 'light');
  }, [currentTheme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authenticate(isLogin, email, password);
  };

  const toggleDarkMode = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Example of toggling between themes
    setTheme(newTheme);
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen bg-bg-primary`}>

      {/* Left side - Brand/Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to Our Platform</h1>
          <p className="text-lg text-indigo-100">
            Streamline your workflow and boost productivity with our powerful tools.
          </p>

          {/* Illustration placeholder */}
          <div className="mt-12 h-64 bg-indigo-500 rounded-lg flex items-center justify-center">
            <IllustrationIcon />
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex flex-col w-full md:w-1/2 p-8 md:p-12 justify-center">
        {/* Dark mode toggle */}
        <div className="absolute top-4 right-4">
          <IconButton
            onClick={toggleDarkMode}
            className={`rounded-5 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-50 text-gray-700'}`}
            ariaLabel={'theme'}
          >
            {
              darkMode ? (
                <SunIcon/>
              ) : (
                <MoonIcon/>
              )
            }
          </IconButton>
        </div>

        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <AuthIcon />
            <h2 className="mt-2 text-3xl font-bold">Auth System</h2>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 ">
            <Button
              variant={'ghost'}
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0 ${isLogin ? "border-b-2 border-indigo-600" : "border-b-2 text-text-muted border-gray-500"}`}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "ghost" : "ghost"}
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0 ${!isLogin ? "border-b-2 border-indigo-600" : "border-b-2 text-text-muted border-gray-500"}`}
            >
              Sign Up
            </Button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email-address"
                    className={`block text-sm font-medium text-text-muted`}
                  >
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm sm:text-sm  focus:border-indigo-500 focus:ring-indigo-500  bg-bg-inverted text-text-default`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium text-text-muted`}
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm sm:text-sm  focus:border-indigo-500 focus:ring-indigo-500  bg-bg-inverted text-text-default`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button fullWidth >{isLogin ? 'Sign in' : 'Create account'}</Button>

              {/* Social auth */}
              <div>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-2 text-text-primary bg-bg-primary`}>Or continue with</span>
                  </div>
                </div>

                <div className="w-full flex ">

                  <Button
                    variant={'outline'}

                    onClick={() => handleSocialAuth()}
                    leftIcons={[{ icon: <GithubIcon />, onClick: () => handleSocialAuth() }]}
                    className="p-2 mx-1 w-50 rounded-md flex items-center justify-between  bg-bg-inverted border border-border-primary text-text-default"
                  >
                    <div className={'flex-grow text-left ml-2'}>Github</div>
                  </Button>
                  <Button
                    variant={'outline'}
                    onClick={() => handleSocialAuth()}
                    leftIcons={[{ icon: <GoogleIcon />, onClick: () => handleSocialAuth() }]}
                    className="p-2 mx-1 w-50 rounded-md flex items-center justify-between  bg-bg-inverted border border-border-primary text-text-default gap-2"
                  >
                    <div className={'flex-grow text-left ml-2'}>Google</div>
                  </Button>

                </div>
              </div>

              {/* Switch between login and signup */}
              <div className="text-center mt-6">
                <Button
                  variant={'link'}
                  fullWidth
                  onClick={() => setIsLogin(!isLogin)}
                  className={`text-sm flex font-medium`}
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Login'}
                </Button>
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}