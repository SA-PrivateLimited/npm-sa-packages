import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Badge({ children, count, max = 99, variant = 'primary', dot = false, className = '', style, testId = 'hs-badge', }) {
    const showCount = typeof count === 'number' && count > 0;
    const label = showCount ? (count > max ? `${max}+` : String(count)) : null;
    if (children != null) {
        return (_jsxs("span", { className: `hs-badge-wrap ${className}`.trim(), style: style, "data-testid": testId, children: [children, dot || showCount ? (_jsx("span", { className: `hs-badge hs-badge--${variant}${dot ? ' hs-badge--dot' : ''}`, children: dot ? null : label })) : null] }));
    }
    return (_jsx("span", { className: `hs-badge hs-badge--${variant}${dot ? ' hs-badge--dot' : ''} ${className}`.trim(), style: style, "data-testid": testId, children: dot ? null : label ?? children }));
}
