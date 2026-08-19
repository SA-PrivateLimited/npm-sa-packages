import type { CSSProperties, ReactNode } from 'react';
import { type IconName } from './Icon.js';
export interface EmptyStateProps {
    title: string;
    message?: ReactNode;
    icon?: IconName;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function EmptyState({ title, message, icon, actionLabel, onAction, className, style, testId, }: EmptyStateProps): import("react").JSX.Element;
export interface ErrorStateProps {
    title?: string;
    message?: ReactNode;
    retryLabel?: string;
    onRetry?: () => void;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function ErrorState({ title, message, retryLabel, onRetry, className, style, testId, }: ErrorStateProps): import("react").JSX.Element;
//# sourceMappingURL=EmptyState.d.ts.map