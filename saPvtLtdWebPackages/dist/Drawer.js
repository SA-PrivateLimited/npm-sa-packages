import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Icon } from './Icon.js';
import { OverlayPortal } from './OverlayPortal.js';
import { lockBodyScroll, useVisualViewportBox, viewportBoxStyle, } from './overlay.js';
export function Drawer({ open, onClose, side = 'right', title, children, footer, showClose = true, className = '', style, testId = 'hs-drawer', }) {
    const bodyRef = useRef(null);
    const box = useVisualViewportBox(open);
    useEffect(() => {
        if (!open)
            return;
        return lockBodyScroll();
    }, [open]);
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    useEffect(() => {
        if (!open)
            return;
        const root = bodyRef.current;
        if (!root)
            return;
        const onFocus = (e) => {
            const target = e.target;
            if (!(target instanceof HTMLElement))
                return;
            if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA')
                return;
            requestAnimationFrame(() => {
                target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            });
        };
        root.addEventListener('focusin', onFocus);
        return () => root.removeEventListener('focusin', onFocus);
    }, [open]);
    if (!open)
        return null;
    return (_jsx(OverlayPortal, { children: _jsx("div", { className: "hs-drawer-backdrop", role: "presentation", "data-testid": testId, style: viewportBoxStyle(box), onClick: onClose, children: _jsxs("aside", { className: `hs-drawer hs-drawer--${side} ${className}`.trim(), style: style, role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation(), children: [(title || showClose) && (_jsxs("div", { className: "hs-drawer__header", children: [title ? _jsx("h3", { className: "hs-drawer__title", children: title }) : _jsx("span", {}), showClose ? (_jsx("button", { type: "button", className: "hs-drawer__close", "aria-label": "Close", onClick: onClose, children: _jsx(Icon, { name: "close", size: 22 }) })) : null] })), _jsx("div", { ref: bodyRef, className: "hs-drawer__body", children: children }), footer ? _jsx("div", { className: "hs-drawer__footer", children: footer }) : null] }) }) }));
}
