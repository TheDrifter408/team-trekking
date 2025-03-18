import React, {ReactNode} from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcons?: { icon: ReactNode; onClick?: (e: React.MouseEvent) => void }[];
  rightIcons?: { icon: ReactNode; onClick?: (e: React.MouseEvent) => void }[];
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outlined" | "elevated";
  cardSize?: "small" | "medium" | "large";
  className?: string;
  padding?: "none" | "small" | "medium" | "large";
  onClick?: () => void;
  interactive?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
}

export interface CardHeaderProps {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  bordered?: boolean;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
}
export type Column = {
  key: string;
  header: string;
  render?: (row: any) => React.ReactNode;
  sticky?: boolean;
};

export type DynamicTableProps = {
  columns: Column[];
  data: any[];
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  maxWidth?: number;
  scrollbarTheme?: "custom" | "dark" | "primary";
  showLeftButton?: boolean;
  leftButtonText?: string;
  leftButtonOnClick?: () => void;
  leftButtonDisabled?: boolean;
  leftButtonVariant?: "ghost" | "primary" | "secondary";
  showRightButton?: boolean;
  rightButtonText?: string;
  rightButtonOnClick?: () => void;
  rightButtonDisabled?: boolean;
  rightButtonVariant?: "ghost" | "primary" | "secondary";
}
