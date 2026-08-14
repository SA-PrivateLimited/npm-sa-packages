import React from 'react';
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

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  secure?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  colors?: Partial<AppThemeColors>;
}

export function Input({
  label,
  error,
  hint,
  secure,
  style,
  inputStyle,
  colors: colorsOverride,
  editable = true,
  ...rest
}: InputProps) {
  const theme = useAppTheme(colorsOverride);

  return (
    <View style={[styles.wrap, style]}>
      {label ? (
        <Text style={[styles.label, {color: theme.textSecondary}]}>{label}</Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? theme.danger || '#FF3B30' : theme.border,
            backgroundColor: theme.card,
            color: theme.text,
            opacity: editable ? 1 : 0.6,
          },
          inputStyle,
        ]}
        placeholderTextColor={theme.textSecondary}
        secureTextEntry={secure}
        editable={editable}
        {...rest}
      />
      {error ? (
        <Text style={[styles.error, {color: theme.danger || '#FF3B30'}]}>
          {error}
        </Text>
      ) : hint ? (
        <Text style={[styles.hint, {color: theme.textSecondary}]}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    minHeight: 48,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  error: {
    marginTop: 6,
    fontSize: 12,
  },
  hint: {
    marginTop: 6,
    fontSize: 12,
  },
});
