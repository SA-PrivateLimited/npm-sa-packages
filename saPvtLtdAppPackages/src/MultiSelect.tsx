import React, {useMemo, useState} from 'react';
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

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
  title?: string;
  error?: string;
  helperText?: string;
  testID?: string;
  doneLabel?: string;
  selectedCountLabel?: (count: number) => string;
  colors?: Partial<AppThemeColors>;
}

export function MultiSelect({
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
  doneLabel = 'Done',
  selectedCountLabel,
  colors: colorsOverride,
}: MultiSelectProps) {
  const theme = useAppTheme(colorsOverride);
  const [open, setOpen] = useState(false);
  const sheetTitle = title || label || placeholder;

  const selectedLabels = useMemo(() => {
    const map = new Map(options.map(o => [o.value, o.label]));
    return value.map(v => map.get(v) || v);
  }, [options, value]);

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter(v => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const summary =
    value.length === 0
      ? placeholder
      : selectedCountLabel
        ? selectedCountLabel(value.length)
        : `${value.length} selected`;

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
        accessibilityRole="button">
        <Text
          style={[
            styles.triggerText,
            {color: value.length ? theme.text : theme.textSecondary},
          ]}
          numberOfLines={1}>
          {summary}
        </Text>
        <Text style={[styles.chevron, {color: theme.textSecondary}]}>▾</Text>
      </TouchableOpacity>

      {selectedLabels.length > 0 ? (
        <View style={styles.chips}>
          {value.map(v => {
            const opt = options.find(o => o.value === v);
            return (
              <TouchableOpacity
                key={v}
                style={[styles.chip, {backgroundColor: `${theme.primary}22`}]}
                onPress={() => toggle(v)}
                disabled={disabled}>
                <Text style={[styles.chipText, {color: theme.primary}]}>
                  {opt?.label || v} ×
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}

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
            <View
              style={[
                styles.panelHeader,
                {borderBottomColor: theme.border},
              ]}>
              <Text style={[styles.panelTitle, {color: theme.text}]}>
                {sheetTitle}
              </Text>
              <TouchableOpacity onPress={() => setOpen(false)} hitSlop={8}>
                <Text style={[styles.done, {color: theme.primary}]}>
                  {doneLabel}
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => {
                const checked = value.includes(item.value);
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      checked && {backgroundColor: `${theme.primary}18`},
                    ]}
                    disabled={item.disabled}
                    onPress={() => toggle(item.value)}>
                    <Text
                      style={[
                        styles.check,
                        {color: checked ? theme.primary : theme.textSecondary},
                      ]}>
                      {checked ? '☑' : '☐'}
                    </Text>
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: theme.text,
                          opacity: item.disabled ? 0.45 : 1,
                        },
                      ]}>
                      {item.label}
                    </Text>
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
  chevron: {fontSize: 14},
  disabled: {opacity: 0.5},
  helper: {fontSize: 12, marginTop: 4},
  chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8},
  chip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipText: {fontSize: 12, fontWeight: '600'},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  panel: {
    maxHeight: '65%',
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
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  panelTitle: {fontSize: 16, fontWeight: '700', flex: 1, paddingRight: 12},
  done: {fontSize: 15, fontWeight: '700'},
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  check: {fontSize: 18, width: 24},
  optionText: {fontSize: 15, flex: 1},
});
