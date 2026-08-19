import { type CSSProperties } from 'react';
export interface MultiSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export type MultiSelectVariant = 'tags' | 'checkbox';
export interface MultiSelectProps {
    label?: string;
    options: MultiSelectOption[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    allowClear?: boolean;
    showSearch?: boolean;
    /** `tags` and `checkbox` both use checklist in the panel; selected show as chips. */
    variant?: MultiSelectVariant;
    maxTagCount?: number | 'responsive';
    size?: 'small' | 'middle' | 'large';
    style?: CSSProperties;
}
/**
 * Custom multi-select dropdown (no Ant Design).
 * Checklist in panel; selected values as chips on the trigger.
 */
export declare function MultiSelect({ label, options, value, onChange, placeholder, disabled, className, id, allowClear, showSearch, maxTagCount, style, }: MultiSelectProps): import("react").JSX.Element;
/** MultiSelect with checklist options; selected values show as chips inside. */
export declare function MultiSelectCheckbox(props: Omit<MultiSelectProps, 'variant'>): import("react").JSX.Element;
//# sourceMappingURL=MultiSelect.d.ts.map