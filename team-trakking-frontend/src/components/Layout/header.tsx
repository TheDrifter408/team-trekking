import React from 'react';
import { cn } from '@/lib/utils';

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
        'flex h-10 items-center gap-3 px-4 sm:gap-4 bg-sidebar',
        fixed && 'header-fixed peer/header fixed z-50 w-[inherit] rounded-sm',
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
};

Header.displayName = 'Header';
