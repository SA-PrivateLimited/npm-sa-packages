/**
 * Phone input: fixed +91 prefix + 10-digit mobile field.
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import {localTenDigits} from './phone';
import {useAppTheme, type AppThemeColors} from './theme';

export interface PhoneNumberInputProps {
  value: string;
  onChangeText: (tenDigits: string) => void;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  prefixBackgroundColor?: string;
  textColor?: string;
  placeholderTextColor?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  testID?: string;
  colors?: Partial<AppThemeColors>;
}

export function PhoneNumberInput({
  value,
  onChangeText,
  placeholder = '10-digit mobile',
  editable = true,
  autoFocus = false,
  borderColor,
  backgroundColor,
  prefixBackgroundColor,
  textColor,
  placeholderTextColor,
  style,
  inputStyle,
  testID,
  colors: colorsOverride,
}: PhoneNumberInputProps) {
  const theme = useAppTheme(colorsOverride);
  const border = borderColor ?? theme.border;
  const bg = backgroundColor ?? theme.card;
  const prefixBg = prefixBackgroundColor ?? theme.background;
  const fg = textColor ?? theme.text;
  const ph = placeholderTextColor ?? theme.textSecondary;

  return (
    <View style={[styles.row, {borderColor: border, backgroundColor: bg}, style]} testID={testID}>
      <View
        style={[styles.prefix, {backgroundColor: prefixBg, borderColor: border}]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        <Text style={[styles.prefixText, {color: fg}]}>+91</Text>
      </View>
      <TextInput
        style={[styles.input, {color: fg}, inputStyle]}
        value={localTenDigits(value).slice(0, 10)}
        onChangeText={text => onChangeText(localTenDigits(text).slice(0, 10))}
        placeholder={placeholder}
        placeholderTextColor={ph}
        keyboardType="phone-pad"
        maxLength={10}
        editable={editable}
        autoFocus={autoFocus}
        textContentType="telephoneNumber"
        accessibilityLabel="10-digit mobile number"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 52,
  },
  prefix: {
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
  },
  prefixText: {
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 0,
    minHeight: 52,
  },
});

export default PhoneNumberInput;
