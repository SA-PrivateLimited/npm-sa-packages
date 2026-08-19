import type { CSSProperties } from 'react';
export type AvatarSize = 'sm' | 'md' | 'lg' | number;
export interface AvatarProps {
    src?: string | null;
    name?: string;
    alt?: string;
    size?: AvatarSize;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Avatar({ src, name, alt, size, className, style, testId, }: AvatarProps): import("react").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map