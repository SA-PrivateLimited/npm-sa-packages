import type { CSSProperties, ElementType, ReactNode } from 'react';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export interface CardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Padding scale. Default `md` (16px). */
    padding?: CardPadding;
    /** Hover elevation for clickable surfaces. */
    interactive?: boolean;
    /** Soft border (default true). */
    bordered?: boolean;
    as?: ElementType;
    onClick?: () => void;
    testId?: string;
}
/**
 * Lightweight surface for list rows, profile blocks, and section panels.
 * Prefer `Widget` when you need a titled header + body + footer shell.
 */
export declare function Card({ children, className, style, padding, interactive, bordered, as: Comp, onClick, testId, }: CardProps): import("react").JSX.Element;
//# sourceMappingURL=Card.d.ts.map