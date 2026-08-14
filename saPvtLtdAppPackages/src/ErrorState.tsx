import React from 'react';
import {View, Text, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {Button} from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  retryLabel = 'Try again',
  onRetry,
  style,
  colors: colorsOverride,
}: ErrorStateProps) {
  const theme = useAppTheme(colorsOverride);

  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.glyph, {color: theme.danger || '#FF3B30'}]}>!</Text>
      <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
      {message ? (
        <Text style={[styles.msg, {color: theme.textSecondary}]}>{message}</Text>
      ) : null}
      {onRetry ? (
        <Button variant="secondary" title={retryLabel} onPress={onRetry} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 10,
  },
  glyph: {
    fontSize: 48,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  msg: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
});
