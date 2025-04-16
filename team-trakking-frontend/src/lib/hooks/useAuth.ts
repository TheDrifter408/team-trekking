import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} from '@/stores/services/auth.ts';

export const useAuth = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [logout] = useLogoutMutation();
  const [error, setError] = useState<Error | null>(null);

  const authenticate = async (
    isLogin: boolean,
    email: string,
    password: string
  ) => {
    const auth = isLogin ? login : signup;
    const result = await auth({ email, password });
    if (result) {
      navigate('/home');
    } else {
      setError(result);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSocialAuth = async () => {
    console.log('Authenticated with provider');
  };

  return {
    authenticate,
    handleSocialAuth,
    handleLogout,
    error,
  };
};
