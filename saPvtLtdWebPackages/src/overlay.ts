import {useEffect, useState, type CSSProperties} from 'react';

const OVERLAY_MQ = '(max-width: 860px)';

let scrollLockCount = 0;
let previousBodyOverflow = '';
let previousHtmlOverflow = '';

/** Nested-safe body scroll lock for viewport overlays. */
export function lockBodyScroll(): () => void {
  if (typeof document === 'undefined') return () => undefined;
  if (scrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
  return () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    }
  };
}

export type VisualViewportBox = {
  top: number;
  left: number;
  width: string;
  height: string;
};

const FULL_VIEWPORT: VisualViewportBox = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100dvh',
};

/**
 * Live visual-viewport box so overlays sit above the keyboard
 * and restore when it closes. Does not cache window.innerHeight.
 */
export function useVisualViewportBox(active: boolean): VisualViewportBox {
  const [box, setBox] = useState<VisualViewportBox>(FULL_VIEWPORT);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

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

export function useNarrowOverlay(query = OVERLAY_MQ): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
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

export function viewportBoxStyle(
  box: VisualViewportBox,
): Pick<
  CSSProperties,
  'position' | 'top' | 'left' | 'width' | 'height' | 'right' | 'bottom' | 'inset'
> {
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
