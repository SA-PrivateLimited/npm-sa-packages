import React, {type ReactNode} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {HS, metricsFromTheme} from './tokens';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  multiline?: boolean;
  rows?: number;
  secure?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  colors?: Partial<AppThemeColors>;
  testID?: string;
}

export function Input({
  label,
  error,
  hint,
  prefix,
  suffix,
  multiline = false,
  rows = 3,
  secure,
  style,
  inputStyle,
  colors: colorsOverride,
  editable = true,
  testID = 'hs-input',
  ...rest
}: InputProps) {
  const theme = useAppTheme(colorsOverride);
  const metrics = metricsFromTheme(theme);
  const border = error ? theme.danger || HS.error : theme.border || HS.border;

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
      <View
        style={[
          styles.shell,
          {
            borderColor: border,
            backgroundColor: theme.card || HS.surface,
            borderRadius: metrics.radiusSm,
            opacity: editable ? 1 : 0.6,
          },
        ]}>
        {prefix ? <View style={styles.affix}>{prefix}</View> : null}
        <TextInput
          testID={testID}
          style={[
            styles.input,
            multiline ? {minHeight: 72, paddingVertical: HS.space2} : null,
            {
              color: theme.text || HS.text,
              minHeight: multiline ? 72 : metrics.controlH,
              paddingHorizontal: metrics.controlPx,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.textSecondary || HS.textSecondary}
          secureTextEntry={secure}
          editable={editable}
          multiline={multiline}
          numberOfLines={multiline ? rows : 1}
          {...rest}
        />
        {suffix ? <View style={styles.affix}>{suffix}</View> : null}
      </View>
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
  shell: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 1,
    borderRadius: HS.radiusSm,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    minHeight: HS.controlH,
    paddingHorizontal: HS.controlPx,
    fontSize: 16,
  },
  affix: {paddingHorizontal: 10, justifyContent: 'center'},
  error: {marginTop: 6, fontSize: 12, color: HS.error},
  hint: {marginTop: 6, fontSize: 12},
});
