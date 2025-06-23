import React from 'react';
import { cn } from '@/lib/utils/utils.ts';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={cn(
        'flex h-10 items-center gap-3  px-4 sm:gap-4 bg-green-300',
        fixed && 'header-fixed peer/header fixed w-[inherit] rounded-sm',
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
};

Header.displayName = 'Header';
