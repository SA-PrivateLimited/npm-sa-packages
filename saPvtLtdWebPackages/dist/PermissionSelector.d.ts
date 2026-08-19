import type { CSSProperties } from 'react';
export interface PermissionItem {
    id: string;
    label: string;
    description?: string;
}
export interface PermissionModule {
    id: string;
    label: string;
    permissions: PermissionItem[];
}
export interface PermissionSelectorProps {
    modules: PermissionModule[];
    value: string[];
    onChange: (next: string[]) => void;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function PermissionSelector({ modules, value, onChange, disabled, className, style, testId, }: PermissionSelectorProps): import("react").JSX.Element;
//# sourceMappingURL=PermissionSelector.d.ts.map