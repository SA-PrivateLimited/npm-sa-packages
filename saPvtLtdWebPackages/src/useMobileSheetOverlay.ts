import {useEffect, useState} from 'react';

const MOBILE_SHEET_MQ = '(max-width: 860px)';

/** True when the custom dropdown renders as a full-width mobile bottom sheet. */
export function useMobileSheet(): boolean {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_SHEET_MQ).matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_SHEET_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return mobile;
}

/**
 * iOS-safe scroll lock for overlays (select sheets, modals, drawers).
 * Prevents the page from shifting horizontally when the keyboard opens.
 */
export function useOverlayScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const {style} = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      width: style.width,
    };

    style.overflow = 'hidden';
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.left = '0';
    style.width = '100%';
    document.documentElement.classList.add('hs-overlay-open');

    return () => {
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.left = prev.left;
      style.width = prev.width;
      document.documentElement.classList.remove('hs-overlay-open');
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}
