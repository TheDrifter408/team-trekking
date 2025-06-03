import React from 'react';
import { cn } from '@/lib/utils';

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Main = ({ fixed = true, className, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-20',
        'px-1 py-5',
        fixed && 'fixed-main flex flex-grow flex-col',
        'border-t border-l rounded-sm',
        'w-full overflow-auto', // Changed from overflow-x-auto to overflow-auto
        className
      )}
      {...props}
    />
  );
};
Main.displayName = 'Main';
