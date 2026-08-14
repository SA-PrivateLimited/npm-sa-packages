import React from 'react';
import {View, Text, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface BadgeProps {
  children?: React.ReactNode;
  count?: number;
  max?: number;
  variant?: BadgeVariant;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function Badge({
  children,
  count,
  max = 99,
  variant = 'primary',
  dot = false,
  style,
  colors: colorsOverride,
}: BadgeProps) {
  const theme = useAppTheme(colorsOverride);
  const bg =
    variant === 'success'
      ? theme.success || '#34C759'
      : variant === 'warning'
        ? theme.warning || '#FF9500'
        : variant === 'error'
          ? theme.danger || '#FF3B30'
          : variant === 'default'
            ? '#718096'
            : theme.primary;

  const showCount = typeof count === 'number' && count > 0;
  const label = showCount ? (count > max ? `${max}+` : String(count)) : null;

  if (children != null) {
    return (
      <View style={[styles.wrap, style]}>
        {children}
        {(dot || showCount) && (
          <View
            style={[
              styles.badge,
              dot && styles.dot,
              {backgroundColor: bg},
              styles.absolute,
            ]}>
            {!dot && label ? (
              <Text style={styles.text}>{label}</Text>
            ) : null}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.badge, dot && styles.dot, {backgroundColor: bg}, style]}>
      {!dot ? <Text style={styles.text}>{label ?? children}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
  dot: {
    minWidth: 8,
    width: 8,
    height: 8,
    paddingHorizontal: 0,
  },
  text: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
