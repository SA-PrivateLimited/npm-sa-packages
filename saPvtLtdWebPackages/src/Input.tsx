import type {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
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

export function Input({
  label,
  error,
  hint,
  prefix,
  suffix,
  multiline = false,
  rows = 3,
  className = '',
  style,
  inputClassName = '',
  testId = 'hs-input',
  id,
  disabled,
  ...rest
}: InputProps) {
  const fieldId = id || (typeof label === 'string' ? undefined : undefined);
  const wrapClass = [
    'hs-input-wrap',
    error ? 'hs-input-wrap--error' : '',
    disabled ? 'hs-input-wrap--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const controlClass = ['hs-input', inputClassName].filter(Boolean).join(' ');

  return (
    <div className={wrapClass} style={style} data-testid={testId}>
      {label ? (
        <label className="hs-field-label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      <div className="hs-input__shell">
        {prefix ? <span className="hs-input__affix hs-input__prefix">{prefix}</span> : null}
        {multiline ? (
          <textarea
            id={fieldId}
            className={controlClass}
            rows={rows}
            disabled={disabled}
            aria-invalid={Boolean(error) || undefined}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            className={controlClass}
            disabled={disabled}
            aria-invalid={Boolean(error) || undefined}
            {...rest}
          />
        )}
        {suffix ? <span className="hs-input__affix hs-input__suffix">{suffix}</span> : null}
      </div>
      {error ? <p className="hs-field-error">{error}</p> : null}
      {!error && hint ? <p className="hs-field-hint">{hint}</p> : null}
    </div>
  );
}
