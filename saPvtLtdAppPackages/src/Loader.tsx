import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export type LoaderSize = 'sm' | 'md' | 'lg';

export interface LoaderProps {
  size?: LoaderSize;
  label?: string;
  fullscreen?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function Loader({
  size = 'md',
  label,
  fullscreen = false,
  style,
  colors: colorsOverride,
}: LoaderProps) {
  const theme = useAppTheme(colorsOverride);
  const dim = size === 'sm' ? 'small' : 'large';

  const body = (
    <View style={[styles.wrap, style]}>
      <ActivityIndicator size={dim} color={theme.primary} />
      {label ? (
        <Text style={[styles.label, {color: theme.textSecondary}]}>{label}</Text>
      ) : null}
    </View>
  );

  if (fullscreen) {
    return <View style={styles.fullscreen}>{body}</View>;
  }
  return body;
}

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center', gap: 10},
  label: {fontSize: 13},
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.72)',
    zIndex: 100,
  },
});
