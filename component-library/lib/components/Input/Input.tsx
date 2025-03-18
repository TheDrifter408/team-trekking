import React, {forwardRef, useState} from "react";
import styles from "../../styles/input.module.css";

// Omit the native 'size' attribute and use our own 'inputSize' prop instead
interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  inputSize?: "small" | "medium" | "large";
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;
  errorClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize = "medium", // Renamed from 'size' to 'inputSize'
      fullWidth = false,
      containerClassName = "",
      labelClassName = "",
      inputClassName = "",
      helperClassName = "",
      errorClassName = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    const containerClasses = [
      styles.container,
      fullWidth ? styles.fullWidth : "",
      containerClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const labelClasses = [
      styles.label,
      disabled ? styles.disabled : "",
      labelClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const inputWrapperClasses = [
      styles.inputWrapper,
      styles[variant],
      styles[inputSize], // Use inputSize here
      isFocused ? styles.focused : "",
      error ? styles.error : "",
      disabled ? styles.disabled : "",
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      styles.input,
      leftIcon ? styles.withLeftIcon : "",
      rightIcon ? styles.withRightIcon : "",
      inputClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const helperClasses = [styles.helper, helperClassName]
      .filter(Boolean)
      .join(" ");

    const errorClasses = [styles.errorMessage, errorClassName]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {label && <label className={labelClasses}>{label}</label>}
        <div className={inputWrapperClasses}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        {error ? (
          <p className={errorClasses}>{error}</p>
        ) : helper ? (
          <p className={helperClasses}>{helper}</p>
        ) : null}
      </div>
    );
  },
);
