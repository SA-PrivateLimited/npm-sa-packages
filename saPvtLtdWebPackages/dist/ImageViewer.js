import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon.js';
import { useOverlayScrollLock } from './useMobileSheetOverlay.js';
/** Inline so the watermark never depends on /logo.png loading. */
function AkansoMarkSvg({ title }) {
    const uid = useId().replace(/:/g, '');
    const bg = `${uid}-bg`;
    const glow = `${uid}-glow`;
    return (_jsxs("svg", { className: "hs-image-viewer__mark-svg", viewBox: "0 0 512 512", role: "img", "aria-label": title, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: bg, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#1A8FA8" }), _jsx("stop", { offset: "55%", stopColor: "#0F766E" }), _jsx("stop", { offset: "100%", stopColor: "#0B5E58" })] }), _jsxs("radialGradient", { id: glow, cx: "50%", cy: "42%", r: "58%", children: [_jsx("stop", { offset: "0%", stopColor: "#FFFFFF", stopOpacity: "0.22" }), _jsx("stop", { offset: "100%", stopColor: "#FFFFFF", stopOpacity: "0" })] })] }), _jsx("rect", { width: "512", height: "512", rx: "112", fill: `url(#${bg})` }), _jsx("rect", { width: "512", height: "512", rx: "112", fill: `url(#${glow})` }), _jsxs("g", { transform: "translate(56 78) scale(0.4)", children: [_jsx("path", { fill: "#06254A", d: "M500 55 L760 655 L665 625 L610 505 L500 270 L390 505 L335 625 L240 655 Z" }), _jsx("path", { fill: "#FFFFFF", d: "M500 155 L405 470 L595 470 Z" }), _jsx("path", { fill: "#18A82A", d: "M275 585 L500 390 L725 585 L675 575 L500 445 L325 575 Z" }), _jsx("path", { fill: "#FFFFFF", d: "M350 560 L500 450 L650 560 L650 650 L350 650 Z" }), _jsxs("g", { fill: "#18A82A", children: [_jsx("rect", { x: "465", y: "535", width: "32", height: "32", rx: "1" }), _jsx("rect", { x: "505", y: "535", width: "32", height: "32", rx: "1" }), _jsx("rect", { x: "465", y: "575", width: "32", height: "32", rx: "1" }), _jsx("rect", { x: "505", y: "575", width: "32", height: "32", rx: "1" })] }), _jsx("path", { fill: "#18A82A", d: "M145 680 C275 735 385 710 500 675 C635 635 765 640 870 705 C745 675 650 690 535 730 C385 782 250 775 145 680 Z" })] })] }));
}
/**
 * Centered image modal card — presentation only.
 * Pass image URLs via props; no S3/upload/API logic.
 */
export function ImageViewer({ images, initialIndex = 0, open, onClose, label = 'Image viewer', closeLabel = 'Close', prevLabel = 'Previous image', nextLabel = 'Next image', className = '', style, testId = 'hs-image-viewer', brandMarkSrc = '/logo.png', brandMarkLabel = 'Akansho', }) {
    const titleId = useId();
    const closeRef = useRef(null);
    const touchStartX = useRef(null);
    const urls = images.filter((u) => typeof u === 'string' && u.trim());
    const [index, setIndex] = useState(0);
    const [status, setStatus] = useState('loading');
    const [brandImgFailed, setBrandImgFailed] = useState(false);
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
        setBrandImgFailed(false);
    }, [brandMarkSrc, open]);
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
    return createPortal(_jsx("div", { className: `hs-image-viewer ${className}`.trim(), style: style, "data-testid": testId, role: "presentation", onClick: onClose, children: _jsxs("div", { className: "hs-image-viewer__dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, onClick: (e) => e.stopPropagation(), onKeyDown: onDialogKeyDown, onTouchStart: onTouchStart, onTouchEnd: onTouchEnd, children: [_jsx("span", { id: titleId, className: "hs-image-viewer__sr-only", children: label }), _jsx("button", { ref: closeRef, type: "button", className: "hs-image-viewer__close", "aria-label": closeLabel, onClick: onClose, children: _jsx(Icon, { name: "close", size: 22 }) }), multi ? (_jsx("button", { type: "button", className: "hs-image-viewer__nav hs-image-viewer__nav--prev", "aria-label": prevLabel, disabled: !canPrev, onClick: () => go(-1), children: _jsx(Icon, { name: "chevron_left", size: 28 }) })) : null, multi ? (_jsx("button", { type: "button", className: "hs-image-viewer__nav hs-image-viewer__nav--next", "aria-label": nextLabel, disabled: !canNext, onClick: () => go(1), children: _jsx(Icon, { name: "chevron_right", size: 28 }) })) : null, _jsxs("div", { className: "hs-image-viewer__stage", children: [status === 'loading' ? (_jsx("span", { className: "hs-image-viewer__status", "aria-live": "polite", children: "\u2026" })) : null, status === 'error' ? (_jsx("span", { className: "hs-image-viewer__status", role: "alert", children: "Image unavailable" })) : null, _jsx("div", { className: "hs-image-viewer__frame", children: _jsx("img", { className: `hs-image-viewer__img${status === 'ready' ? ' is-ready' : ''}`, src: current, alt: "", draggable: false, onLoad: () => setStatus('ready'), onError: () => setStatus('error') }, current) }), _jsx("div", { className: "hs-image-viewer__mark", title: brandMarkLabel, children: brandMarkSrc && !brandImgFailed ? (_jsx("img", { className: "hs-image-viewer__mark-img", src: brandMarkSrc, alt: "", draggable: false, "aria-hidden": true, onError: () => setBrandImgFailed(true) })) : (_jsx(AkansoMarkSvg, { title: brandMarkLabel })) })] }), multi ? (_jsxs("div", { className: "hs-image-viewer__footer", children: [_jsxs("span", { className: "hs-image-viewer__count", "aria-live": "polite", children: [index + 1, " / ", urls.length] }), _jsx("div", { className: "hs-image-viewer__dots", "aria-hidden": true, children: urls.map((url, i) => (_jsx("button", { type: "button", className: `hs-image-viewer__dot${i === index ? ' is-active' : ''}`, tabIndex: -1, onClick: () => setIndex(i) }, url))) })] })) : null] }) }), document.body);
}
