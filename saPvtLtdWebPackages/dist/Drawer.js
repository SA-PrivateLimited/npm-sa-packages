import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from './Icon.js';
import { useOverlayScrollLock } from './useMobileSheetOverlay.js';
export function Drawer({ open, onClose, side = 'right', title, children, footer, showClose = true, className = '', style, testId = 'hs-drawer', }) {
    useOverlayScrollLock(open);
    if (!open)
        return null;
    return (_jsx("div", { className: "hs-drawer-backdrop", role: "presentation", "data-testid": testId, onClick: onClose, children: _jsxs("aside", { className: `hs-drawer hs-drawer--${side} ${className}`.trim(), style: style, role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation(), children: [(title || showClose) && (_jsxs("div", { className: "hs-drawer__header", children: [title ? _jsx("h3", { className: "hs-drawer__title", children: title }) : _jsx("span", {}), showClose ? (_jsx("button", { type: "button", className: "hs-drawer__close", "aria-label": "Close", onClick: onClose, children: _jsx(Icon, { name: "close", size: 22 }) })) : null] })), _jsx("div", { className: "hs-drawer__body", children: children }), footer ? _jsx("div", { className: "hs-drawer__footer", children: footer }) : null] }) }));
}
