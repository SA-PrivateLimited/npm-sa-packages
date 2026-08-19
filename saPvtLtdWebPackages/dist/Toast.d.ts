import { type ReactNode } from 'react';
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';
export interface ToastItem {
    id: string;
    message: string;
    variant: ToastVariant;
    duration?: number;
}
type ToastApi = {
    show: (message: string, variant?: ToastVariant, duration?: number) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
};
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): ToastApi;
/** Imperative helper — works after ToastProvider mounts. */
export declare const toast: ToastApi;
export {};
//# sourceMappingURL=Toast.d.ts.map