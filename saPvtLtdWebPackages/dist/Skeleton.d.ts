import type { CSSProperties } from 'react';
export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'rect' | 'card';
export interface SkeletonProps {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
    lines?: number;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Skeleton({ variant, width, height, lines, className, style, testId, }: SkeletonProps): import("react").JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map