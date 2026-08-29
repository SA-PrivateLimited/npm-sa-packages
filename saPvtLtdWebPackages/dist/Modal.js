import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon.js';
import { useOverlayScrollLock } from './useMobileSheetOverlay.js';
export function Modal({ open, onClose, children, closeOnBackdrop = true, closeOnEscape = true, className = '', style, testId = 'hs-modal', }) {
    useEffect(() => {
        if (!open || !closeOnEscape)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, closeOnEscape, onClose]);
    useOverlayScrollLock(open);
    if (!open)
        return null;
    return createPortal(_jsx("div", { className: "hs-modal-backdrop", role: "presentation", "data-testid": testId, onClick: () => {
            if (closeOnBackdrop)
                onClose();
        }, children: _jsx("div", { className: `hs-modal ${className}`.trim(), style: style, role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation(), children: children }) }), document.body);
}
export function Dialog({ open, onClose, title, children, footer, showClose = true, className = '', style, testId = 'hs-dialog', }) {
    return (_jsx(Modal, { open: open, onClose: onClose, className: className, style: style, testId: testId, children: _jsxs("div", { className: "hs-dialog", children: [(title || showClose) && (_jsxs("div", { className: "hs-dialog__header", children: [title ? _jsx("h3", { className: "hs-dialog__title", children: title }) : _jsx("span", {}), showClose ? (_jsx("button", { type: "button", className: "hs-dialog__close", "aria-label": "Close", onClick: onClose, children: _jsx(Icon, { name: "close", size: 22 }) })) : null] })), _jsx("div", { className: "hs-dialog__body", children: children }), footer ? _jsx("div", { className: "hs-dialog__footer", children: footer }) : null] }) }));
}
