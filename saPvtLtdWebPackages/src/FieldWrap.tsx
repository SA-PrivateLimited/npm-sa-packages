import type {ReactNode} from 'react';

export interface FieldWrapProps {
  label?: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

/** Shared label + stack for form controls in this package. */
export function FieldWrap({
  label,
  htmlFor,
  className = '',
  children,
}: FieldWrapProps) {
  return (
    <div className={`hs-select-wrap ${className}`.trim()}>
      {label ? (
        <label className="hs-field-label" htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}
