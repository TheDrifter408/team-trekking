import { Input } from "@library/components";
import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type InputVariant = 
    | "primary" 
    | "secondary"
;
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?:ReactNode,
    variant?:InputVariant,
    className?: string,
    wrapperClasses?:string
}

export const InputComponent = ({ children, variant = 'primary', wrapperClasses, className, ...props } : InputProps) => {
    
    const variantStyles = {
        primary: ' rounded-md bg-bg-inverted px-3 py-2 text-text-default shadow-sm',
        secondary: ' rounded-md bg-bg-secondary px-3 py-2 text-text-muted shadow-sm'
    }
    
    return (
        // Wrapper flexbox container
        <div className={clsx("relative flex w-full",wrapperClasses)}>
            <Input fullWidth className={clsx("flex-1",variantStyles[variant], className)}  {...props} />
            {children && <div className="">{children}</div>}
        </div>
    )
}