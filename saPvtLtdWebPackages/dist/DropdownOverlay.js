import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { OverlayPortal } from './OverlayPortal.js';
import { lockBodyScroll, useNarrowOverlay, useVisualViewportBox, viewportBoxStyle, } from './overlay.js';
export function useDropdownOverlay(open) {
    const mobile = useNarrowOverlay();
    const box = useVisualViewportBox(open && mobile);
    useEffect(() => {
        if (!open || !mobile)
            return;
        return lockBodyScroll();
    }, [open, mobile]);
    return { mobile, box };
}
export function DropdownOverlay({ open, mobile, box, onClose, children, }) {
    if (!open)
        return null;
    const panel = (_jsxs(_Fragment, { children: [_jsx("div", { className: "hs-dd__backdrop", onClick: onClose, "aria-hidden": true }), children] }));
    if (!mobile)
        return panel;
    return (_jsx(OverlayPortal, { children: _jsx("div", { className: "hs-dd-overlay", role: "presentation", style: viewportBoxStyle(box), children: panel }) }));
}
