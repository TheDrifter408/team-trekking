import React, { forwardRef } from "react";
import clsx from "clsx";
import styles from "../../styles/card.module.css";
import { CardContentProps, CardFooterProps, CardHeaderProps, CardProps } from "../../types";

const CardHeader: React.FC<CardHeaderProps> = ({
                                                 children,
                                                 className = "",
                                                 title,
                                                 subtitle,
                                                 action,
                                                 bordered = false,
                                               }) => {
  return (
      <div className={clsx(styles.cardHeader, bordered && styles.bordered, className)}>
        {(title || subtitle) && (
            <div className={styles.headerContent}>
              {title && <div className={styles.headerTitle}>{title}</div>}
              {subtitle && <div className={styles.headerSubtitle}>{subtitle}</div>}
            </div>
        )}
        {children}
        {action && <div className={styles.headerAction}>{action}</div>}
      </div>
  );
};

const CardContent: React.FC<CardContentProps> = ({ children, className = "", noPadding = false }) => {
  return <div className={clsx(styles.cardContent, noPadding && styles.noPadding, className)}>{children}</div>;
};

const CardFooter: React.FC<CardFooterProps> = ({ children, className = "", bordered = false, align = "between" }) => {
  return (
      <div className={clsx(styles.cardFooter, bordered && styles.bordered, styles[`align-${align}`], className)}>
        {children}
      </div>
  );
};

// Define the Card component with forwardRef
const CardComponent = forwardRef<HTMLDivElement, CardProps>(
    (
        {
          children,
          variant = "default",
          cardSize = "medium",
          className = "",
          padding = "medium",
          onClick,
          interactive = false,
          hoverable = false,
          bordered = false,
          shadow = "md",
          radius = "md",
        },
        ref
    ) => {
      const cardClasses = clsx(
          styles.card,
          styles[`variant-${variant}`],
          styles[`size-${cardSize}`],
          styles[`padding-${padding}`],
          styles[`shadow-${shadow}`],
          styles[`radius-${radius}`],
          interactive && styles.interactive,
          hoverable && styles.hoverable,
          bordered && styles.bordered,
          className
      );

      return (
          <div
              ref={ref}
              className={cardClasses}
              onClick={onClick}
              role={onClick ? "button" : undefined}
              tabIndex={onClick ? 0 : undefined}
          >
            {children}
          </div>
      );
    }
);

// Attach subcomponents properly
export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});

Card.displayName = "Card";

export default Card;
