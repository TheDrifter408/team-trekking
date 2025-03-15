import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useLoginMutation, useSignupMutation } from '@store/services/auth.ts';

export function useAuth() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [error, setError] = useState<Error | null>(null);

  const authenticate = async(isLogin: boolean, email:string, password: string) => {
    const auth = isLogin ? login : signup;
    const result = await auth({email, password})
    if(result){
      navigate('/home')
    }else {
      setError(result);
    }
  }

  const handleSocialAuth = async () => {
    console.log('Authenticated with provider')
  }

  return {
    authenticate,
    handleSocialAuth,
    error,
  }
}