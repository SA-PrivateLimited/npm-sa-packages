import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from './Icon.js';
export function Banner({ title, detail, meta, variant = 'success', onDismiss, className = '', testId = 'hs-banner', }) {
    return (_jsxs("div", { className: `hs-banner hs-banner--${variant} ${className}`.trim(), role: "status", "data-testid": testId, children: [_jsxs("div", { className: "hs-banner__body", children: [_jsx("strong", { className: "hs-banner__title", children: title }), detail ? _jsx("p", { className: "hs-banner__detail", children: detail }) : null, meta ? _jsx("div", { className: "hs-banner__meta", children: meta }) : null] }), onDismiss ? (_jsx("button", { type: "button", className: "hs-banner__dismiss", "aria-label": "Dismiss", onClick: onDismiss, children: _jsx(Icon, { name: "close", size: 18 }) })) : null] }));
}
