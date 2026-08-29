import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';

const DEFAULT_LENGTH = 6;

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

function clampLength(n?: number): number {
  const raw = Number.isFinite(n) ? Math.floor(Number(n)) : DEFAULT_LENGTH;
  return Math.max(1, Math.min(12, raw || DEFAULT_LENGTH));
}

function cleanOtp(raw: string, length: number): string {
  return String(raw || '')
    .replace(/\D/g, '')
    .slice(0, length);
}

export function OtpInput({
  value,
  onChange,
  length: lengthProp,
  onComplete,
  disabled = false,
  autoFocus = false,
  secure = false,
  className = '',
  style,
  testId = 'hs-otp',
  accessibilityLabelPrefix = 'OTP',
}: OtpInputProps) {
  const length = clampLength(lengthProp);
  const cleaned = useMemo(() => cleanOtp(value, length), [value, length]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const lastCompletedRef = useRef<string | null>(null);

  const activeIndex = focused
    ? Math.min(cleaned.length, length - 1)
    : -1;

  const focusInput = () => {
    const el = inputRef.current;
    if (!el || disabled) return;
    el.focus({preventScroll: true});
    const len = el.value.length;
    el.setSelectionRange(len, len);
  };

  useEffect(() => {
    if (autoFocus && !disabled) {
      requestAnimationFrame(() => focusInput());
    }
    // Only autofocus on mount — not when disabled toggles during submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, length]);

  useEffect(() => {
    if (cleaned.length === length) {
      if (lastCompletedRef.current !== cleaned) {
        lastCompletedRef.current = cleaned;
        onComplete?.(cleaned);
      }
    } else {
      lastCompletedRef.current = null;
    }
  }, [cleaned, length, onComplete]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(cleanOtp(event.target.value, length));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const el = event.currentTarget;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const pos = Math.max(0, el.selectionStart ?? cleaned.length - 1);
      el.setSelectionRange(pos, pos);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const pos = Math.min(cleaned.length, el.selectionStart ?? cleaned.length);
      el.setSelectionRange(pos, pos);
    }
  };

  return (
    <div
      className={`hs-otp ${secure ? 'hs-otp--secure' : ''} ${className}`.trim()}
      style={style}
      data-testid={testId}
      role="group"
      aria-label={accessibilityLabelPrefix}
      onPointerDown={(event) => {
        if (disabled) return;
        if (event.target === inputRef.current) return;
        event.preventDefault();
        focusInput();
      }}>
      <input
        ref={inputRef}
        className="hs-otp__input"
        value={cleaned}
        type="text"
        inputMode="numeric"
        autoComplete={secure ? 'off' : 'one-time-code'}
        maxLength={length}
        disabled={disabled}
        aria-label={accessibilityLabelPrefix}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setFocused(true);
          const el = inputRef.current;
          if (!el) return;
          const len = el.value.length;
          requestAnimationFrame(() => el.setSelectionRange(len, len));
        }}
        onBlur={() => setFocused(false)}
      />
      {Array.from({length}, (_, index) => {
        const digit = cleaned[index] || '';
        const show = digit ? (secure ? '•' : digit) : '';
        return (
          <span
            key={index}
            className={`hs-otp__cell${
              activeIndex === index ? ' is-active is-focused' : ''
            }${digit ? ' is-filled' : ''}`.trim()}
            aria-hidden="true">
            {show}
          </span>
        );
      })}
    </div>
  );
}
