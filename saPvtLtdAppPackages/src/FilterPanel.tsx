import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {Button} from './Button';

export interface FilterPanelProps {
  title?: string;
  children?: React.ReactNode;
  onApply?: () => void;
  onReset?: () => void;
  applyLabel?: string;
  resetLabel?: string;
  defaultOpen?: boolean;
  collapsible?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function FilterPanel({
  title = 'Filters',
  children,
  onApply,
  onReset,
  applyLabel = 'Apply',
  resetLabel = 'Reset',
  defaultOpen = true,
  collapsible = true,
  style,
  colors: colorsOverride,
}: FilterPanelProps) {
  const theme = useAppTheme(colorsOverride);
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View
      style={[
        styles.panel,
        {backgroundColor: theme.card, borderColor: theme.border},
        style,
      ]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
        {collapsible ? (
          <Pressable onPress={() => setOpen(v => !v)} hitSlop={8}>
            <Text style={{color: theme.textSecondary, fontSize: 18}}>
              {open ? '▴' : '▾'}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {open ? (
        <>
          <View style={styles.body}>{children}</View>
          {onApply || onReset ? (
            <View style={styles.footer}>
              {onReset ? (
                <Button variant="ghost" size="sm" title={resetLabel} onPress={onReset} />
              ) : null}
              {onApply ? (
                <Button variant="primary" size="sm" title={applyLabel} onPress={onApply} />
              ) : null}
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {fontSize: 15, fontWeight: '700'},
  body: {marginTop: 12, gap: 12},
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
});
