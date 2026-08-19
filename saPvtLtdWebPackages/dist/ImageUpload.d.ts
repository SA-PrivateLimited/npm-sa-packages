import type { CSSProperties } from 'react';
export interface ImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    max?: number;
    accept?: string;
    disabled?: boolean;
    label?: string;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function ImageUpload({ value, onChange, max, accept, disabled, label, className, style, testId, }: ImageUploadProps): import("react").JSX.Element;
//# sourceMappingURL=ImageUpload.d.ts.map