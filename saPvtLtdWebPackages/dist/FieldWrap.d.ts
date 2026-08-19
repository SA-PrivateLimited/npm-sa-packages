import type { ReactNode } from 'react';
export interface FieldWrapProps {
    label?: string;
    htmlFor?: string;
    className?: string;
    children: ReactNode;
}
/** Shared label + stack for form controls in this package. */
export declare function FieldWrap({ label, htmlFor, className, children, }: FieldWrapProps): import("react").JSX.Element;
//# sourceMappingURL=FieldWrap.d.ts.map