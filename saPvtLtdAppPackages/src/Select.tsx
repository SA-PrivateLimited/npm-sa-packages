import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
  /** Sheet title; defaults to label or placeholder */
  title?: string;
  error?: string;
  helperText?: string;
  testID?: string;
  /** Optional color overrides (otherwise uses AppThemeProvider) */
  colors?: Partial<AppThemeColors>;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  style,
  title,
  error,
  helperText,
  testID,
  colors: colorsOverride,
}: SelectProps) {
  const theme = useAppTheme(colorsOverride);
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  const sheetTitle = title || label || placeholder;

  return (
    <View style={[styles.wrap, style]} testID={testID}>
      {label ? (
        <Text style={[styles.label, {color: theme.textSecondary}]}>{label}</Text>
      ) : null}
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            borderColor: error ? theme.danger || '#FF3B30' : theme.border,
            backgroundColor: theme.card,
          },
          disabled && styles.disabled,
        ]}
        disabled={disabled}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityState={{disabled, expanded: open}}>
        <Text
          style={[
            styles.triggerText,
            {color: selected ? theme.text : theme.textSecondary},
          ]}
          numberOfLines={1}>
          {selected?.label || placeholder}
        </Text>
        <Text style={[styles.chevron, {color: theme.textSecondary}]}>▾</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={[styles.helper, {color: theme.danger || '#FF3B30'}]}>
          {error}
        </Text>
      ) : helperText ? (
        <Text style={[styles.helper, {color: theme.textSecondary}]}>
          {helperText}
        </Text>
      ) : null}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}>
          <View
            style={[styles.panel, {backgroundColor: theme.card}]}
            onStartShouldSetResponder={() => true}>
            <View style={styles.handleRow}>
              <View
                style={[styles.handle, {backgroundColor: theme.border}]}
              />
            </View>
            <Text style={[styles.panelTitle, {color: theme.text}]}>
              {sheetTitle}
            </Text>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => {
                const active = item.value === value;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      active && {
                        backgroundColor: `${theme.primary}18`,
                      },
                    ]}
                    disabled={item.disabled}
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{selected: active, disabled: !!item.disabled}}>
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: active ? theme.primary : theme.text,
                          fontWeight: active ? '600' : '400',
                          opacity: item.disabled ? 0.45 : 1,
                        },
                      ]}>
                      {item.label}
                    </Text>
                    {active ? (
                      <Text style={[styles.check, {color: theme.primary}]}>✓</Text>
                    ) : null}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {width: '100%', marginBottom: 12},
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  trigger: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: {fontSize: 15, flex: 1, paddingRight: 8},
  chevron: {fontSize: 14, marginLeft: 4},
  disabled: {opacity: 0.5},
  helper: {fontSize: 12, marginTop: 4},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  panel: {
    maxHeight: '60%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 28,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {fontSize: 15, flex: 1},
  check: {fontSize: 16, fontWeight: '700', marginLeft: 12},
});
