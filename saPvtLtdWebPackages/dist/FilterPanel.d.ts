import { type CSSProperties, type ReactNode } from 'react';
export interface FilterPanelProps {
    title?: ReactNode;
    children?: ReactNode;
    onApply?: () => void;
    onReset?: () => void;
    applyLabel?: string;
    resetLabel?: string;
    defaultOpen?: boolean;
    collapsible?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function FilterPanel({ title, children, onApply, onReset, applyLabel, resetLabel, defaultOpen, collapsible, className, style, testId, }: FilterPanelProps): import("react").JSX.Element;
//# sourceMappingURL=FilterPanel.d.ts.map