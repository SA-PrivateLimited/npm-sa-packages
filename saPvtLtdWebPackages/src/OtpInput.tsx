import {useEffect, useMemo, useRef, useState, type CSSProperties} from 'react';

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
  const digits = useMemo(
    () => Array.from({length}, (_, i) => value[i] || ''),
    [value, length],
  );
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState(
    Math.min(value.length, length - 1),
  );
  const lastCompletedRef = useRef<string | null>(null);

  useEffect(() => {
    if (autoFocus && !disabled) {
      const idx = Math.min(value.length, length - 1);
      setFocusedIndex(idx);
      requestAnimationFrame(() => {
        refs.current[idx]?.focus({preventScroll: true});
      });
    }
    // Only autofocus on mount — not when disabled toggles during submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, length]);

  useEffect(() => {
    const cleaned = String(value || '')
      .replace(/\D/g, '')
      .slice(0, length);
    if (cleaned.length === length) {
      if (lastCompletedRef.current !== cleaned) {
        lastCompletedRef.current = cleaned;
        onComplete?.(cleaned);
      }
    } else {
      lastCompletedRef.current = null;
    }
  }, [value, length, onComplete]);

  const emit = (nextDigits: string[]) => {
    onChange(nextDigits.join('').replace(/\D/g, '').slice(0, length));
  };

  const focusAt = (index: number) => {
    const clamped = Math.max(0, Math.min(index, length - 1));
    setFocusedIndex(clamped);
    requestAnimationFrame(() => {
      refs.current[clamped]?.focus({preventScroll: true});
    });
  };

  const handleChange = (index: number, text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (!cleaned) {
      const next = digits.slice();
      next[index] = '';
      emit(next);
      return;
    }
    if (cleaned.length > 1) {
      const next = digits.slice();
      if (cleaned.length >= length || index === 0) {
        const full = cleaned.slice(0, length).split('');
        for (let i = 0; i < length; i++) next[i] = full[i] || '';
      } else {
        for (let i = 0; i < cleaned.length && index + i < length; i++) {
          next[index + i] = cleaned[i];
        }
      }
      emit(next);
      const filledLen = next.filter(Boolean).length;
      focusAt(filledLen >= length ? length - 1 : Math.min(index + cleaned.length, length - 1));
      return;
    }
    const next = digits.slice();
    next[index] = cleaned;
    emit(next);
    if (index < length - 1) focusAt(index + 1);
    else setFocusedIndex(index);
  };

  return (
    <div
      className={`hs-otp ${secure ? 'hs-otp--secure' : ''} ${className}`.trim()}
      style={style}
      data-testid={testId}
      role="group"
      aria-label={accessibilityLabelPrefix}>
      {digits.map((digit, index) => (
        <input
          key={`${length}-${index}`}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className={`hs-otp__cell${focusedIndex === index ? ' is-focused' : ''}`}
          value={digit}
          type="text"
          inputMode="numeric"
          autoComplete={secure ? 'off' : 'one-time-code'}
          maxLength={length}
          disabled={disabled}
          aria-label={`${accessibilityLabelPrefix} digit ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onFocus={() => setFocusedIndex(index)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' && index > 0) {
              e.preventDefault();
              focusAt(index - 1);
            } else if (e.key === 'ArrowRight' && index < length - 1) {
              e.preventDefault();
              focusAt(index + 1);
            } else if (e.key === 'Backspace' && !digits[index] && index > 0) {
              const next = digits.slice();
              next[index - 1] = '';
              emit(next);
              focusAt(index - 1);
            }
          }}
        />
      ))}
    </div>
  );
}
