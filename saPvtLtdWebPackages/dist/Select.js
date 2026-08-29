import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { FieldWrap } from './FieldWrap.js';
import { Icon } from './Icon.js';
import { useMobileSheet, useOverlayScrollLock } from './useMobileSheetOverlay.js';
/**
 * Custom single-select dropdown (no Ant Design).
 * Mobile: full-width bottom sheet. Desktop: anchored list.
 */
export function Select({ label, options, value, onChange, placeholder = 'Select…', disabled = false, className = '', id, allowClear, showSearch = false, searchPlaceholder = 'Search…', emptyMessage = 'No options', clearAriaLabel = 'Clear', style, }) {
    const autoId = useId();
    const selectId = id || autoId;
    const rootRef = useRef(null);
    const overlayRef = useRef(null);
    const isMobileSheet = useMobileSheet();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [desktopPanelStyle, setDesktopPanelStyle] = useState({});
    const canClear = allowClear ?? Boolean(placeholder);
    useOverlayScrollLock(open && isMobileSheet);
    // Desktop: portal + fixed coords so overflow:hidden ancestors (e.g. crystal cards)
    // cannot clip the dropdown panel.
    useLayoutEffect(() => {
        if (!open || isMobileSheet)
            return;
        const update = () => {
            const el = rootRef.current;
            if (!el)
                return;
            const rect = el.getBoundingClientRect();
            const gap = 4;
            const maxH = 280;
            const spaceBelow = window.innerHeight - rect.bottom - gap - 8;
            const openUp = spaceBelow < 160 && rect.top > spaceBelow;
            setDesktopPanelStyle({
                position: 'fixed',
                left: rect.left,
                width: Math.max(rect.width, 160),
                zIndex: 1100,
                ...(openUp
                    ? { bottom: window.innerHeight - rect.top + gap, top: 'auto', maxHeight: Math.min(maxH, rect.top - gap - 8) }
                    : { top: rect.bottom + gap, bottom: 'auto', maxHeight: Math.min(maxH, Math.max(120, spaceBelow)) }),
            });
        };
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, [open, isMobileSheet]);
    const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return options;
        return options.filter((o) => {
            const haystack = `${o.label} ${o.searchText || ''}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [options, query]);
    const close = useCallback(() => {
        setOpen(false);
        setQuery('');
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const onDoc = (e) => {
            const target = e.target;
            if (rootRef.current?.contains(target))
                return;
            if (overlayRef.current?.contains(target))
                return;
            close();
        };
        const onKey = (e) => {
            if (e.key === 'Escape')
                close();
        };
        document.addEventListener('mousedown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, close]);
    const renderOverlay = () => {
        if (!open)
            return null;
        const sheet = (_jsxs(_Fragment, { children: [_jsx("div", { className: "hs-dd__backdrop", onClick: close, "aria-hidden": true }), _jsxs("div", { className: "hs-dd__panel", role: "listbox", "aria-labelledby": selectId, children: [_jsx("div", { className: "hs-dd__sheet-handle", "aria-hidden": true }), label || placeholder ? (_jsx("p", { className: "hs-dd__panel-title", children: label || placeholder })) : null, showSearch ? (_jsx("div", { className: "hs-dd__search", children: _jsx("input", { className: "hs-dd__search-input", value: query, onChange: (e) => setQuery(e.target.value), placeholder: searchPlaceholder, "aria-label": searchPlaceholder, autoFocus: true }) })) : null, _jsx("ul", { className: "hs-dd__list", children: filtered.length === 0 ? (_jsx("li", { className: "hs-dd__empty", children: emptyMessage })) : (filtered.map((opt) => {
                                const active = opt.value === value;
                                return (_jsx("li", { children: _jsxs("button", { type: "button", role: "option", "aria-selected": active, disabled: opt.disabled, className: `hs-dd__option${active ? ' is-active' : ''}`, onClick: () => {
                                            if (opt.disabled)
                                                return;
                                            onChange(opt.value);
                                            close();
                                        }, children: [_jsx("span", { children: opt.label }), active ? (_jsx(Icon, { name: "check", size: 18, className: "hs-dd__check" })) : null] }) }, opt.value));
                            })) })] })] }));
        if (isMobileSheet) {
            return createPortal(_jsx("div", { ref: overlayRef, className: "hs-dd__mobile-overlay", children: sheet }), document.body);
        }
        return createPortal(_jsx("div", { ref: overlayRef, className: "hs-dd__desktop-overlay", style: desktopPanelStyle, children: sheet }), document.body);
    };
    const onTriggerKey = (e) => {
        if (disabled)
            return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
        }
    };
    return (_jsx(FieldWrap, { label: label, htmlFor: selectId, className: className, children: _jsxs("div", { ref: rootRef, className: `hs-dd${open ? ' is-open' : ''}${disabled ? ' is-disabled' : ''}`, style: style, children: [_jsxs("button", { type: "button", id: selectId, className: "hs-dd__trigger", disabled: disabled, "aria-haspopup": "listbox", "aria-expanded": open, onClick: () => !disabled && setOpen((v) => !v), onKeyDown: onTriggerKey, children: [_jsx("span", { className: selected ? 'hs-dd__value' : 'hs-dd__value hs-dd__placeholder', children: selected?.label || placeholder }), _jsxs("span", { className: "hs-dd__actions", children: [canClear && value ? (_jsx("span", { className: "hs-dd__clear", role: "button", tabIndex: -1, "aria-label": clearAriaLabel, onClick: (e) => {
                                        e.stopPropagation();
                                        onChange('');
                                        close();
                                    }, children: _jsx(Icon, { name: "close", size: 16 }) })) : null, _jsx(Icon, { name: "expand_more", className: "hs-dd__chevron", size: 20 })] })] }), renderOverlay()] }) }));
}
/** Alias — prefer this name in new code for clarity. */
export const SingleSelect = Select;
