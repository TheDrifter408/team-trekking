import { forwardRef, ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import { ButtonProps } from '../../types/PropTypes.ts';
import { Spinner } from '../Common/ButtonSpinner';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcons = [],
      rightIcons = [],
      className = '',
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const buttonClass = clsx(
      'inline-flex items-center justify-start gap-3 px-2 py-2 font-semibold rounded-lg transition',
      { 'opacity-50 cursor-not-allowed': disabled },
      className
    );

    const renderIcons = (
      icons: Array<{
        icon: ReactNode;
        onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
      }>
    ) => (
      <div className="flex items-center gap-2">
        {icons.map((item, index) => (
          <span
            key={index}
            onClick={item.onClick}
            className={item.onClick ? 'cursor-pointer' : ''}
          >
            {item.icon}
          </span>
        ))}
      </div>
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        className={buttonClass}
        {...props}
      >
        {!loading && leftIcons?.length ? renderIcons(leftIcons) : null}

        {loading ? (
          <div className="flex items-center">
            <Spinner /> {children}
          </div>
        ) : (
          <span className="flex-1">{children}</span>
        )}

        {!loading && rightIcons?.length ? renderIcons(rightIcons) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
