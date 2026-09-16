import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonArrow = boolean | 'chevron_right' | 'arrow_forward';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    block?: boolean;
    /** Trailing directional arrow for navigation CTAs. Off by default. */
    arrow?: ButtonArrow;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Button({ variant, size, loading, block, arrow, disabled, children, className, style, testId, type, ...rest }: ButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map