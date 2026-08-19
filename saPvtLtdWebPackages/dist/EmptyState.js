import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from './Icon.js';
import { Button } from './Button.js';
export function EmptyState({ title, message, icon = 'inbox', actionLabel, onAction, className = '', style, testId = 'hs-empty', }) {
    return (_jsxs("div", { className: `hs-empty-state ${className}`.trim(), style: style, "data-testid": testId, children: [_jsx(Icon, { name: icon, size: 48, className: "hs-empty-state__icon" }), _jsx("h3", { className: "hs-empty-state__title", children: title }), message ? _jsx("p", { className: "hs-empty-state__msg", children: message }) : null, actionLabel && onAction ? (_jsx(Button, { variant: "primary", onClick: onAction, children: actionLabel })) : null] }));
}
export function ErrorState({ title = 'Something went wrong', message, retryLabel = 'Try again', onRetry, className = '', style, testId = 'hs-error', }) {
    return (_jsxs("div", { className: `hs-error-state ${className}`.trim(), style: style, "data-testid": testId, role: "alert", children: [_jsx(Icon, { name: "error", size: 48, className: "hs-error-state__icon" }), _jsx("h3", { className: "hs-error-state__title", children: title }), message ? _jsx("p", { className: "hs-error-state__msg", children: message }) : null, onRetry ? (_jsx(Button, { variant: "secondary", onClick: onRetry, children: retryLabel })) : null] }));
}
