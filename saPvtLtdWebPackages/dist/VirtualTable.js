import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon.js';
import { MultiSelectCheckbox } from './MultiSelect.js';
const DEFAULT_DEBOUNCE_MS = 300;
function normalize(value) {
    return value.trim().toLowerCase();
}
function FilterPanelPortal({ anchorEl, panelRef, isMulti, className, children, label, }) {
    const [style, setStyle] = useState({
        position: 'fixed',
        top: 0,
        left: 0,
        visibility: 'hidden',
        zIndex: 1000,
    });
    useLayoutEffect(() => {
        const update = () => {
            if (!anchorEl)
                return;
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
    if (!anchorEl)
        return null;
    return createPortal(_jsx("div", { ref: panelRef, className: className, style: style, role: "dialog", "aria-label": label, children: children }), document.body);
}
/**
 * Admin data table: sticky headers, column search (`search`) or multi-filter
 * (`filter_alt`), debounced text filter, client pagination.
 */
export function VirtualTable({ columns, data, rowKey, height = 420, pageSize = 20, emptyMessage = 'No rows', className = '', filterDebounceMs = DEFAULT_DEBOUNCE_MS, loading = false, loadingMessage = 'Loading…', serverPagination, }) {
    const isServer = Boolean(serverPagination);
    const [page, setPage] = useState(0);
    const [draftText, setDraftText] = useState({});
    const [appliedText, setAppliedText] = useState({});
    const [multiFilters, setMultiFilters] = useState({});
    const [openFilterKey, setOpenFilterKey] = useState(null);
    const headerRef = useRef(null);
    const panelRef = useRef(null);
    const buttonRefs = useRef({});
    const inputRefs = useRef({});
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setAppliedText(draftText);
        }, Math.max(0, filterDebounceMs));
        return () => window.clearTimeout(timer);
    }, [draftText, filterDebounceMs]);
    useEffect(() => {
        if (!isServer)
            setPage(0);
    }, [appliedText, multiFilters, data, isServer]);
    useEffect(() => {
        if (!openFilterKey)
            return;
        const onDoc = (e) => {
            const target = e.target;
            if (!target)
                return;
            if (headerRef.current?.contains(target))
                return;
            if (panelRef.current?.contains(target))
                return;
            if (target.closest?.('.ant-select-dropdown'))
                return;
            setOpenFilterKey(null);
        };
        const onKey = (e) => {
            if (e.key === 'Escape')
                setOpenFilterKey(null);
        };
        document.addEventListener('mousedown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [openFilterKey]);
    useEffect(() => {
        if (!openFilterKey)
            return;
        const col = columns.find((c) => c.key === openFilterKey);
        if (col?.filterType === 'multi')
            return;
        const el = inputRefs.current[openFilterKey];
        el?.focus();
        el?.select();
    }, [openFilterKey, columns]);
    const derivedMultiOptions = useMemo(() => {
        const map = {};
        for (const col of columns) {
            if (!col.filterable || col.filterType !== 'multi')
                continue;
            if (col.filterOptions?.length) {
                map[col.key] = col.filterOptions;
                continue;
            }
            const seen = new Set();
            const opts = [];
            for (const row of data) {
                const raw = String(col.filterValue?.(row) ?? '').trim();
                if (!raw)
                    continue;
                const key = normalize(raw);
                if (seen.has(key))
                    continue;
                seen.add(key);
                opts.push({ value: raw, label: raw });
            }
            opts.sort((a, b) => a.label.localeCompare(b.label));
            map[col.key] = opts;
        }
        return map;
    }, [columns, data]);
    const filteredData = useMemo(() => {
        return data.filter((row) => columns.every((col) => {
            if (!col.filterable)
                return true;
            const cell = String(col.filterValue?.(row) ?? '');
            if (col.filterType === 'multi') {
                const selected = multiFilters[col.key] || [];
                if (selected.length === 0)
                    return true;
                const cellNorm = normalize(cell);
                return selected.some((v) => normalize(v) === cellNorm);
            }
            const q = normalize(appliedText[col.key] || '');
            if (!q)
                return true;
            return normalize(cell).includes(q);
        }));
    }, [appliedText, columns, data, multiFilters]);
    const clientTotalPages = Math.max(1, Math.ceil(filteredData.length / Math.max(1, pageSize)));
    const serverTotal = serverPagination?.total ?? 0;
    const serverPage = serverPagination?.page ?? 0;
    const serverTotalPages = Math.max(1, Math.ceil(serverTotal / Math.max(1, pageSize)));
    const totalPages = isServer ? serverTotalPages : clientTotalPages;
    const safePage = isServer
        ? Math.min(Math.max(0, serverPage), totalPages - 1)
        : Math.min(page, totalPages - 1);
    const pageRows = useMemo(() => {
        if (isServer)
            return filteredData;
        const start = safePage * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, isServer, pageSize, safePage]);
    const displayTotal = isServer ? serverTotal : filteredData.length;
    const isFiltered = !isServer && filteredData.length !== data.length;
    const goToPage = (next) => {
        const clamped = Math.max(0, Math.min(totalPages - 1, next));
        if (isServer && serverPagination) {
            serverPagination.onPageChange(clamped);
        }
        else {
            setPage(clamped);
        }
    };
    const hasActiveFilter = (col) => {
        if (col.filterType === 'multi') {
            return (multiFilters[col.key] || []).length > 0;
        }
        return Boolean((appliedText[col.key] || draftText[col.key] || '').trim());
    };
    const clearTextColumn = (key) => {
        setDraftText((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };
    const openFilter = (key) => {
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
    return (_jsxs("div", { className: `hs-vtable ${className}`.trim(), "aria-busy": loading || undefined, children: [_jsxs("div", { className: "hs-vtable__scroll", style: { height, overflowX: 'hidden', overflowY: 'auto', position: 'relative' }, children: [loading ? (_jsxs("div", { className: "hs-vtable__loading", role: "status", "aria-live": "polite", children: [_jsx(Icon, { name: "progress_activity", size: 28, weight: 400, className: "hs-vtable__spinner" }), _jsx("span", { children: loadingMessage })] })) : null, _jsxs("table", { className: "hs-vtable__table", children: [_jsx("thead", { ref: headerRef, children: _jsx("tr", { children: columns.map((col) => {
                                        const isMulti = col.filterType === 'multi';
                                        const active = hasActiveFilter(col);
                                        const open = openFilterKey === col.key;
                                        const iconName = isMulti ? 'filter_alt' : 'search';
                                        return (_jsx("th", { style: col.width ? { width: col.width } : undefined, className: [
                                                col.filterable ? 'hs-vtable__th--filterable' : '',
                                                open ? 'hs-vtable__th--filter-open' : '',
                                            ]
                                                .filter(Boolean)
                                                .join(' ') || undefined, children: _jsxs("div", { className: "hs-vtable__th-row", children: [_jsx("span", { className: "hs-vtable__th-label", children: col.header }), col.filterable ? (_jsx("div", { className: "hs-vtable__search-wrap", children: _jsx("button", { ref: (el) => {
                                                                buttonRefs.current[col.key] = el;
                                                            }, type: "button", className: `hs-vtable__search-btn${active || open
                                                                ? ' hs-vtable__search-btn--active'
                                                                : ''}`, "aria-label": `${isMulti ? 'Filter' : 'Search'} ${String(col.header)}`, "aria-expanded": open, onClick: (e) => {
                                                                e.stopPropagation();
                                                                openFilter(col.key);
                                                            }, children: _jsx(Icon, { name: iconName, size: 18, weight: 400 }) }) })) : null] }) }, col.key));
                                    }) }) }), _jsx("tbody", { children: loading ? (_jsx("tr", { children: _jsx("td", { className: "hs-vtable__empty-cell", colSpan: Math.max(1, columns.length) }) })) : pageRows.length === 0 ? (_jsx("tr", { children: _jsx("td", { className: "hs-vtable__empty-cell", colSpan: Math.max(1, columns.length), children: emptyMessage }) })) : (pageRows.map((row, index) => {
                                    const absoluteIndex = safePage * pageSize + index;
                                    const key = rowKey(row, absoluteIndex);
                                    return (_jsx("tr", { children: columns.map((col) => (_jsx("td", { style: col.width ? { width: col.width } : undefined, children: col.render(row, absoluteIndex) }, col.key))) }, key));
                                })) })] })] }), openFilterKey && openCol ? (_jsx(FilterPanelPortal, { anchorEl: openAnchorEl ?? null, panelRef: panelRef, isMulti: Boolean(openIsMulti), className: `hs-vtable__search-panel hs-vtable__search-panel--portal${openIsMulti ? ' hs-vtable__search-panel--multi' : ''}`, label: openLabel, children: openIsMulti ? (_jsx(MultiSelectCheckbox, { options: derivedMultiOptions[openFilterKey] || [], value: multiFilters[openFilterKey] || [], onChange: (next) => setMultiFilters((prev) => ({
                        ...prev,
                        [openFilterKey]: next,
                    })), placeholder: openCol.filterPlaceholder ||
                        `Filter ${String(openCol.header)}…`, maxTagCount: "responsive" })) : (_jsxs("div", { className: "hs-vtable__search-field", children: [_jsx(Icon, { name: "search", size: 16, weight: 400, className: "hs-vtable__search-field-icon" }), _jsx("input", { ref: (el) => {
                                inputRefs.current[openFilterKey] = el;
                            }, type: "search", className: "hs-vtable__filter", value: draftText[openFilterKey] || '', placeholder: openCol.filterPlaceholder ||
                                `Search ${String(openCol.header)}…`, onChange: (e) => setDraftText((prev) => ({
                                ...prev,
                                [openFilterKey]: e.target.value,
                            })), onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    setAppliedText(draftText);
                                    setOpenFilterKey(null);
                                }
                            }, "aria-label": `Search ${String(openCol.header)}` }), (draftText[openFilterKey] || '').trim() ? (_jsx("button", { type: "button", className: "hs-vtable__search-clear", "aria-label": "Clear search", onClick: () => clearTextColumn(openFilterKey), children: _jsx(Icon, { name: "close", size: 16, weight: 400 }) })) : null] })) })) : null, _jsxs("div", { className: "hs-vtable__footer", children: [_jsx("span", { className: "hs-vtable__meta", children: displayTotal === 0
                            ? `0 items${isFiltered ? ` (filtered from ${data.length})` : ''}`
                            : `Showing ${displayTotal === 0 ? 0 : safePage * pageSize + 1}–${Math.min((safePage + 1) * pageSize, displayTotal)} of ${displayTotal}${isFiltered ? ` (filtered from ${data.length})` : ''}` }), _jsxs("div", { className: "hs-vtable__pager", children: [_jsx("button", { type: "button", className: "hs-btn", disabled: safePage <= 0 || loading, onClick: () => goToPage(safePage - 1), children: "Previous" }), _jsxs("span", { className: "hs-vtable__meta", children: ["Page ", safePage + 1, " / ", totalPages] }), _jsx("button", { type: "button", className: "hs-btn", disabled: safePage >= totalPages - 1 || loading, onClick: () => goToPage(safePage + 1), children: "Next" })] })] })] }));
}
