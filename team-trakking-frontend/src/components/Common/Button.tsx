import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@library/components';

export type IconWithHandler = {
  icon: ReactNode;
  onClick?: () => void;
};

// Define variants and their corresponding styles
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcons?: IconWithHandler[];
  rightIcons?: IconWithHandler[];
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
}

export const ButtonComponent = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcons,
  rightIcons,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  // Base button styles that apply to all variants
  const baseStyles = 'font-medium rounded-2 transition-colors';

  const sizeStyles = {
    sm: 'w-8 h-8 ',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-gray-200 shadow-sm ',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    outline:
      'border border-gray-300  bg-bg-inverted border border-border-primary text-text-default',
    ghost: 'text-indigo-500',
    link: 'text-indigo-500 hover:text-indigo-700  p-0',
  };

  // Disabled styles
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  // Loading styles
  const loadingStyles = 'relative !text-transparent';
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : 'w-fit';

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${isDisabled ? disabledStyles : ''}
    ${isLoading ? loadingStyles : ''}
    ${widthStyles}
    ${className}
  `;

  return (
    <Button
      className={buttonStyles}
      leftIcons={leftIcons}
      rightIcons={rightIcons}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {children}
    </Button>
  );
};
