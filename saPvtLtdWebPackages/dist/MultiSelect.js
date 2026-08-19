import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useMemo, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { FieldWrap } from './FieldWrap.js';
import { Icon } from './Icon.js';
import { useMobileSheet, useOverlayScrollLock } from './useMobileSheetOverlay.js';
/**
 * Custom multi-select dropdown (no Ant Design).
 * Checklist in panel; selected values as chips on the trigger.
 */
export function MultiSelect({ label, options, value, onChange, placeholder = 'Select…', disabled = false, className = '', id, allowClear = true, showSearch = true, maxTagCount = 'responsive', style, }) {
    const autoId = useId();
    const selectId = id || autoId;
    const rootRef = useRef(null);
    const overlayRef = useRef(null);
    const isMobileSheet = useMobileSheet();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    useOverlayScrollLock(open && isMobileSheet);
    const labelByValue = useMemo(() => {
        const map = new Map(options.map((o) => [o.value, o.label]));
        return map;
    }, [options]);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return options;
        return options.filter((o) => o.label.toLowerCase().includes(q));
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
        const sheet = (_jsxs(_Fragment, { children: [_jsx("div", { className: "hs-dd__backdrop", onClick: close, "aria-hidden": true }), _jsxs("div", { className: "hs-dd__panel", role: "listbox", "aria-multiselectable": true, "aria-labelledby": selectId, children: [_jsx("div", { className: "hs-dd__sheet-handle", "aria-hidden": true }), label || placeholder ? (_jsx("p", { className: "hs-dd__panel-title", children: label || placeholder })) : null, showSearch ? (_jsx("div", { className: "hs-dd__search", children: _jsx("input", { className: "hs-dd__search-input", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search\u2026", autoFocus: true }) })) : null, _jsx("ul", { className: "hs-dd__list", children: filtered.length === 0 ? (_jsx("li", { className: "hs-dd__empty", children: "No options" })) : (filtered.map((opt) => {
                                const checked = value.includes(opt.value);
                                return (_jsx("li", { children: _jsxs("button", { type: "button", role: "option", "aria-selected": checked, disabled: opt.disabled, className: `hs-dd__option hs-dd__option--check${checked ? ' is-active' : ''}`, onClick: () => {
                                            if (opt.disabled)
                                                return;
                                            toggle(opt.value);
                                        }, children: [_jsx("span", { className: `hs-dd__checkbox${checked ? ' is-checked' : ''}`, "aria-hidden": true, children: checked ? _jsx(Icon, { name: "check", size: 14 }) : null }), _jsx("span", { children: opt.label })] }) }, opt.value));
                            })) }), _jsx("div", { className: "hs-dd__footer", children: _jsx("button", { type: "button", className: "hs-dd__done", onClick: close, children: "Done" }) })] })] }));
        if (isMobileSheet) {
            return createPortal(_jsx("div", { ref: overlayRef, className: "hs-dd__mobile-overlay", children: sheet }), document.body);
        }
        return _jsx("div", { ref: overlayRef, children: sheet });
    };
    const toggle = (optValue) => {
        if (value.includes(optValue)) {
            onChange(value.filter((v) => v !== optValue));
        }
        else {
            onChange([...value, optValue]);
        }
    };
    const visibleTags = useMemo(() => {
        if (maxTagCount === 'responsive')
            return value.slice(0, 2);
        if (typeof maxTagCount === 'number')
            return value.slice(0, maxTagCount);
        return value;
    }, [value, maxTagCount]);
    const hiddenCount = Math.max(0, value.length - visibleTags.length);
    const onTriggerKey = (e) => {
        if (disabled)
            return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
        }
    };
    return (_jsx(FieldWrap, { label: label, htmlFor: selectId, className: className, children: _jsxs("div", { ref: rootRef, className: `hs-dd hs-dd--multi${open ? ' is-open' : ''}${disabled ? ' is-disabled' : ''}`, style: style, children: [_jsxs("button", { type: "button", id: selectId, className: "hs-dd__trigger hs-dd__trigger--multi", disabled: disabled, "aria-haspopup": "listbox", "aria-expanded": open, onClick: () => !disabled && setOpen((v) => !v), onKeyDown: onTriggerKey, children: [_jsx("span", { className: "hs-dd__chips", children: value.length === 0 ? (_jsx("span", { className: "hs-dd__placeholder", children: placeholder })) : (_jsxs(_Fragment, { children: [visibleTags.map((v) => (_jsxs("span", { className: "hs-dd__chip", children: [labelByValue.get(v) || v, _jsx("span", { className: "hs-dd__chip-x", role: "button", tabIndex: -1, "aria-label": `Remove ${labelByValue.get(v) || v}`, onClick: (e) => {
                                                    e.stopPropagation();
                                                    onChange(value.filter((x) => x !== v));
                                                }, children: "\u00D7" })] }, v))), hiddenCount > 0 ? (_jsxs("span", { className: "hs-dd__chip hs-dd__chip--more", children: ["+", hiddenCount] })) : null] })) }), _jsxs("span", { className: "hs-dd__actions", children: [allowClear && value.length > 0 ? (_jsx("span", { className: "hs-dd__clear", role: "button", tabIndex: -1, "aria-label": "Clear", onClick: (e) => {
                                        e.stopPropagation();
                                        onChange([]);
                                    }, children: _jsx(Icon, { name: "close", size: 16 }) })) : null, _jsx(Icon, { name: "expand_more", className: "hs-dd__chevron", size: 20 })] })] }), renderOverlay()] }) }));
}
/** MultiSelect with checklist options; selected values show as chips inside. */
export function MultiSelectCheckbox(props) {
    return _jsx(MultiSelect, { ...props, variant: "checkbox" });
}
