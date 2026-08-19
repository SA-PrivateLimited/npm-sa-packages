import type { CSSProperties } from 'react';
export interface PhoneInputProps {
    value: string;
    onChange: (tenDigits: string) => void;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    dialCode?: string;
    label?: string;
    error?: string;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function PhoneInput({ value, onChange, placeholder, disabled, autoFocus, dialCode, label, error, className, style, testId, }: PhoneInputProps): import("react").JSX.Element;
//# sourceMappingURL=PhoneInput.d.ts.map