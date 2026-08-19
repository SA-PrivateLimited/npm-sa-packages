import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useMemo, useRef, useState, } from 'react';
import { DropdownOverlay, useDropdownOverlay } from './DropdownOverlay.js';
import { FieldWrap } from './FieldWrap.js';
import { Icon } from './Icon.js';
/**
 * Custom single-select dropdown (no Ant Design).
 * Mobile: full-width bottom sheet. Desktop: anchored list.
 */
export function Select({ label, options, value, onChange, placeholder = 'Select…', disabled = false, className = '', id, allowClear, showSearch = false, searchPlaceholder = 'Search…', emptyMessage = 'No options', clearAriaLabel = 'Clear', style, }) {
    const autoId = useId();
    const selectId = id || autoId;
    const rootRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const canClear = allowClear ?? Boolean(placeholder);
    const { mobile, box } = useDropdownOverlay(open);
    const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return options;
        return options.filter((o) => {
            const hay = `${o.label} ${o.searchText || ''}`.toLowerCase();
            return hay.includes(q);
        });
    }, [options, query]);
    const close = useCallback(() => {
        setOpen(false);
        setQuery('');
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                close();
        };
        document.addEventListener('keydown', onKey);
        if (mobile) {
            return () => document.removeEventListener('keydown', onKey);
        }
        const onDoc = (e) => {
            if (!rootRef.current?.contains(e.target))
                close();
        };
        document.addEventListener('mousedown', onDoc);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, close, mobile]);
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
                                    }, children: _jsx(Icon, { name: "close", size: 16 }) })) : null, _jsx(Icon, { name: "expand_more", className: "hs-dd__chevron", size: 20 })] })] }), _jsx(DropdownOverlay, { open: open, mobile: mobile, box: box, onClose: close, children: _jsxs("div", { className: "hs-dd__panel", role: "listbox", "aria-labelledby": selectId, children: [_jsx("div", { className: "hs-dd__sheet-handle", "aria-hidden": true }), label || placeholder ? (_jsx("p", { className: "hs-dd__panel-title", children: label || placeholder })) : null, showSearch ? (_jsx("div", { className: "hs-dd__search", children: _jsx("input", { className: "hs-dd__search-input", value: query, onChange: (e) => setQuery(e.target.value), placeholder: searchPlaceholder, "aria-label": searchPlaceholder, autoFocus: true }) })) : null, _jsx("ul", { className: "hs-dd__list", children: filtered.length === 0 ? (_jsx("li", { className: "hs-dd__empty", children: emptyMessage })) : (filtered.map((opt) => {
                                    const active = opt.value === value;
                                    return (_jsx("li", { children: _jsxs("button", { type: "button", role: "option", "aria-selected": active, disabled: opt.disabled, className: `hs-dd__option${active ? ' is-active' : ''}`, onClick: () => {
                                                if (opt.disabled)
                                                    return;
                                                onChange(opt.value);
                                                close();
                                            }, children: [_jsx("span", { children: opt.label }), active ? (_jsx(Icon, { name: "check", size: 18, className: "hs-dd__check" })) : null] }) }, opt.value));
                                })) })] }) })] }) }));
}
/** Alias — prefer this name in new code for clarity. */
export const SingleSelect = Select;
