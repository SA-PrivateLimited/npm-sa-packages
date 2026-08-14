import type {CSSProperties} from 'react';

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
export function DatePicker({
  value,
  onChange,
  label,
  error,
  min,
  max,
  disabled = false,
  className = '',
  style,
  testId = 'hs-datepicker',
}: DatePickerProps) {
  return (
    <div
      className={`hs-datepicker ${error ? 'hs-datepicker--error' : ''} ${className}`.trim()}
      style={style}
      data-testid={testId}>
      {label ? <label className="hs-field-label">{label}</label> : null}
      <input
        className="hs-datepicker__input"
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error) || undefined}
      />
      {error ? <p className="hs-field-error">{error}</p> : null}
    </div>
  );
}
