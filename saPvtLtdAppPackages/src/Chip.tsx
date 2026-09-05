import React, {type ReactNode} from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {Icon} from './Icon';
import {HS} from './tokens';

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface ChipProps {
  label: ReactNode;
  variant?: ChipVariant;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onClick?: () => void;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
  testID?: string;
}

export function Chip({
  label,
  variant = 'default',
  selected = false,
  disabled = false,
  onPress,
  onClick,
  onClose,
  style,
  colors: colorsOverride,
  testID = 'hs-chip',
}: ChipProps) {
  const theme = useAppTheme(colorsOverride);
  const press = onPress || onClick;
  let bg = theme.card || HS.surface;
  let border = theme.border || HS.border;
  let fg = theme.text || HS.text;
  if (variant === 'primary') {
    bg = HS.mixPrimary12;
    border = HS.mixPrimary28;
    fg = theme.primary || HS.primary;
  } else if (variant === 'success') {
    bg = HS.mixSuccess12;
    border = HS.mixSuccess28;
    fg = HS.success;
  } else if (variant === 'warning') {
    bg = HS.mixWarning12;
    border = HS.mixWarning28;
    fg = HS.warning;
  } else if (variant === 'error') {
    bg = HS.mixError12;
    border = HS.mixError28;
    fg = HS.error;
  }

  const inner = (
    <>
      {typeof label === 'string' || typeof label === 'number' ? (
        <Text style={[styles.label, {color: fg}]} numberOfLines={1}>
          {label}
        </Text>
      ) : (
        label
      )}
      {onClose && !disabled ? (
        <Pressable onPress={onClose} hitSlop={8} accessibilityLabel="Remove">
          <Icon name="close" size={14} color={fg} />
        </Pressable>
      ) : null}
    </>
  );

  const boxStyle = [
    styles.chip,
    {
      backgroundColor: bg,
      borderColor: selected ? theme.primary || HS.primary : border,
      opacity: disabled ? 0.55 : 1,
    },
    style,
  ];

  if (press) {
    return (
      <Pressable testID={testID} disabled={disabled} onPress={press} style={boxStyle}>
        {inner}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={boxStyle}>
      {inner}
    </View>
  );
}

export interface ChipsProps {
  children: ReactNode;
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Chips({children, wrap = true, style}: ChipsProps) {
  return (
    <View style={[styles.row, wrap ? styles.wrap : null, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: '100%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  label: {fontSize: 12, fontWeight: '600', lineHeight: 16, flexShrink: 1},
  row: {flexDirection: 'row', alignItems: 'center', gap: 8},
  wrap: {flexWrap: 'wrap'},
});
