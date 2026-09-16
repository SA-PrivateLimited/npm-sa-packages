import { type CSSProperties, type ReactNode } from 'react';
export interface GlassTabBarProps {
    activeIndex: number;
    tabCount: number;
    onSelect: (index: number) => void;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    children: ReactNode;
}
/**
 * Floating tab bar with a glass pill that can be dragged freely.
 * On release the pill snaps to the nearest tab and `onSelect` opens that page.
 */
export declare function GlassTabBar({ activeIndex, tabCount, onSelect, className, style, 'aria-label': ariaLabel, children, }: GlassTabBarProps): import("react").JSX.Element;
//# sourceMappingURL=FloatingTabBar.d.ts.map