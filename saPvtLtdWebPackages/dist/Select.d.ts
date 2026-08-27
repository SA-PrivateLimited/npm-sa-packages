import { type CSSProperties } from 'react';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    /** Extra text included when filtering with `showSearch` (e.g. Hindi search terms). */
    searchText?: string;
}
export interface SelectProps {
    label?: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    allowClear?: boolean;
    showSearch?: boolean;
    /** Placeholder for the in-dropdown search field when `showSearch` is true. */
    searchPlaceholder?: string;
    /** Shown when search/filter yields no options. */
    emptyMessage?: string;
    /** Accessible label for the clear control. */
    clearAriaLabel?: string;
    /** Kept for Ant API compat; ignored by custom dropdown. */
    size?: 'small' | 'middle' | 'large';
    style?: CSSProperties;
}
/**
 * Custom single-select dropdown (no Ant Design).
 * Mobile: full-width bottom sheet. Desktop: anchored list.
 */
export declare function Select({ label, options, value, onChange, placeholder, disabled, className, id, allowClear, showSearch, searchPlaceholder, emptyMessage, clearAriaLabel, style, }: SelectProps): import("react").JSX.Element;
/** Alias — prefer this name in new code for clarity. */
export declare const SingleSelect: typeof Select;
//# sourceMappingURL=Select.d.ts.map