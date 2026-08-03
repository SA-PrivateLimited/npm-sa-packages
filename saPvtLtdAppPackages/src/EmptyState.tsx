import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export interface EmptyStateProps {
  /** Unicode / emoji glyph (avoids vector-icons peer) */
  iconGlyph?: string;
  /** @deprecated Prefer iconGlyph — kept for migration from Ionicons name usage */
  icon?: string;
  title: string;
  message: string;
  colors?: Partial<AppThemeColors>;
}

export function EmptyState({
  iconGlyph = '📭',
  title,
  message,
  colors: colorsOverride,
}: EmptyStateProps) {
  const theme = useAppTheme(colorsOverride);

  return (
    <View style={styles.container}>
      <Text style={[styles.glyph, {color: theme.textSecondary}]}>{iconGlyph}</Text>
      <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
      <Text style={[styles.message, {color: theme.textSecondary}]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  glyph: {
    fontSize: 64,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;
