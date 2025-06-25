import * as React from 'react';
import { cn } from '@/lib/utils/utils.ts';
import { Icon } from '@/assets/icon-path';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-content-tertiary selection:bg-theme-main-light selection:text-primary dark:bg-input/30 border-input flex h-7 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-theme-main-light focus-visible:ring-theme-main-dark focus-visible:ring-[1px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

interface InputIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode | string;
  className?: string;
  iconClassName?: string;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  ({ icon, iconClassName, className, ...props }, ref) => {
    const resolvedIcon =
      typeof icon === 'string' ? (
        <Icon
          name={icon as never}
          className={cn(iconClassName, 'transition-colors')}
        />
      ) : (
        icon
      );
    return (
      <div className="relative focus-within:text-theme-main-dark text-content-tertiary transition-colors">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {resolvedIcon}
        </div>
        <Input
          ref={ref}
          className={cn('pl-10 !text-content-default', className)}
          {...props}
        />
      </div>
    );
  }
);

InputIcon.displayName = 'InputIcon';

export { Input, InputIcon };
