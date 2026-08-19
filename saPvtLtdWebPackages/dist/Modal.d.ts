import { type CSSProperties, type ReactNode } from 'react';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    /** Close when backdrop is clicked (default true). */
    closeOnBackdrop?: boolean;
    /** Close on Escape (default true). */
    closeOnEscape?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Modal({ open, onClose, children, closeOnBackdrop, closeOnEscape, className, style, testId, }: ModalProps): import("react").JSX.Element | null;
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    showClose?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Dialog({ open, onClose, title, children, footer, showClose, className, style, testId, }: DialogProps): import("react").JSX.Element;
//# sourceMappingURL=Modal.d.ts.map