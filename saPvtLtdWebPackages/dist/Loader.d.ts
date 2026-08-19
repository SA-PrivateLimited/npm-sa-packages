import type { CSSProperties } from 'react';
export type LoaderSize = 'sm' | 'md' | 'lg';
export interface LoaderProps {
    size?: LoaderSize;
    label?: string;
    fullscreen?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Loader({ size, label, fullscreen, className, style, testId, }: LoaderProps): import("react").JSX.Element;
//# sourceMappingURL=Loader.d.ts.map