import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import {createPortal} from 'react-dom';
import {Icon} from './Icon.js';
import {useOverlayScrollLock} from './useMobileSheetOverlay.js';

/** Inline so the watermark never depends on /logo.png loading. */
function AkansoMarkSvg({title}: {title: string}) {
  const uid = useId().replace(/:/g, '');
  const bg = `${uid}-bg`;
  const glow = `${uid}-glow`;
  return (
    <svg
      className="hs-image-viewer__mark-svg"
      viewBox="0 0 512 512"
      role="img"
      aria-label={title}>
      <defs>
        <linearGradient id={bg} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A8FA8" />
          <stop offset="55%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#0B5E58" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#${bg})`} />
      <rect width="512" height="512" rx="112" fill={`url(#${glow})`} />
      <g transform="translate(56 78) scale(0.4)">
        <path
          fill="#06254A"
          d="M500 55 L760 655 L665 625 L610 505 L500 270 L390 505 L335 625 L240 655 Z"
        />
        <path fill="#FFFFFF" d="M500 155 L405 470 L595 470 Z" />
        <path
          fill="#18A82A"
          d="M275 585 L500 390 L725 585 L675 575 L500 445 L325 575 Z"
        />
        <path fill="#FFFFFF" d="M350 560 L500 450 L650 560 L650 650 L350 650 Z" />
        <g fill="#18A82A">
          <rect x="465" y="535" width="32" height="32" rx="1" />
          <rect x="505" y="535" width="32" height="32" rx="1" />
          <rect x="465" y="575" width="32" height="32" rx="1" />
          <rect x="505" y="575" width="32" height="32" rx="1" />
        </g>
        <path
          fill="#18A82A"
          d="M145 680 C275 735 385 710 500 675 C635 635 765 640 870 705 C745 675 650 690 535 730 C385 782 250 775 145 680 Z"
        />
      </g>
    </svg>
  );
}

export interface ImageViewerProps {
  /** Image URLs to show (caller supplies; typically max 3 for showcase). */
  images: string[];
  /** Index to show when opening. */
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  /** Accessible dialog name. */
  label?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
  style?: CSSProperties;
  testId?: string;
  /** Small corner mark on the photo (defaults to each app's `/logo.svg`). */
  brandMarkSrc?: string;
  brandMarkLabel?: string;
}

/**
 * Centered image modal card — presentation only.
 * Pass image URLs via props; no S3/upload/API logic.
 */
export function ImageViewer({
  images,
  initialIndex = 0,
  open,
  onClose,
  label = 'Image viewer',
  closeLabel = 'Close',
  prevLabel = 'Previous image',
  nextLabel = 'Next image',
  className = '',
  style,
  testId = 'hs-image-viewer',
  brandMarkSrc = '/logo.png',
  brandMarkLabel = 'Akanso',
}: ImageViewerProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const urls = images.filter((u) => typeof u === 'string' && u.trim());
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [brandImgFailed, setBrandImgFailed] = useState(false);

  useOverlayScrollLock(open && urls.length > 0);

  useEffect(() => {
    if (!open) return;
    const next = Math.min(Math.max(0, initialIndex), Math.max(0, urls.length - 1));
    setIndex(next);
    setStatus('loading');
  }, [open, initialIndex, urls.length]);

  useEffect(() => {
    if (!open) return;
    setStatus('loading');
  }, [index, open]);

  useEffect(() => {
    setBrandImgFailed(false);
  }, [brandMarkSrc, open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = i + delta;
        if (next < 0 || next >= urls.length) return i;
        return next;
      });
    },
    [urls.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, go]);

  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const delta = end - start;
    if (Math.abs(delta) < 48) return;
    go(delta < 0 ? 1 : -1);
  };

  const onDialogKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const root = e.currentTarget;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open || !urls.length) return null;

  const current = urls[index];
  const multi = urls.length > 1;
  const canPrev = index > 0;
  const canNext = index < urls.length - 1;

  return createPortal(
    <div
      className={`hs-image-viewer ${className}`.trim()}
      style={style}
      data-testid={testId}
      role="presentation"
      onClick={onClose}>
      <div
        className="hs-image-viewer__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onDialogKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}>
        <span id={titleId} className="hs-image-viewer__sr-only">
          {label}
        </span>

        <button
          ref={closeRef}
          type="button"
          className="hs-image-viewer__close"
          aria-label={closeLabel}
          onClick={onClose}>
          <Icon name="close" size={22} />
        </button>

        {multi ? (
          <button
            type="button"
            className="hs-image-viewer__nav hs-image-viewer__nav--prev"
            aria-label={prevLabel}
            disabled={!canPrev}
            onClick={() => go(-1)}>
            <Icon name="chevron_left" size={28} />
          </button>
        ) : null}

        {multi ? (
          <button
            type="button"
            className="hs-image-viewer__nav hs-image-viewer__nav--next"
            aria-label={nextLabel}
            disabled={!canNext}
            onClick={() => go(1)}>
            <Icon name="chevron_right" size={28} />
          </button>
        ) : null}

        <div className="hs-image-viewer__stage">
          {status === 'loading' ? (
            <span className="hs-image-viewer__status" aria-live="polite">
              …
            </span>
          ) : null}
          {status === 'error' ? (
            <span className="hs-image-viewer__status" role="alert">
              Image unavailable
            </span>
          ) : null}
          <div className="hs-image-viewer__frame">
            <img
              key={current}
              className={`hs-image-viewer__img${
                status === 'ready' ? ' is-ready' : ''
              }`}
              src={current}
              alt=""
              draggable={false}
              onLoad={() => setStatus('ready')}
              onError={() => setStatus('error')}
            />
          </div>
          <div className="hs-image-viewer__mark" title={brandMarkLabel}>
            {brandMarkSrc && !brandImgFailed ? (
              <img
                className="hs-image-viewer__mark-img"
                src={brandMarkSrc}
                alt=""
                draggable={false}
                aria-hidden
                onError={() => setBrandImgFailed(true)}
              />
            ) : (
              <AkansoMarkSvg title={brandMarkLabel} />
            )}
          </div>
        </div>

        {multi ? (
          <div className="hs-image-viewer__footer">
            <span className="hs-image-viewer__count" aria-live="polite">
              {index + 1} / {urls.length}
            </span>
            <div className="hs-image-viewer__dots" aria-hidden>
              {urls.map((url, i) => (
                <button
                  key={url}
                  type="button"
                  className={`hs-image-viewer__dot${i === index ? ' is-active' : ''}`}
                  tabIndex={-1}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
