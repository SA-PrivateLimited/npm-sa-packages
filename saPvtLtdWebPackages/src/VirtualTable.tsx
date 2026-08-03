import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import {createPortal} from 'react-dom';
import {Icon} from './Icon.js';
import {MultiSelectCheckbox} from './MultiSelect.js';

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

const DEFAULT_DEBOUNCE_MS = 300;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function FilterPanelPortal({
  anchorEl,
  panelRef,
  isMulti,
  className,
  children,
  label,
}: {
  anchorEl: HTMLElement | null;
  panelRef: RefObject<HTMLDivElement | null>;
  isMulti: boolean;
  className: string;
  children: ReactNode;
  label: string;
}) {
  const [style, setStyle] = useState<CSSProperties>({
    position: 'fixed',
    top: 0,
    left: 0,
    visibility: 'hidden',
    zIndex: 1000,
  });

  useLayoutEffect(() => {
    const update = () => {
      if (!anchorEl) return;
      const rect = anchorEl.getBoundingClientRect();
      const preferredWidth = isMulti
        ? Math.min(280, window.innerWidth * 0.8)
        : Math.min(240, window.innerWidth * 0.7);
      // Open below the button, growing right into the table (not left under sidebar).
      let left = rect.left;
      if (left + preferredWidth > window.innerWidth - 8) {
        left = Math.max(8, rect.right - preferredWidth);
      }
      left = Math.max(8, left);

      let top = rect.bottom + 6;
      const estimatedHeight = isMulti ? 280 : 52;
      if (top + estimatedHeight > window.innerHeight - 8) {
        top = Math.max(8, rect.top - estimatedHeight - 6);
      }

      setStyle({
        position: 'fixed',
        top,
        left,
        width: preferredWidth,
        zIndex: 1000,
        visibility: 'visible',
      });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [anchorEl, isMulti]);

  if (!anchorEl) return null;

  return createPortal(
    <div
      ref={panelRef}
      className={className}
      style={style}
      role="dialog"
      aria-label={label}>
      {children}
    </div>,
    document.body,
  );
}

/**
 * Admin data table: sticky headers, column search (`search`) or multi-filter
 * (`filter_alt`), debounced text filter, client pagination.
 */
export function VirtualTable<T>({
  columns,
  data,
  rowKey,
  height = 420,
  pageSize = 20,
  emptyMessage = 'No rows',
  className = '',
  filterDebounceMs = DEFAULT_DEBOUNCE_MS,
  loading = false,
  loadingMessage = 'Loading…',
  serverPagination,
}: VirtualTableProps<T>) {
  const isServer = Boolean(serverPagination);
  const [page, setPage] = useState(0);
  const [draftText, setDraftText] = useState<Record<string, string>>({});
  const [appliedText, setAppliedText] = useState<Record<string, string>>({});
  const [multiFilters, setMultiFilters] = useState<Record<string, string[]>>(
    {},
  );
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);
  const headerRef = useRef<HTMLTableSectionElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAppliedText(draftText);
    }, Math.max(0, filterDebounceMs));
    return () => window.clearTimeout(timer);
  }, [draftText, filterDebounceMs]);

  useEffect(() => {
    if (!isServer) setPage(0);
  }, [appliedText, multiFilters, data, isServer]);

  useEffect(() => {
    if (!openFilterKey) return;

    const onDoc = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (headerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      if (target.closest?.('.ant-select-dropdown')) return;
      setOpenFilterKey(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenFilterKey(null);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [openFilterKey]);

  useEffect(() => {
    if (!openFilterKey) return;
    const col = columns.find((c) => c.key === openFilterKey);
    if (col?.filterType === 'multi') return;
    const el = inputRefs.current[openFilterKey];
    el?.focus();
    el?.select();
  }, [openFilterKey, columns]);

  const derivedMultiOptions = useMemo(() => {
    const map: Record<string, VirtualTableFilterOption[]> = {};
    for (const col of columns) {
      if (!col.filterable || col.filterType !== 'multi') continue;
      if (col.filterOptions?.length) {
        map[col.key] = col.filterOptions;
        continue;
      }
      const seen = new Set<string>();
      const opts: VirtualTableFilterOption[] = [];
      for (const row of data) {
        const raw = String(col.filterValue?.(row) ?? '').trim();
        if (!raw) continue;
        const key = normalize(raw);
        if (seen.has(key)) continue;
        seen.add(key);
        opts.push({value: raw, label: raw});
      }
      opts.sort((a, b) => a.label.localeCompare(b.label));
      map[col.key] = opts;
    }
    return map;
  }, [columns, data]);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (!col.filterable) return true;
        const cell = String(col.filterValue?.(row) ?? '');

        if (col.filterType === 'multi') {
          const selected = multiFilters[col.key] || [];
          if (selected.length === 0) return true;
          const cellNorm = normalize(cell);
          return selected.some((v) => normalize(v) === cellNorm);
        }

        const q = normalize(appliedText[col.key] || '');
        if (!q) return true;
        return normalize(cell).includes(q);
      }),
    );
  }, [appliedText, columns, data, multiFilters]);

  const clientTotalPages = Math.max(
    1,
    Math.ceil(filteredData.length / Math.max(1, pageSize)),
  );
  const serverTotal = serverPagination?.total ?? 0;
  const serverPage = serverPagination?.page ?? 0;
  const serverTotalPages = Math.max(
    1,
    Math.ceil(serverTotal / Math.max(1, pageSize)),
  );
  const totalPages = isServer ? serverTotalPages : clientTotalPages;
  const safePage = isServer
    ? Math.min(Math.max(0, serverPage), totalPages - 1)
    : Math.min(page, totalPages - 1);

  const pageRows = useMemo(() => {
    if (isServer) return filteredData;
    const start = safePage * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, isServer, pageSize, safePage]);

  const displayTotal = isServer ? serverTotal : filteredData.length;
  const isFiltered = !isServer && filteredData.length !== data.length;

  const goToPage = (next: number) => {
    const clamped = Math.max(0, Math.min(totalPages - 1, next));
    if (isServer && serverPagination) {
      serverPagination.onPageChange(clamped);
    } else {
      setPage(clamped);
    }
  };

  const hasActiveFilter = (col: VirtualTableColumn<T>) => {
    if (col.filterType === 'multi') {
      return (multiFilters[col.key] || []).length > 0;
    }
    return Boolean(
      (appliedText[col.key] || draftText[col.key] || '').trim(),
    );
  };

  const clearTextColumn = (key: string) => {
    setDraftText((prev) => {
      const next = {...prev};
      delete next[key];
      return next;
    });
  };

  const openFilter = (key: string) => {
    setOpenFilterKey((prev) => (prev === key ? null : key));
  };

  const openCol = openFilterKey
    ? columns.find((c) => c.key === openFilterKey)
    : null;
  const openIsMulti = openCol?.filterType === 'multi';
  const openLabel = openCol
    ? `${openIsMulti ? 'Filter' : 'Search'} ${String(openCol.header)}`
    : '';
  const openAnchorEl = openFilterKey
    ? buttonRefs.current[openFilterKey]
    : null;

  return (
    <div className={`hs-vtable ${className}`.trim()} aria-busy={loading || undefined}>
      <div
        className="hs-vtable__scroll"
        style={{height, overflowX: 'hidden', overflowY: 'auto', position: 'relative'}}>
        {loading ? (
          <div className="hs-vtable__loading" role="status" aria-live="polite">
            <Icon
              name="progress_activity"
              size={28}
              weight={400}
              className="hs-vtable__spinner"
            />
            <span>{loadingMessage}</span>
          </div>
        ) : null}
        <table className="hs-vtable__table">
          <thead ref={headerRef}>
            <tr>
              {columns.map((col) => {
                const isMulti = col.filterType === 'multi';
                const active = hasActiveFilter(col);
                const open = openFilterKey === col.key;
                const iconName = isMulti ? 'filter_alt' : 'search';
                return (
                  <th
                    key={col.key}
                    style={col.width ? {width: col.width} : undefined}
                    className={[
                      col.filterable ? 'hs-vtable__th--filterable' : '',
                      open ? 'hs-vtable__th--filter-open' : '',
                    ]
                      .filter(Boolean)
                      .join(' ') || undefined}>
                    <div className="hs-vtable__th-row">
                      <span className="hs-vtable__th-label">{col.header}</span>
                      {col.filterable ? (
                        <div className="hs-vtable__search-wrap">
                          <button
                            ref={(el) => {
                              buttonRefs.current[col.key] = el;
                            }}
                            type="button"
                            className={`hs-vtable__search-btn${
                              active || open
                                ? ' hs-vtable__search-btn--active'
                                : ''
                            }`}
                            aria-label={`${isMulti ? 'Filter' : 'Search'} ${String(col.header)}`}
                            aria-expanded={open}
                            onClick={(e) => {
                              e.stopPropagation();
                              openFilter(col.key);
                            }}>
                            <Icon name={iconName} size={18} weight={400} />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  className="hs-vtable__empty-cell"
                  colSpan={Math.max(1, columns.length)}>
                  {/* Overlay carries the visible loader; keep row for layout */}
                </td>
              </tr>
            ) : pageRows.length === 0 ? (
              <tr>
                <td
                  className="hs-vtable__empty-cell"
                  colSpan={Math.max(1, columns.length)}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row, index) => {
                const absoluteIndex = safePage * pageSize + index;
                const key = rowKey(row, absoluteIndex);
                return (
                  <tr key={key}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={col.width ? {width: col.width} : undefined}>
                        {col.render(row, absoluteIndex)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {openFilterKey && openCol ? (
        <FilterPanelPortal
          anchorEl={openAnchorEl ?? null}
          panelRef={panelRef}
          isMulti={Boolean(openIsMulti)}
          className={`hs-vtable__search-panel hs-vtable__search-panel--portal${
            openIsMulti ? ' hs-vtable__search-panel--multi' : ''
          }`}
          label={openLabel}>
          {openIsMulti ? (
            <MultiSelectCheckbox
              options={derivedMultiOptions[openFilterKey] || []}
              value={multiFilters[openFilterKey] || []}
              onChange={(next) =>
                setMultiFilters((prev) => ({
                  ...prev,
                  [openFilterKey]: next,
                }))
              }
              placeholder={
                openCol.filterPlaceholder ||
                `Filter ${String(openCol.header)}…`
              }
              maxTagCount="responsive"
            />
          ) : (
            <div className="hs-vtable__search-field">
              <Icon
                name="search"
                size={16}
                weight={400}
                className="hs-vtable__search-field-icon"
              />
              <input
                ref={(el) => {
                  inputRefs.current[openFilterKey] = el;
                }}
                type="search"
                className="hs-vtable__filter"
                value={draftText[openFilterKey] || ''}
                placeholder={
                  openCol.filterPlaceholder ||
                  `Search ${String(openCol.header)}…`
                }
                onChange={(e) =>
                  setDraftText((prev) => ({
                    ...prev,
                    [openFilterKey]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setAppliedText(draftText);
                    setOpenFilterKey(null);
                  }
                }}
                aria-label={`Search ${String(openCol.header)}`}
              />
              {(draftText[openFilterKey] || '').trim() ? (
                <button
                  type="button"
                  className="hs-vtable__search-clear"
                  aria-label="Clear search"
                  onClick={() => clearTextColumn(openFilterKey)}>
                  <Icon name="close" size={16} weight={400} />
                </button>
              ) : null}
            </div>
          )}
        </FilterPanelPortal>
      ) : null}

      <div className="hs-vtable__footer">
        <span className="hs-vtable__meta">
          {displayTotal === 0
            ? `0 items${isFiltered ? ` (filtered from ${data.length})` : ''}`
            : `Showing ${
                displayTotal === 0 ? 0 : safePage * pageSize + 1
              }–${Math.min((safePage + 1) * pageSize, displayTotal)} of ${displayTotal}${
                isFiltered ? ` (filtered from ${data.length})` : ''
              }`}
        </span>
        <div className="hs-vtable__pager">
          <button
            type="button"
            className="hs-btn"
            disabled={safePage <= 0 || loading}
            onClick={() => goToPage(safePage - 1)}>
            Previous
          </button>
          <span className="hs-vtable__meta">
            Page {safePage + 1} / {totalPages}
          </span>
          <button
            type="button"
            className="hs-btn"
            disabled={safePage >= totalPages - 1 || loading}
            onClick={() => goToPage(safePage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
