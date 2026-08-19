import type { TreeSelectProps as AntTreeSelectProps } from 'antd';
import type { CSSProperties } from 'react';
export interface TreeSelectNode {
    value: string;
    title: string;
    disabled?: boolean;
    children?: TreeSelectNode[];
    /** Extra payload (e.g. category metadata). */
    data?: unknown;
}
export interface TreeMultiSelectProps {
    label?: string;
    treeData: TreeSelectNode[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    allowClear?: boolean;
    showSearch?: boolean;
    /** Show only leaf values when parents are checked. */
    showCheckedStrategy?: AntTreeSelectProps['showCheckedStrategy'];
    treeDefaultExpandAll?: boolean;
    maxTagCount?: AntTreeSelectProps['maxTagCount'];
    size?: AntTreeSelectProps['size'];
    style?: CSSProperties;
}
/**
 * Hierarchical multi-select with checkable tree (Ant Design TreeSelect).
 * Use for category / org / nested filter UIs.
 */
export declare function TreeMultiSelect({ label, treeData, value, onChange, placeholder, disabled, className, id, allowClear, showSearch, showCheckedStrategy, treeDefaultExpandAll, maxTagCount, size, style, }: TreeMultiSelectProps): import("react").JSX.Element;
export declare const TreeMultiSelectStrategy: {
    readonly SHOW_ALL: "SHOW_ALL";
    readonly SHOW_PARENT: "SHOW_PARENT";
    readonly SHOW_CHILD: "SHOW_CHILD";
};
//# sourceMappingURL=TreeMultiSelect.d.ts.map