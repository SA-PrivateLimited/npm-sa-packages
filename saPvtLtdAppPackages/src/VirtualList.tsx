import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
  type ListRenderItem,
} from 'react-native';

export interface VirtualListColumn<T> {
  key: string;
  header: string;
  flex?: number;
  render: (row: T, index: number) => React.ReactNode;
}

export interface VirtualListProps<T> {
  columns: VirtualListColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string;
  /** Page size; 0 = no pagination (scroll all) */
  pageSize?: number;
  emptyMessage?: string;
  style?: ViewStyle;
  onEndReached?: () => void;
}

export function VirtualList<T>({
  columns,
  data,
  rowKey,
  pageSize = 20,
  emptyMessage = 'No rows',
  style,
  onEndReached,
}: VirtualListProps<T>) {
  const [page, setPage] = useState(0);
  const totalPages =
    pageSize > 0 ? Math.max(1, Math.ceil(data.length / pageSize)) : 1;
  const safePage = Math.min(page, totalPages - 1);

  const pageRows = useMemo(() => {
    if (pageSize <= 0) return data;
    const start = safePage * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageSize, safePage]);

  const renderItem: ListRenderItem<T> = ({item, index}) => (
    <View style={styles.row}>
      {columns.map(col => (
        <View key={col.key} style={[styles.cell, {flex: col.flex ?? 1}]}>
          {col.render(item, index)}
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.header}>
        {columns.map(col => (
          <Text
            key={col.key}
            style={[styles.headerText, {flex: col.flex ?? 1}]}
            numberOfLines={1}>
            {col.header}
          </Text>
        ))}
      </View>

      <FlatList
        data={pageRows}
        keyExtractor={(item, index) => rowKey(item, index)}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>{emptyMessage}</Text>
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        style={styles.list}
      />

      {pageSize > 0 ? (
        <View style={styles.footer}>
          <Text style={styles.meta}>
            {data.length === 0
              ? '0 items'
              : `${safePage * pageSize + 1}–${Math.min(
                  (safePage + 1) * pageSize,
                  data.length,
                )} of ${data.length}`}
          </Text>
          <View style={styles.pager}>
            <TouchableOpacity
              style={[styles.btn, safePage <= 0 && styles.btnDisabled]}
              disabled={safePage <= 0}
              onPress={() => setPage(p => Math.max(0, p - 1))}>
              <Text style={styles.btnText}>Prev</Text>
            </TouchableOpacity>
            <Text style={styles.meta}>
              {safePage + 1}/{totalPages}
            </Text>
            <TouchableOpacity
              style={[
                styles.btn,
                safePage >= totalPages - 1 && styles.btnDisabled,
              ]}
              disabled={safePage >= totalPages - 1}
              onPress={() => setPage(p => Math.min(totalPages - 1, p + 1))}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#718096',
  },
  list: {flexGrow: 0},
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  cell: {justifyContent: 'center'},
  empty: {
    textAlign: 'center',
    paddingVertical: 28,
    color: '#718096',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  meta: {fontSize: 12, color: '#718096'},
  pager: {flexDirection: 'row', alignItems: 'center', gap: 8},
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
  },
  btnDisabled: {opacity: 0.4},
  btnText: {fontSize: 12, fontWeight: '600', color: '#1A202C'},
});
