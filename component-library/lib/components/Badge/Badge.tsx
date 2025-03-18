// Badge.tsx
import React from 'react';
import styles from '../../styles/Badge.module.css';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'custom';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeStyles {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  hoverOpacity?: number;
  boxShadow?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  opacity?: number;
  transition?: string;
}

export interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  outlined?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  // Custom styling
  customStyles?: BadgeStyles;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  outlined = false,
  className = '',
  icon,
  iconPosition = 'left',
  onClick,
  customStyles = {},
  style = {},
}) => {
  const badgeClasses = [
    styles.badge,
    variant !== 'custom' ? styles[`badge-${variant}`] : '',
    styles[`badge-${size}`],
    rounded ? styles.rounded : '',
    variant !== 'custom' && outlined ? styles.outlined : '',
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Combine custom styles with inline styles
  const combinedStyles: React.CSSProperties = {
    ...(customStyles.backgroundColor && {
      backgroundColor: customStyles.backgroundColor,
    }),
    ...(customStyles.textColor && { color: customStyles.textColor }),
    ...(customStyles.borderColor && { borderColor: customStyles.borderColor }),
    ...(customStyles.borderWidth && { borderWidth: customStyles.borderWidth }),
    ...(customStyles.boxShadow && { boxShadow: customStyles.boxShadow }),
    ...(customStyles.fontWeight && { fontWeight: customStyles.fontWeight }),
    ...(customStyles.letterSpacing && {
      letterSpacing: customStyles.letterSpacing,
    }),
    ...(customStyles.opacity && { opacity: customStyles.opacity }),
    ...(customStyles.transition && { transition: customStyles.transition }),
    ...style,
  };

  // Create a style object for hover effects to be applied via CSS variables
  const hoverStyleVars = {
    ...(customStyles.hoverBackgroundColor && {
      '--hover-bg-color': customStyles.hoverBackgroundColor,
    }),
    ...(customStyles.hoverTextColor && {
      '--hover-text-color': customStyles.hoverTextColor,
    }),
    ...(customStyles.hoverBorderColor && {
      '--hover-border-color': customStyles.hoverBorderColor,
    }),
    ...(customStyles.hoverOpacity !== undefined && {
      '--hover-opacity': customStyles.hoverOpacity.toString(),
    }),
  } as React.CSSProperties;

  // Merge all styles
  const finalStyles = {
    ...combinedStyles,
    ...hoverStyleVars,
  };

  return (
    <span
      className={badgeClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      style={finalStyles}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      <span className={styles.text}>{text}</span>
      {icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </span>
  );
};

export default Badge;
