import type { CSSProperties } from 'react';
export interface DatePickerProps {
    value: string;
    onChange: (isoDate: string) => void;
    label?: string;
    error?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
/** Controlled ISO date (`YYYY-MM-DD`) via native date input. */
export declare function DatePicker({ value, onChange, label, error, min, max, disabled, className, style, testId, }: DatePickerProps): import("react").JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map