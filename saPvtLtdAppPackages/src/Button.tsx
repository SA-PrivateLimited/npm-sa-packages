import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

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
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  colors?: Partial<AppThemeColors>;
  testID?: string;
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
  style,
  textStyle,
  colors: colorsOverride,
  testID,
}: ButtonProps) {
  const theme = useAppTheme(colorsOverride);
  const isDisabled = disabled || loading;

  const bg =
    variant === 'primary'
      ? theme.primary
      : variant === 'danger'
        ? theme.danger || '#FF3B30'
        : variant === 'ghost'
          ? 'transparent'
          : theme.card;

  const borderColor =
    variant === 'secondary'
      ? theme.border
      : variant === 'ghost'
        ? 'transparent'
        : bg;

  const fg =
    variant === 'primary' || variant === 'danger' ? '#FFFFFF' : theme.text;

  const padV = size === 'sm' ? 10 : size === 'lg' ? 16 : 14;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 15;

  return (
    <Pressable
      testID={testID}
      disabled={isDisabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        {
          backgroundColor: bg,
          borderColor,
          paddingVertical: padV,
          opacity: isDisabled ? 0.55 : pressed ? 0.85 : 1,
          alignSelf: block ? 'stretch' : 'auto',
          width: block ? '100%' : undefined,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={[styles.label, {color: fg, fontSize}, textStyle]}>
          {children ?? title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1.5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: '700',
  },
});
