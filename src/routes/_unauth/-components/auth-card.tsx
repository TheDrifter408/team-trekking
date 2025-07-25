import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { FcGoogle } from 'react-icons/fc';

interface AuthCardProps {
  title: string;
  children: ReactNode;
  onGoogleClick?: () => void;
  isOtpSent?: boolean;
}

export const AuthCard = ({
  title,
  children,
  onGoogleClick,
  isOtpSent = false,
}: AuthCardProps) => {
  return (
    <div className="flex justify-center z-10">
      <Card className="md:w-[520px] w-[90%] border-none">
        <CardHeader className={'justify-center'}>
          <CardTitle className="text-4xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isOtpSent && (
            <div>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-base font-medium gap-2"
                onClick={onGoogleClick}
              >
                <FcGoogle size={20} />
                Continue with Google
              </Button>
              <div className="w-full mt-5 flex items-center">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-2 text-sm text-gray-300">OR</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>
            </div>
          )}

          {children}
        </CardContent>
      </Card>
    </div>
  );
};
