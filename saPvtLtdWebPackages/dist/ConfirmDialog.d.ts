import type { CSSProperties, ReactNode } from 'react';
export type ConfirmDialogType = 'danger' | 'warning' | 'info' | 'success';
export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: ConfirmDialogType;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function ConfirmDialog({ open, title, message, confirmText, cancelText, onConfirm, onCancel, type, loading, className, style, testId, }: ConfirmDialogProps): import("react").JSX.Element;
//# sourceMappingURL=ConfirmDialog.d.ts.map