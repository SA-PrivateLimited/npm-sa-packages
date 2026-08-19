import type { CSSProperties, ReactNode } from 'react';
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export interface BadgeProps {
    children?: ReactNode;
    count?: number;
    max?: number;
    variant?: BadgeVariant;
    dot?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Badge({ children, count, max, variant, dot, className, style, testId, }: BadgeProps): import("react").JSX.Element;
//# sourceMappingURL=Badge.d.ts.map