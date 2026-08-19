import type { CSSProperties, InputHTMLAttributes } from 'react';
export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'onSubmit'> {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    onClear?: () => void;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function SearchBar({ value, onChange, onSubmit, onClear, placeholder, className, style, testId, disabled, ...rest }: SearchBarProps): import("react").JSX.Element;
//# sourceMappingURL=SearchBar.d.ts.map