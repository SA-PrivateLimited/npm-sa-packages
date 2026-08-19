import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Loader({ size = 'md', label, fullscreen = false, className = '', style, testId = 'hs-loader', }) {
    const body = (_jsxs("div", { className: `hs-loader hs-loader--${size} ${className}`.trim(), style: style, "data-testid": testId, role: "status", "aria-label": label || 'Loading', children: [_jsx("span", { className: "hs-loader__spinner", "aria-hidden": true }), label ? _jsx("span", { className: "hs-loader__label", children: label }) : null] }));
    if (fullscreen) {
        return _jsx("div", { className: "hs-loader-fullscreen", children: body });
    }
    return body;
}
