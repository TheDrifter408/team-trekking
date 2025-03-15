import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // Using children prop for the icon
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  isDisabled?: boolean;
  isLoading?: boolean;
  ariaLabel?: string; // Made optional
}

export const IconButton = ({
                             children,
                             size = 'md',
                             variant = 'default',
                             isDisabled = false,
                             isLoading = false,
                             ariaLabel,
                             className = '',
                             ...props
                           }: IconButtonProps) => {
  // Size styles that are separate from ButtonComponent
  const sizeStyles = {
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-3',
  };

  // Variant styles with modified hover effects (scale transform instead of bg-color changes)
  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 hover:scale-105 hover:shadow-md',
    ghost: 'bg-transparent text-gray-700 hover:scale-105',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:scale-105 hover:shadow-sm',
  };

  // States
  const disabledStyles = 'opacity-60 cursor-not-allowed pointer-events-none';
  const loadingStyles = 'relative cursor-wait';

  // Combine styles but avoid class names used in ButtonComponent
  const iconButtonStyles = `
    inline-flex items-center justify-center rounded-full
    transition-all duration-200 focus:outline-none  focus:ring-offset-2 focus:ring-gray-400
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${isDisabled ? disabledStyles : ''}
    ${isLoading ? loadingStyles : ''}
    ${className}
  `;

  return (
    <button
      type="button"
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel}
      className={iconButtonStyles}
      {...props}
    >
      {isLoading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-gray-700 animate-spin" />
        </span>
      ) : null}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
};