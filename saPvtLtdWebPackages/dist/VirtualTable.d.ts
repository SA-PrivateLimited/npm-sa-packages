import { type ReactNode } from 'react';
export interface VirtualTableFilterOption {
    value: string;
    label: string;
}
export type VirtualTableFilterType = 'search' | 'multi';
export interface VirtualTableColumn<T> {
    key: string;
    header: ReactNode;
    width?: number | string;
    render: (row: T, index: number) => ReactNode;
    /** Enable column filter (search or multi). */
    filterable?: boolean;
    /**
     * `search` — free text + Material `search` icon (default).
     * `multi` — checkbox MultiSelect + Material `filter_alt` for fixed lists.
     */
    filterType?: VirtualTableFilterType;
    /** Options for `multi`. If omitted, unique values are derived from `data`. */
    filterOptions?: VirtualTableFilterOption[];
    /** Value used for filtering (text contains / multi exact match). */
    filterValue?: (row: T) => string;
    filterPlaceholder?: string;
}
/** @deprecated Row selection removed — prefer explicit bulk-action UIs when needed. */
export interface VirtualTableRowSelection {
    selectedKeys: string[];
    onChange: (keys: string[]) => void;
}
export interface VirtualTableProps<T> {
    columns: VirtualTableColumn<T>[];
    data: T[];
    rowKey: (row: T, index: number) => string;
    height?: number;
    pageSize?: number;
    emptyMessage?: string;
    className?: string;
    /** Debounce ms for text search only (default 300). Multi applies immediately. */
    filterDebounceMs?: number;
    /** Show in-table loading overlay (headers stay visible). */
    loading?: boolean;
    loadingMessage?: string;
    /**
     * Server-driven pagination. When set, `data` is the current page only;
     * footer uses `total` and calls `onPageChange` (0-based page index).
     */
    serverPagination?: {
        total: number;
        page: number;
        onPageChange: (page: number) => void;
    };
}
/**
 * Admin data table: sticky headers, column search (`search`) or multi-filter
 * (`filter_alt`), debounced text filter, client pagination.
 */
export declare function VirtualTable<T>({ columns, data, rowKey, height, pageSize, emptyMessage, className, filterDebounceMs, loading, loadingMessage, serverPagination, }: VirtualTableProps<T>): import("react").JSX.Element;
//# sourceMappingURL=VirtualTable.d.ts.map