import { type CSSProperties } from 'react';
export interface OtpInputProps {
    value: string;
    onChange: (otp: string) => void;
    length?: number;
    onComplete?: (otp: string) => void;
    disabled?: boolean;
    autoFocus?: boolean;
    secure?: boolean;
    className?: string;
    style?: CSSProperties;
    testId?: string;
    accessibilityLabelPrefix?: string;
}
export declare function OtpInput({ value, onChange, length: lengthProp, onComplete, disabled, autoFocus, secure, className, style, testId, accessibilityLabelPrefix, }: OtpInputProps): import("react").JSX.Element;
//# sourceMappingURL=OtpInput.d.ts.map