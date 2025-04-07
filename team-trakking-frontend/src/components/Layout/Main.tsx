import React from 'react';
import { cn } from '@/lib/utils';

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Main = ({ fixed, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        !fixed && 'flex flex-row', // Apply row layout when not fixed
        fixed && 'fixed-main flex flex-col overflow-hidden' // Apply column layout when fixed
      )}
      {...props}
    />
  );
};

Main.displayName = 'Main';
