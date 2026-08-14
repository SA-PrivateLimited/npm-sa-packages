/**
 * Pure RN month calendar date picker (YYYY-MM-DD). No native datepicker peer.
 */

import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {Button} from './Button';

export interface DatePickerProps {
  value: string;
  onChange: (isoDate: string) => void;
  label?: string;
  error?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

function parseIso(iso?: string): Date | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  min,
  max,
  disabled = false,
  style,
  colors: colorsOverride,
}: DatePickerProps) {
  const theme = useAppTheme(colorsOverride);
  const selected = parseIso(value) || new Date();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );

  const minD = parseIso(min || undefined);
  const maxD = parseIso(max || undefined);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDow = new Date(year, month, 1).getDay();
    const count = daysInMonth(year, month);
    const out: Array<{day: number | null; iso?: string; disabled?: boolean}> =
      [];
    for (let i = 0; i < firstDow; i++) out.push({day: null});
    for (let d = 1; d <= count; d++) {
      const date = new Date(year, month, d);
      const iso = toIso(date);
      const disabledDay =
        (minD && date < minD) || (maxD && date > maxD) || false;
      out.push({day: d, iso, disabled: disabledDay});
    }
    return out;
  }, [cursor, minD, maxD]);

  return (
    <View style={style}>
      {label ? (
        <Text style={[styles.label, {color: theme.textSecondary}]}>{label}</Text>
      ) : null}
      <Pressable
        disabled={disabled}
        onPress={() => {
          setCursor(new Date(selected.getFullYear(), selected.getMonth(), 1));
          setOpen(true);
        }}
        style={[
          styles.trigger,
          {
            borderColor: error ? theme.danger || '#FF3B30' : theme.border,
            backgroundColor: theme.card,
            opacity: disabled ? 0.55 : 1,
          },
        ]}>
        <Text style={{color: value ? theme.text : theme.textSecondary}}>
          {value || 'Select date'}
        </Text>
      </Pressable>
      {error ? (
        <Text style={{color: theme.danger || '#FF3B30', marginTop: 6, fontSize: 12}}>
          {error}
        </Text>
      ) : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <View style={[styles.sheet, {backgroundColor: theme.card}]}>
            <View style={styles.nav}>
              <Pressable
                onPress={() =>
                  setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
                }>
                <Text style={[styles.navBtn, {color: theme.primary}]}>‹</Text>
              </Pressable>
              <Text style={[styles.month, {color: theme.text}]}>
                {cursor.toLocaleString('default', {month: 'long', year: 'numeric'})}
              </Text>
              <Pressable
                onPress={() =>
                  setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
                }>
                <Text style={[styles.navBtn, {color: theme.primary}]}>›</Text>
              </Pressable>
            </View>
            <View style={styles.weekRow}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <Text key={i} style={[styles.week, {color: theme.textSecondary}]}>
                  {d}
                </Text>
              ))}
            </View>
            <View style={styles.grid}>
              {cells.map((c, i) =>
                c.day == null ? (
                  <View key={i} style={styles.cell} />
                ) : (
                  <Pressable
                    key={i}
                    disabled={c.disabled}
                    onPress={() => {
                      if (!c.iso) return;
                      onChange(c.iso);
                      setOpen(false);
                    }}
                    style={[
                      styles.cell,
                      c.iso === value && {
                        backgroundColor: theme.primary,
                        borderRadius: 8,
                      },
                      c.disabled && {opacity: 0.35},
                    ]}>
                    <Text
                      style={{
                        color: c.iso === value ? '#fff' : theme.text,
                        fontWeight: '600',
                      }}>
                      {c.day}
                    </Text>
                  </Pressable>
                ),
              )}
            </View>
            <Button variant="ghost" title="Cancel" onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {fontSize: 12, fontWeight: '600', marginBottom: 6},
  trigger: {
    minHeight: 48,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {borderRadius: 16, padding: 16},
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navBtn: {fontSize: 28, paddingHorizontal: 8},
  month: {fontSize: 16, fontWeight: '700'},
  weekRow: {flexDirection: 'row', marginBottom: 6},
  week: {flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '600'},
  grid: {flexDirection: 'row', flexWrap: 'wrap'},
  cell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
