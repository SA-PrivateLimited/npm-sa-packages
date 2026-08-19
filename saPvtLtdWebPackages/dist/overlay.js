import { useEffect, useState } from 'react';
const OVERLAY_MQ = '(max-width: 860px)';
// Store lock count on window so HMR module re-execution doesn't reset it
function getLockCount() {
    return window['__hsScrollLockCount'] ?? 0;
}
function setLockCount(n) {
    window['__hsScrollLockCount'] = n;
}
/** Nested-safe body scroll lock for viewport overlays. */
export function lockBodyScroll() {
    if (typeof document === 'undefined')
        return () => undefined;
    const count = getLockCount();
    if (count === 0) {
        document.body.dataset['hsScrollLock'] = '';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
    setLockCount(count + 1);
    return () => {
        const next = Math.max(0, getLockCount() - 1);
        setLockCount(next);
        if (next === 0) {
            delete document.body.dataset['hsScrollLock'];
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    };
}
const FULL_VIEWPORT = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100dvh',
};
/**
 * Live visual-viewport box so overlays sit above the keyboard
 * and restore when it closes. Does not cache window.innerHeight.
 */
export function useVisualViewportBox(active) {
    const [box, setBox] = useState(FULL_VIEWPORT);
    useEffect(() => {
        if (!active || typeof window === 'undefined')
            return;
        const sync = () => {
            const vv = window.visualViewport;
            if (!vv) {
                setBox(FULL_VIEWPORT);
                return;
            }
            setBox({
                top: vv.offsetTop,
                left: vv.offsetLeft,
                width: `${vv.width}px`,
                height: `${vv.height}px`,
            });
        };
        sync();
        const vv = window.visualViewport;
        vv?.addEventListener('resize', sync);
        vv?.addEventListener('scroll', sync);
        window.addEventListener('resize', sync);
        return () => {
            vv?.removeEventListener('resize', sync);
            vv?.removeEventListener('scroll', sync);
            window.removeEventListener('resize', sync);
        };
    }, [active]);
    return active ? box : FULL_VIEWPORT;
}
export function useNarrowOverlay(query = OVERLAY_MQ) {
    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined')
            return false;
        return window.matchMedia(query).matches;
    });
    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setMatches(media.matches);
        onChange();
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [query]);
    return matches;
}
export function viewportBoxStyle(box) {
    return {
        position: 'fixed',
        top: box.top,
        left: box.left,
        width: box.width,
        height: box.height,
        right: 'auto',
        bottom: 'auto',
        inset: 'auto',
    };
}
