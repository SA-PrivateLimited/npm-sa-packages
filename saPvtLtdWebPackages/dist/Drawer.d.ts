import type { CSSProperties, ReactNode } from 'react';
export type DrawerSide = 'left' | 'right' | 'bottom';
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    side?: DrawerSide;
    title?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    showClose?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Drawer({ open, onClose, side, title, children, footer, showClose, className, style, testId, }: DrawerProps): import("react").JSX.Element | null;
//# sourceMappingURL=Drawer.d.ts.map