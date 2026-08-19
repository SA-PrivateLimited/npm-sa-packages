import type { CSSProperties, ReactNode } from 'react';
export interface WidgetProps {
    title?: ReactNode;
    subtitle?: ReactNode;
    /** Right-aligned header actions (buttons, menus). */
    actions?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Dense padding for dashboard tiles. */
    compact?: boolean;
    testId?: string;
}
/**
 * Generic content widget / card for dashboards and settings sections.
 * Use as the shell around tables, forms, and charts.
 */
export declare function Widget({ title, subtitle, actions, children, footer, className, style, compact, testId, }: WidgetProps): import("react").JSX.Element;
//# sourceMappingURL=Widget.d.ts.map