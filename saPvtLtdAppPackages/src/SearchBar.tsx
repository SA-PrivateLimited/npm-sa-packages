import React from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
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
      <Text style={[styles.glyph, {color: theme.textSecondary}]}>⌕</Text>
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
          <Text style={{color: theme.textSecondary, fontSize: 18}}>×</Text>
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
    fontSize: 15,
    paddingVertical: 8,
  },
});
