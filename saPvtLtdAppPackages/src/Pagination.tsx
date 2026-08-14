import React from 'react';
import {View, Text, Pressable, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function Pagination({
  page,
  pageSize,
  total,
  onChange,
  style,
  colors: colorsOverride,
}: PaginationProps) {
  const theme = useAppTheme(colorsOverride);
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const current = Math.min(Math.max(1, page), totalPages);
  const from = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const to = Math.min(total, current * pageSize);

  return (
    <View style={[styles.row, style]}>
      <Text style={{color: theme.textSecondary, fontSize: 13}}>
        {from}–{to} of {total}
      </Text>
      <View style={styles.controls}>
        <Pressable
          disabled={current <= 1}
          onPress={() => onChange(current - 1)}
          style={[
            styles.btn,
            {borderColor: theme.border, opacity: current <= 1 ? 0.4 : 1},
          ]}>
          <Text style={{color: theme.text}}>‹</Text>
        </Pressable>
        <Text style={[styles.page, {color: theme.text}]}>
          {current} / {totalPages}
        </Text>
        <Pressable
          disabled={current >= totalPages}
          onPress={() => onChange(current + 1)}
          style={[
            styles.btn,
            {
              borderColor: theme.border,
              opacity: current >= totalPages ? 0.4 : 1,
            },
          ]}>
          <Text style={{color: theme.text}}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  controls: {flexDirection: 'row', alignItems: 'center', gap: 8},
  btn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {fontSize: 13, fontWeight: '600', minWidth: 64, textAlign: 'center'},
});
