import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/assets/iconPath';
import { LABEL } from '@/lib/constants/strings.ts';
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
    <div className="h-screen bg-accent relative z-0">
      <div className="absolute top-0 left-0 -z-50 w-screen h-screen inset-0 overflow-hidden">
        <Icon name="signUpBg" className="h-full w-full scale-x-105 translate-y-28" />
      </div>
      {/* Header */}
      <div className="px-8 flex sticky top-0 justify-between items-center h-24">
        <div className="flex flex-col">
          <p className="font-bold text-xl">Team Trekking</p>
          <span className="font-medium text-base hidden md:flex">
            The everything app for work
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-base font-medium text-right">
            {isLoginPage
              ? LABEL.DONT_HAVE_AN_ACCOUNT
              : LABEL.ALREADY_A_MEMBER }
          </span>
          <Button
            size="lg"
            onClick={() => navigate(isLoginPage ? '/signup' : '/login')}
            className="text-base bg-indigo-600 !font-extrabold hover:bg-indigo-700 rounded-[9px] shadow-[0_10px_25px_#6347ea80]"
          >
            {isLoginPage ? LABEL.SIGN_UP : LABEL.LOGIN }
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {children}
      
      {/* Footer */}
      <div className="justify-center flex relative z-10">
        <span className={'text-sm text-white'}>
          {isLoginPage
            ? LABEL.DONT_HAVE_AN_ACCOUNT
            : LABEL.ALREADY_HAVE_AN_ACCOUNT}
          <Button
            variant={'link'}
            className={'m-0 text-sm text-white'}
            onClick={() => navigate(isLoginPage ? '/signup' : '/login')}
          >
            {isLoginPage ? LABEL.SIGN_UP : LABEL.LOGIN}
          </Button>
        </span>
      </div>
    </div>
  );
};
