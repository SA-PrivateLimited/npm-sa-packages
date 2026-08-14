import type {CSSProperties} from 'react';
import {INDIA_DIAL_CODE, localTenDigits} from './phone.js';

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

export function PhoneInput({
  value,
  onChange,
  placeholder = '10-digit mobile',
  disabled = false,
  autoFocus = false,
  dialCode = INDIA_DIAL_CODE,
  label,
  error,
  className = '',
  style,
  testId = 'hs-phone',
}: PhoneInputProps) {
  return (
    <div
      className={`hs-phone ${error ? 'hs-phone--error' : ''} ${className}`.trim()}
      style={style}
      data-testid={testId}>
      {label ? <label className="hs-field-label">{label}</label> : null}
      <div className="hs-phone__row">
        <span className="hs-phone__prefix" aria-hidden>
          {dialCode}
        </span>
        <input
          className="hs-phone__input"
          value={localTenDigits(value).slice(0, 10)}
          onChange={(e) => onChange(localTenDigits(e.target.value).slice(0, 10))}
          placeholder={placeholder}
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-label="10-digit mobile number"
          aria-invalid={Boolean(error) || undefined}
        />
      </div>
      {error ? <p className="hs-field-error">{error}</p> : null}
    </div>
  );
}
