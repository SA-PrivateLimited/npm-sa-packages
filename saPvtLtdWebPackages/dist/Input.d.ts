import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
    label?: ReactNode;
    error?: ReactNode;
    hint?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    multiline?: boolean;
    rows?: number;
    className?: string;
    style?: CSSProperties;
    inputClassName?: string;
    testId?: string;
}
export declare function Input({ label, error, hint, prefix, suffix, multiline, rows, className, style, inputClassName, testId, id, disabled, ...rest }: InputProps): import("react").JSX.Element;
//# sourceMappingURL=Input.d.ts.map