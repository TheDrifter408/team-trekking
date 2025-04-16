import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';

import React from 'react';

export const PageHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Header
      className={cn(
        offset > 10
          ? 'shadow-[0_6px_8px_-2px_rgba(0,0,0,0.1)]'
          : 'shadow-[0_2px_2px_-2px_rgba(0,0,0,0.1)]',
        'z-40 fixed top-8 h-auto w-[inherit]  ',
        className
      )}
    >
      {children}
    </Header>
  );
};
