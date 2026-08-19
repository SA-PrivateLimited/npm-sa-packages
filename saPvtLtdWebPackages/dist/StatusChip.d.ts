import type { CSSProperties } from 'react';
export type StatusChipTone = 'pending' | 'active' | 'completed' | 'cancelled' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export interface StatusChipProps {
    status: string;
    label?: string;
    colorMap?: Record<string, StatusChipTone | string>;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function StatusChip({ status, label, colorMap, className, style, testId, }: StatusChipProps): import("react").JSX.Element;
//# sourceMappingURL=StatusChip.d.ts.map