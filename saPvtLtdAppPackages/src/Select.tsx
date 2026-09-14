import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {
  SELECT_SEARCH_DEBOUNCE_MS,
  filterSelectOptions,
} from './filterSelectOptions';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Optional extra searchable text (aliases). */
  searchText?: string;
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
  /**
   * `crystal` ≈ web `--crystal-control-bg` (soft wash, no blue border).
   * Use inside CrystalSurface / request forms.
   */
  variant?: 'default' | 'crystal';
  /** Show × when a value is selected (web SingleSelect allowClear). */
  allowClear?: boolean;
  clearAriaLabel?: string;
  /** Show a searchable field at the top of the options sheet. */
  showSearch?: boolean;
  searchPlaceholder?: string;
  emptySearchText?: string;
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
  variant = 'default',
  allowClear,
  clearAriaLabel = 'Clear',
  showSearch = false,
  searchPlaceholder = 'Search…',
  emptySearchText = 'No results found',
}: SelectProps) {
  const theme = useAppTheme(colorsOverride);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const selected = options.find(o => o.value === value);
  const sheetTitle = title || label || placeholder;
  const isCrystal = variant === 'crystal';
  // Prefer caller override; default crystal wash ≈ web --crystal-control-bg
  const triggerBg = isCrystal
    ? colorsOverride?.card || 'rgba(255,255,255,0.72)'
    : theme.card;
  // Sheet must be opaque so sticky CTAs behind the Modal cannot show through.
  const isDarkPanel =
    String(theme.background || '').toLowerCase().startsWith('#0') ||
    String(theme.background || '').toLowerCase().startsWith('#1');
  const panelBg = isDarkPanel ? '#152033' : '#FFFFFF';
  // Web: allowClear defaults on when a placeholder exists.
  const canClear =
    (allowClear ?? Boolean(placeholder)) && Boolean(value) && !disabled;

  useEffect(() => {
    if (!open) {
      setSearchText('');
      setDebouncedQuery('');
      return;
    }
    const handle = setTimeout(() => {
      setDebouncedQuery(searchText);
    }, SELECT_SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [searchText, open]);

  const visibleOptions = useMemo(() => {
    if (!showSearch) return options;
    return filterSelectOptions(options, debouncedQuery);
  }, [options, showSearch, debouncedQuery]);

  const closeSheet = () => {
    setOpen(false);
    setSearchText('');
    setDebouncedQuery('');
  };

  return (
    <View style={[styles.wrap, style]} testID={testID}>
      {label ? (
        <Text style={[styles.label, {color: theme.textSecondary}]}>{label}</Text>
      ) : null}
      <View
        style={[
          styles.trigger,
          isCrystal && styles.triggerCrystal,
          {
            borderWidth: error ? 1.5 : 0,
            borderColor: error ? theme.danger || '#FF3B30' : 'transparent',
            backgroundColor: triggerBg,
            shadowColor: '#1e3c5a',
            shadowOpacity: isCrystal ? 0 : 0.06,
            shadowRadius: isCrystal ? 0 : 10,
            shadowOffset: {width: 0, height: isCrystal ? 0 : 2},
            elevation: 0,
          },
          disabled && styles.disabled,
        ]}>
        <TouchableOpacity
          style={styles.triggerMain}
          disabled={disabled}
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityState={{disabled, expanded: open}}>
          <Text
            style={[
              styles.triggerText,
              {color: selected ? theme.text : theme.textSecondary},
            ]}
            numberOfLines={2}>
            {selected?.label || placeholder}
          </Text>
        </TouchableOpacity>
        {canClear ? (
          <TouchableOpacity
            onPress={() => onChange('')}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
            accessibilityRole="button"
            accessibilityLabel={clearAriaLabel}
            style={styles.clearBtn}>
            <Text style={[styles.clearText, {color: theme.textSecondary}]}>
              ×
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          disabled={disabled}
          onPress={() => setOpen(true)}
          hitSlop={{top: 8, bottom: 8, left: 4, right: 4}}
          accessibilityRole="button">
          <Text style={[styles.chevron, {color: theme.textSecondary}]}>▾</Text>
        </TouchableOpacity>
      </View>
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
        statusBarTranslucent
        onRequestClose={closeSheet}>
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={closeSheet}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <View
            style={[
              styles.panel,
              {backgroundColor: panelBg},
              // Searchable geography selectors keep a stable sheet height so
              // result count (0 / 1 / many) never shrinks or grows the panel.
              showSearch ? styles.panelFixed : null,
            ]}>
            <View style={styles.handleRow}>
              <View
                style={[styles.handle, {backgroundColor: theme.border}]}
              />
            </View>
            <Text style={[styles.panelTitle, {color: theme.text}]}>
              {sheetTitle}
            </Text>
            {showSearch ? (
              <View
                style={[
                  styles.searchWrap,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.background,
                  },
                ]}>
                <Text style={[styles.searchIcon, {color: theme.textSecondary}]}>
                  🔍
                </Text>
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={theme.textSecondary}
                  style={[styles.searchInput, {color: theme.text}]}
                  autoCorrect={false}
                  autoCapitalize="none"
                  clearButtonMode="never"
                  accessibilityLabel={searchPlaceholder}
                  accessibilityRole="search"
                />
                {searchText ? (
                  <TouchableOpacity
                    onPress={() => setSearchText('')}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Clear search">
                    <Text
                      style={[styles.searchClear, {color: theme.textSecondary}]}>
                      ×
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
            <FlatList
              data={visibleOptions}
              keyExtractor={item => item.value}
              keyboardShouldPersistTaps="handled"
              style={showSearch ? styles.optionListFixed : undefined}
              contentContainerStyle={
                showSearch && visibleOptions.length === 0
                  ? styles.optionListEmptyContent
                  : undefined
              }
              ListEmptyComponent={
                <Text
                  style={[styles.emptyText, {color: theme.textSecondary}]}>
                  {emptySearchText}
                </Text>
              }
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
                      // Defer close so the same touch cannot fall through to
                      // views under the Modal (e.g. browse location "Done").
                      requestAnimationFrame(() => closeSheet());
                    }}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: active,
                      disabled: !!item.disabled,
                    }}>
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
                      <Text style={[styles.check, {color: theme.primary}]}>
                        ✓
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
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
    minHeight: 44,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 0,
  },
  triggerCrystal: {
    minHeight: 44,
    borderRadius: 16,
    borderWidth: 0,
    borderColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 11,
    elevation: 0,
  },
  triggerMain: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  triggerText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  chevron: {fontSize: 14, marginLeft: 2},
  clearBtn: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 2,
  },
  clearText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
  },
  disabled: {opacity: 0.5},
  helper: {fontSize: 12, marginTop: 4},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  panel: {
    maxHeight: '72%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 28,
    shadowColor: '#1e3c5a',
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: {width: 0, height: -4},
    elevation: 24,
  },
  panelFixed: {
    height: '72%',
    maxHeight: '72%',
  },
  optionListFixed: {
    flex: 1,
    minHeight: 0,
  },
  optionListEmptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    paddingVertical: 10,
  },
  searchWrap: {
    marginHorizontal: 16,
    marginBottom: 8,
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchIcon: {fontSize: 14},
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
    minHeight: 40,
  },
  searchClear: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 20,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  optionText: {fontSize: 15, flex: 1},
  check: {fontSize: 16, fontWeight: '700', marginLeft: 12},
});
