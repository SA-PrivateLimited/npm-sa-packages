/**
 * Digit boxes for PIN / OTP entry.
 * Supports any length, paste, free left/right focus, and optional onComplete.
 */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type TextInputKeyPressEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

const DEFAULT_LENGTH = 6;

export interface PinBoxesInputProps {
  value: string;
  onChange: (pin: string) => void;
  /** Number of digit boxes (default 6). Clamped to 1–12. */
  length?: number;
  /** Fired once when value reaches `length` digits (type or paste). */
  onComplete?: (pin: string) => void;
  editable?: boolean;
  autoFocus?: boolean;
  secure?: boolean;
  cellBackground?: string;
  cellBorder?: string;
  textColor?: string;
  focusedBorder?: string;
  colors?: Partial<AppThemeColors>;
  /** Accessibility label prefix, e.g. "PIN" or "OTP". */
  accessibilityLabelPrefix?: string;
}

function clampLength(n?: number): number {
  const raw = Number.isFinite(n) ? Math.floor(Number(n)) : DEFAULT_LENGTH;
  return Math.max(1, Math.min(12, raw || DEFAULT_LENGTH));
}

export function PinBoxesInput({
  value,
  onChange,
  length: lengthProp,
  onComplete,
  editable = true,
  autoFocus = false,
  secure = false,
  cellBackground,
  cellBorder,
  textColor,
  focusedBorder,
  colors: colorsOverride,
  accessibilityLabelPrefix = 'PIN',
}: PinBoxesInputProps) {
  const length = clampLength(lengthProp);
  const theme = useAppTheme(colorsOverride);
  const bg = cellBackground ?? theme.card;
  const border = cellBorder ?? theme.border;
  const fg = textColor ?? theme.text;
  const focusBorder = focusedBorder ?? theme.primary;

  const digits = useMemo(
    () => Array.from({length}, (_, i) => value[i] || ''),
    [value, length],
  );
  const refs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState(
    Math.min(value.length, length - 1),
  );
  const lastCompletedRef = useRef<string | null>(null);

  useEffect(() => {
    if (refs.current.length !== length) {
      refs.current = Array.from({length}, (_, i) => refs.current[i] ?? null);
    }
  }, [length]);

  useEffect(() => {
    if (autoFocus && editable) {
      const idx = Math.min(value.length, length - 1);
      setFocusedIndex(idx);
      requestAnimationFrame(() => refs.current[idx]?.focus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, editable, length]);

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
    requestAnimationFrame(() => refs.current[clamped]?.focus());
  };

  const handleChange = (index: number, text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (!cleaned) {
      const next = digits.slice();
      next[index] = '';
      emit(next);
      return;
    }

    // Paste / autofill of multiple digits
    if (cleaned.length > 1) {
      const next = digits.slice();
      if (cleaned.length >= length || index === 0) {
        const full = cleaned.slice(0, length).split('');
        for (let i = 0; i < length; i++) {
          next[i] = full[i] || '';
        }
      } else {
        for (let i = 0; i < cleaned.length && index + i < length; i++) {
          next[index + i] = cleaned[i];
        }
      }
      emit(next);
      const filledLen = next.filter(Boolean).length;
      if (filledLen >= length) {
        focusAt(length - 1);
      } else {
        focusAt(Math.min(index + cleaned.length, length - 1));
      }
      return;
    }

    const next = digits.slice();
    next[index] = cleaned;
    emit(next);
    if (index < length - 1) {
      focusAt(index + 1);
    } else {
      setFocusedIndex(index);
    }
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const key = e.nativeEvent.key;
    if (key === 'ArrowLeft' && index > 0) {
      focusAt(index - 1);
      return;
    }
    if (key === 'ArrowRight' && index < length - 1) {
      focusAt(index + 1);
      return;
    }
    if (key !== 'Backspace') return;
    if (digits[index]) {
      return;
    }
    if (index <= 0) return;
    const next = digits.slice();
    next[index - 1] = '';
    emit(next);
    focusAt(index - 1);
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => {
        const isActive = focusedIndex === index;
        return (
          <TextInput
            key={`${length}-${index}`}
            ref={el => {
              refs.current[index] = el;
            }}
            style={[
              styles.box,
              {
                backgroundColor: bg,
                borderColor: isActive ? focusBorder : border,
                color: fg,
                borderWidth: isActive ? 2 : 1.5,
              },
            ]}
            value={digit}
            onChangeText={text => handleChange(index, text)}
            onKeyPress={e => handleKeyPress(index, e)}
            onFocus={() => setFocusedIndex(index)}
            keyboardType="number-pad"
            maxLength={length}
            secureTextEntry={secure}
            editable={editable}
            selectTextOnFocus
            caretHidden
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            importantForAutofill="yes"
            accessibilityLabel={`${accessibilityLabelPrefix} digit ${index + 1}`}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  box: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 52,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    padding: 0,
  },
});

export default PinBoxesInput;
