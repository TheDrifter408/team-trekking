import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  isLoginPage?: boolean;
}

export const AuthLayout = ({
  children,
  isLoginPage = true,
}: AuthLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-8 min-h-screen bg-accent">
      {/* Header */}
      <div className="flex sticky top-0 justify-between items-center h-24">
        <div className="flex flex-col">
          <p className="font-bold text-2xl">Team Trekking</p>
          <span className="font-medium text-base">
            The everything app for work
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-base font-medium">
            {isLoginPage
              ? "Don't have an account?"
              : 'Already playing with Team Trekking?'}
          </span>
          <Button
            size="lg"
            onClick={() => navigate(isLoginPage ? '/signup' : '/login')}
            className="text-base bg-indigo-600 !font-extrabold hover:bg-indigo-700 rounded-[9px] shadow-[0_10px_25px_#6347ea80]"
          >
            {isLoginPage ? 'Sign up' : 'Login'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <div className="justify-center flex pb-20">
        <span className={'text-sm'}>
          {isLoginPage
            ? "Don't have an account ?"
            : 'Already have an account ?'}
          <Button
            variant={'link'}
            className={'m-0 text-sm'}
            onClick={() => navigate(isLoginPage ? '/signup' : '/login')}
          >
            {isLoginPage ? 'Sign up' : 'Login'}
          </Button>
        </span>
      </div>
    </div>
  );
};
