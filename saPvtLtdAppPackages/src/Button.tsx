import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {HS, metricsFromTheme} from './tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children?: React.ReactNode;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  onPress?: () => void;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  colors?: Partial<AppThemeColors>;
  testID?: string;
  testId?: string;
}

export function Button({
  children,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  block = false,
  onPress,
  onClick,
  style,
  textStyle,
  colors: colorsOverride,
  testID,
  testId,
}: ButtonProps) {
  const theme = useAppTheme(colorsOverride);
  const metrics = metricsFromTheme(theme);
  const isDisabled = disabled || loading;
  const press = onPress || onClick;

  const bg =
    variant === 'primary'
      ? theme.primary || HS.primary
      : variant === 'danger'
        ? theme.danger || HS.error
        : variant === 'ghost'
          ? 'transparent'
          : theme.card || HS.surface;

  const borderColor =
    variant === 'primary'
      ? theme.primary || HS.primary
      : variant === 'danger'
        ? theme.danger || HS.error
        : variant === 'ghost'
          ? 'transparent'
          : theme.border || HS.border;

  const fg =
    variant === 'primary' || variant === 'danger'
      ? '#FFFFFF'
      : theme.text || HS.text;

  const minHeight =
    size === 'sm' ? 32 : size === 'lg' ? metrics.controlHLg : metrics.controlH;
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 15 : 14;
  const padH = size === 'sm' ? 10 : size === 'lg' ? HS.space4 : metrics.controlPx;

  const label = children ?? title;

  return (
    <Pressable
      testID={testID || testId || 'hs-button'}
      disabled={isDisabled}
      onPress={press}
      style={() => [
        styles.base,
        {
          backgroundColor: bg,
          borderColor,
          minHeight,
          paddingHorizontal: padH,
          borderRadius: metrics.radiusSm,
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: block ? 'stretch' : 'flex-start',
          width: block ? '100%' : undefined,
        },
        style,
      ]}>
      {loading ? <ActivityIndicator color={fg} size="small" /> : null}
      {typeof label === 'string' || typeof label === 'number' ? (
        <Text style={[styles.label, {color: fg, fontSize}, textStyle]}>
          {label}
        </Text>
      ) : (
        <View style={styles.row}>{label}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: HS.radiusSm,
  },
  label: {
    fontWeight: '600',
    lineHeight: 17.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
