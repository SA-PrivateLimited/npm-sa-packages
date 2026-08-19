import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from './Icon.js';
/** Compact label / filter / tag chip. */
export function Chip({ label, variant = 'default', selected = false, disabled = false, onClick, onClose, className = '', style, testId = 'hs-chip', }) {
    const classes = `hs-chip hs-chip--${variant}${selected ? ' hs-chip--selected' : ''}${disabled ? ' hs-chip--disabled' : ''} ${className}`.trim();
    const closeBtn = onClose && !disabled ? (_jsx("button", { type: "button", className: "hs-chip__close", "aria-label": "Remove", onClick: (e) => {
            e.stopPropagation();
            onClose();
        }, children: _jsx(Icon, { name: "close", size: 14 }) })) : null;
    if (onClick) {
        return (_jsxs("button", { type: "button", className: classes, style: style, "data-testid": testId, disabled: disabled, onClick: onClick, children: [_jsx("span", { className: "hs-chip__label", children: label }), closeBtn] }));
    }
    return (_jsxs("span", { className: classes, style: style, "data-testid": testId, role: "listitem", children: [_jsx("span", { className: "hs-chip__label", children: label }), closeBtn] }));
}
/** Horizontal chip group / filter row. */
export function Chips({ children, className = '', wrap = true }) {
    return (_jsx("div", { className: `hs-chips${wrap ? ' hs-chips--wrap' : ''} ${className}`.trim(), role: "list", children: children }));
}
