import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from './Icon.js';
export function Button({ variant = 'primary', size = 'md', loading = false, block = false, arrow = false, disabled, children, className = '', style, testId = 'hs-button', type = 'button', ...rest }) {
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
    const arrowName = arrow === true ? 'arrow_forward' : arrow || null;
    const arrowSize = size === 'sm' ? 16 : 18;
    return (_jsxs("button", { type: type, className: classes, style: style, "data-testid": testId, disabled: disabled || loading, "aria-busy": loading || undefined, ...rest, children: [loading ? _jsx("span", { className: "hs-btn__spinner", "aria-hidden": true }) : null, _jsxs("span", { className: "hs-btn__label", children: [children, arrowName ? _jsx(Icon, { name: arrowName, size: arrowSize }) : null] })] }));
}
