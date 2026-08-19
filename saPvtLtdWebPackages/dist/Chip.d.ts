import type { CSSProperties, ReactNode } from 'react';
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export interface ChipProps {
    label: ReactNode;
    variant?: ChipVariant;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    onClose?: () => void;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
/** Compact label / filter / tag chip. */
export declare function Chip({ label, variant, selected, disabled, onClick, onClose, className, style, testId, }: ChipProps): import("react").JSX.Element;
export interface ChipsProps {
    children: ReactNode;
    className?: string;
    /** When true, chips wrap onto multiple lines. */
    wrap?: boolean;
}
/** Horizontal chip group / filter row. */
export declare function Chips({ children, className, wrap }: ChipsProps): import("react").JSX.Element;
//# sourceMappingURL=Chip.d.ts.map