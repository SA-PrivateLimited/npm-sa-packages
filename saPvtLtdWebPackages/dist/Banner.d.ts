import type { ReactNode } from 'react';
export type BannerVariant = 'success' | 'error' | 'info' | 'warning';
export interface BannerProps {
    title: string;
    detail?: string;
    meta?: ReactNode;
    variant?: BannerVariant;
    onDismiss?: () => void;
    className?: string;
    testId?: string;
}
export declare function Banner({ title, detail, meta, variant, onDismiss, className, testId, }: BannerProps): import("react").JSX.Element;
//# sourceMappingURL=Banner.d.ts.map