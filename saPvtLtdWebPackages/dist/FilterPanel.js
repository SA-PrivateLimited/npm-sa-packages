import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Icon } from './Icon.js';
import { Button } from './Button.js';
export function FilterPanel({ title = 'Filters', children, onApply, onReset, applyLabel = 'Apply', resetLabel = 'Reset', defaultOpen = true, collapsible = true, className = '', style, testId = 'hs-filter-panel', }) {
    const [open, setOpen] = useState(defaultOpen);
    return (_jsxs("section", { className: `hs-filter-panel ${open ? 'is-open' : ''} ${className}`.trim(), style: style, "data-testid": testId, children: [_jsxs("div", { className: "hs-filter-panel__header", children: [_jsx("h3", { className: "hs-filter-panel__title", children: title }), collapsible ? (_jsx("button", { type: "button", className: "hs-filter-panel__toggle", "aria-expanded": open, onClick: () => setOpen((v) => !v), children: _jsx(Icon, { name: open ? 'expand_less' : 'expand_more', size: 22 }) })) : null] }), open ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "hs-filter-panel__body", children: children }), onApply || onReset ? (_jsxs("div", { className: "hs-filter-panel__footer", children: [onReset ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: onReset, children: resetLabel })) : null, onApply ? (_jsx(Button, { variant: "primary", size: "sm", onClick: onApply, children: applyLabel })) : null] })) : null] })) : null] }));
}
