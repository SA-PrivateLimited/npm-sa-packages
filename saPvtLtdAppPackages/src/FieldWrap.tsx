import React, {type ReactNode} from 'react';
import {View, Text, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {useAppTheme} from './theme';
import {HS} from './tokens';

export interface FieldWrapProps {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function FieldWrap({label, error, hint, children, style}: FieldWrapProps) {
  const theme = useAppTheme();
  return (
    <View style={[styles.wrap, style]}>
      {label ? (
        typeof label === 'string' ? (
          <Text style={[styles.label, {color: theme.textSecondary || HS.textSecondary}]}>
            {label}
          </Text>
        ) : (
          label
        )
      ) : null}
      {children}
      {error ? (
        typeof error === 'string' ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          error
        )
      ) : hint ? (
        typeof hint === 'string' ? (
          <Text style={[styles.hint, {color: theme.textSecondary}]}>{hint}</Text>
        ) : (
          hint
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {width: '100%', gap: HS.space1},
  label: {fontSize: 12, fontWeight: '600'},
  error: {marginTop: 6, fontSize: 12, color: HS.error},
  hint: {marginTop: 6, fontSize: 12},
});
