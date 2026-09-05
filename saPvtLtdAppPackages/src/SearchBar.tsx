import React from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {Icon} from './Icon';
import {useAppTheme, type AppThemeColors} from './theme';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search…',
  style,
  colors: colorsOverride,
}: SearchBarProps) {
  const theme = useAppTheme(colorsOverride);

  return (
    <View
      style={[
        styles.row,
        {borderColor: theme.border, backgroundColor: theme.card},
        style,
      ]}>
      <Icon name="search" size={20} color={theme.textSecondary} />
      <TextInput
        style={[styles.input, {color: theme.text}]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        returnKeyType="search"
        onSubmitEditing={() => onSubmit?.(value)}
      />
      {value ? (
        <Pressable
          onPress={() => {
            onChange('');
            onClear?.();
          }}
          hitSlop={8}>
          <Icon name="close" size={18} color={theme.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  glyph: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});
