import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Button({ variant = 'primary', size = 'md', loading = false, block = false, disabled, children, className = '', style, testId = 'hs-button', type = 'button', ...rest }) {
    const classes = [
        'hs-btn',
        `hs-btn--${variant}`,
        `hs-btn--${size}`,
        block ? 'hs-btn--block' : '',
        loading ? 'hs-btn--loading' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("button", { type: type, className: classes, style: style, "data-testid": testId, disabled: disabled || loading, "aria-busy": loading || undefined, ...rest, children: [loading ? _jsx("span", { className: "hs-btn__spinner", "aria-hidden": true }) : null, _jsx("span", { className: "hs-btn__label", children: children })] }));
}
