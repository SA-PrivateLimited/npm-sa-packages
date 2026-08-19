import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    block?: boolean;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Button({ variant, size, loading, block, disabled, children, className, style, testId, type, ...rest }: ButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map