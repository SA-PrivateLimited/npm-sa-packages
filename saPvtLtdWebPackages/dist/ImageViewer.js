import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon.js';
import { useOverlayScrollLock } from './useMobileSheetOverlay.js';
/**
 * Centered image modal card — presentation only.
 * Pass image URLs via props; no S3/upload/API logic.
 */
export function ImageViewer({ images, initialIndex = 0, open, onClose, label = 'Image viewer', closeLabel = 'Close', prevLabel = 'Previous image', nextLabel = 'Next image', className = '', style, testId = 'hs-image-viewer', brandMarkSrc = '/logo.svg', brandMarkLabel = 'Akanso', }) {
    const titleId = useId();
    const closeRef = useRef(null);
    const touchStartX = useRef(null);
    const urls = images.filter((u) => typeof u === 'string' && u.trim());
    const [index, setIndex] = useState(0);
    const [status, setStatus] = useState('loading');
    const [markFailed, setMarkFailed] = useState(false);
    useOverlayScrollLock(open && urls.length > 0);
    useEffect(() => {
        if (!open)
            return;
        const next = Math.min(Math.max(0, initialIndex), Math.max(0, urls.length - 1));
        setIndex(next);
        setStatus('loading');
    }, [open, initialIndex, urls.length]);
    useEffect(() => {
        if (!open)
            return;
        setStatus('loading');
    }, [index, open]);
    useEffect(() => {
        if (!open)
            return;
        const t = window.setTimeout(() => closeRef.current?.focus(), 0);
        return () => window.clearTimeout(t);
    }, [open]);
    const go = useCallback((delta) => {
        setIndex((i) => {
            const next = i + delta;
            if (next < 0 || next >= urls.length)
                return i;
            return next;
        });
    }, [urls.length]);
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
                return;
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                go(-1);
            }
            else if (e.key === 'ArrowRight') {
                e.preventDefault();
                go(1);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose, go]);
    const onTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
    };
    const onTouchEnd = (e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start == null)
            return;
        const end = e.changedTouches[0]?.clientX ?? start;
        const delta = end - start;
        if (Math.abs(delta) < 48)
            return;
        go(delta < 0 ? 1 : -1);
    };
    const onDialogKeyDown = (e) => {
        if (e.key !== 'Tab')
            return;
        const root = e.currentTarget;
        const focusable = root.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };
    if (!open || !urls.length)
        return null;
    const current = urls[index];
    const multi = urls.length > 1;
    const canPrev = index > 0;
    const canNext = index < urls.length - 1;
    return createPortal(_jsx("div", { className: `hs-image-viewer ${className}`.trim(), style: style, "data-testid": testId, role: "presentation", onClick: onClose, children: _jsxs("div", { className: "hs-image-viewer__dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, onClick: (e) => e.stopPropagation(), onKeyDown: onDialogKeyDown, onTouchStart: onTouchStart, onTouchEnd: onTouchEnd, children: [_jsx("span", { id: titleId, className: "hs-image-viewer__sr-only", children: label }), _jsx("button", { ref: closeRef, type: "button", className: "hs-image-viewer__close", "aria-label": closeLabel, onClick: onClose, children: _jsx(Icon, { name: "close", size: 22 }) }), multi ? (_jsx("button", { type: "button", className: "hs-image-viewer__nav hs-image-viewer__nav--prev", "aria-label": prevLabel, disabled: !canPrev, onClick: () => go(-1), children: _jsx(Icon, { name: "chevron_left", size: 28 }) })) : null, multi ? (_jsx("button", { type: "button", className: "hs-image-viewer__nav hs-image-viewer__nav--next", "aria-label": nextLabel, disabled: !canNext, onClick: () => go(1), children: _jsx(Icon, { name: "chevron_right", size: 28 }) })) : null, _jsxs("div", { className: "hs-image-viewer__stage", children: [status === 'loading' ? (_jsx("span", { className: "hs-image-viewer__status", "aria-live": "polite", children: "\u2026" })) : null, status === 'error' ? (_jsx("span", { className: "hs-image-viewer__status", role: "alert", children: "Image unavailable" })) : null, _jsxs("div", { className: "hs-image-viewer__frame", children: [_jsx("img", { className: `hs-image-viewer__img${status === 'ready' ? ' is-ready' : ''}`, src: current, alt: "", draggable: false, onLoad: () => setStatus('ready'), onError: () => setStatus('error') }, current), status === 'ready' && brandMarkSrc && !markFailed ? (_jsx("img", { className: "hs-image-viewer__mark", src: brandMarkSrc, alt: "", title: brandMarkLabel, draggable: false, "aria-hidden": true, onError: () => setMarkFailed(true) })) : null] })] }), multi ? (_jsxs("div", { className: "hs-image-viewer__footer", children: [_jsxs("span", { className: "hs-image-viewer__count", "aria-live": "polite", children: [index + 1, " / ", urls.length] }), _jsx("div", { className: "hs-image-viewer__dots", "aria-hidden": true, children: urls.map((url, i) => (_jsx("button", { type: "button", className: `hs-image-viewer__dot${i === index ? ' is-active' : ''}`, tabIndex: -1, onClick: () => setIndex(i) }, url))) })] })) : null] }) }), document.body);
}
