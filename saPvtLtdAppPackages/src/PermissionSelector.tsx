import React from 'react';
import {View, Text, Pressable, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export interface PermissionItem {
  id: string;
  label: string;
  description?: string;
}

export interface PermissionModule {
  id: string;
  label: string;
  permissions: PermissionItem[];
}

export interface PermissionSelectorProps {
  modules: PermissionModule[];
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

function Check({
  checked,
  indeterminate,
  color,
}: {
  checked: boolean;
  indeterminate?: boolean;
  color: string;
}) {
  return (
    <View
      style={[
        styles.check,
        {
          borderColor: color,
          backgroundColor: checked || indeterminate ? color : 'transparent',
        },
      ]}>
      {(checked || indeterminate) && (
        <Text style={styles.checkMark}>{indeterminate && !checked ? '–' : '✓'}</Text>
      )}
    </View>
  );
}

export function PermissionSelector({
  modules,
  value,
  onChange,
  disabled = false,
  style,
  colors: colorsOverride,
}: PermissionSelectorProps) {
  const theme = useAppTheme(colorsOverride);
  const selected = new Set(value);

  const toggle = (id: string) => {
    if (disabled) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  const toggleModule = (mod: PermissionModule) => {
    if (disabled) return;
    const ids = mod.permissions.map(p => p.id);
    const allOn = ids.every(id => selected.has(id));
    const next = new Set(selected);
    if (allOn) ids.forEach(id => next.delete(id));
    else ids.forEach(id => next.add(id));
    onChange(Array.from(next));
  };

  return (
    <View style={[styles.wrap, style]}>
      {modules.map(mod => {
        const ids = mod.permissions.map(p => p.id);
        const allOn = ids.length > 0 && ids.every(id => selected.has(id));
        const someOn = ids.some(id => selected.has(id));
        return (
          <View
            key={mod.id}
            style={[
              styles.module,
              {borderColor: theme.border, backgroundColor: theme.card},
            ]}>
            <Pressable
              disabled={disabled || ids.length === 0}
              onPress={() => toggleModule(mod)}
              style={styles.moduleHead}>
              <Check
                checked={allOn}
                indeterminate={!allOn && someOn}
                color={theme.primary}
              />
              <Text style={[styles.moduleLabel, {color: theme.text}]}>
                {mod.label}
              </Text>
            </Pressable>
            {mod.permissions.map(p => (
              <Pressable
                key={p.id}
                disabled={disabled}
                onPress={() => toggle(p.id)}
                style={styles.item}>
                <Check checked={selected.has(p.id)} color={theme.primary} />
                <View style={{flex: 1}}>
                  <Text style={{color: theme.text, fontWeight: '600'}}>
                    {p.label}
                  </Text>
                  {p.description ? (
                    <Text style={{color: theme.textSecondary, fontSize: 12}}>
                      {p.description}
                    </Text>
                  ) : null}
                </View>
              </Pressable>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {gap: 12},
  module: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  moduleHead: {flexDirection: 'row', alignItems: 'center', gap: 10},
  moduleLabel: {fontSize: 15, fontWeight: '700'},
  item: {flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingLeft: 4},
  check: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkMark: {color: '#fff', fontSize: 12, fontWeight: '700', lineHeight: 14},
});
