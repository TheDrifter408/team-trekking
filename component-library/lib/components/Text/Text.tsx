import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "body-large"
    | "body-small"
    | "caption"
    | "label";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "subtle"
    | "info"
    | "success"
    | "warning"
    | "error";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  truncate?: boolean;
  className?: string;
  component?: React.ElementType;
  as?: React.ElementType;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  color = "default",
  weight = "normal",
  align = "left",
  truncate = false,
  className = "",
  component,
  as,
  ...props
}) => {
  const Component = component || as || getDefaultComponent(variant);

  // Variant classes
  const variantClasses = {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-base",
    body: "text-base",
    "body-large": "text-lg",
    "body-small": "text-sm",
    caption: "text-xs",
    label: "text-sm",
  };

  // Color classes
  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    subtle: "text-gray-500",
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-amber-500",
    error: "text-red-500",
  };

  // Weight classes
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  // Alignment classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Truncate class
  const truncateClass = truncate ? "truncate" : "";

  // Combine all classes
  const classes = [
    variantClasses[variant as keyof typeof variantClasses] || "",
    colorClasses[color as keyof typeof colorClasses] || "",
    weightClasses[weight as keyof typeof weightClasses] || "",
    alignClasses[align as keyof typeof alignClasses] || "",
    truncateClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

function getDefaultComponent(variant: string): React.ElementType {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return variant;
    case "body":
    case "body-large":
    case "body-small":
    case "caption":
      return "p";
    case "label":
      return "label";
    default:
      return "span";
  }
}

export default Text;
