import React from 'react';
import {Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export type StatusChipTone =
  | 'pending'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

const DEFAULT_MAP: Record<string, StatusChipTone> = {
  pending: 'pending',
  requested: 'pending',
  open: 'pending',
  active: 'active',
  in_progress: 'active',
  assigned: 'active',
  accepted: 'active',
  completed: 'completed',
  done: 'completed',
  cancelled: 'cancelled',
  canceled: 'cancelled',
  rejected: 'error',
  failed: 'error',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

export interface StatusChipProps {
  status: string;
  label?: string;
  colorMap?: Record<string, StatusChipTone | string>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  colors?: Partial<AppThemeColors>;
}

function resolveTone(
  status: string,
  colorMap?: Record<string, StatusChipTone | string>,
): {tone: StatusChipTone; custom?: string} {
  const key = status.toLowerCase().trim().replace(/\s+/g, '_');
  const mapped = colorMap?.[key] ?? colorMap?.[status] ?? DEFAULT_MAP[key];
  if (!mapped) return {tone: 'neutral'};
  if (
    mapped === 'pending' ||
    mapped === 'active' ||
    mapped === 'completed' ||
    mapped === 'cancelled' ||
    mapped === 'success' ||
    mapped === 'warning' ||
    mapped === 'error' ||
    mapped === 'info' ||
    mapped === 'neutral'
  ) {
    return {tone: mapped};
  }
  return {tone: 'neutral', custom: mapped};
}

export function StatusChip({
  status,
  label,
  colorMap,
  style,
  textStyle,
  colors: colorsOverride,
}: StatusChipProps) {
  const theme = useAppTheme(colorsOverride);
  const {tone, custom} = resolveTone(status, colorMap);
  const text =
    label ||
    status.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const accent =
    custom ||
    (tone === 'pending' || tone === 'warning'
      ? theme.warning || '#FF9500'
      : tone === 'completed' || tone === 'success'
        ? theme.success || '#34C759'
        : tone === 'cancelled' || tone === 'error'
          ? theme.danger || '#FF3B30'
          : tone === 'neutral'
            ? '#4A5568'
            : theme.primary);

  return (
    <Text
      style={[
        styles.chip,
        {
          color: accent,
          backgroundColor: `${accent}22`,
          borderColor: `${accent}55`,
        },
        style,
        textStyle,
      ]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
