import {useEffect, useRef, type CSSProperties, type ReactNode} from 'react';
import {Icon} from './Icon.js';
import {OverlayPortal} from './OverlayPortal.js';
import {
  lockBodyScroll,
  useVisualViewportBox,
  viewportBoxStyle,
} from './overlay.js';

export type DrawerSide = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showClose?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  showClose = true,
  className = '',
  style,
  testId = 'hs-drawer',
}: DrawerProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const box = useVisualViewportBox(open);

  useEffect(() => {
    if (!open) return;
    return lockBodyScroll();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const root = bodyRef.current;
    if (!root) return;
    const onFocus = (e: FocusEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') return;
      requestAnimationFrame(() => {
        target.scrollIntoView({block: 'nearest', inline: 'nearest'});
      });
    };
    root.addEventListener('focusin', onFocus);
    return () => root.removeEventListener('focusin', onFocus);
  }, [open]);

  if (!open) return null;

  return (
    <OverlayPortal>
      <div
        className="hs-drawer-backdrop"
        role="presentation"
        data-testid={testId}
        style={viewportBoxStyle(box)}
        onClick={onClose}>
        <aside
          className={`hs-drawer hs-drawer--${side} ${className}`.trim()}
          style={style}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}>
          {(title || showClose) && (
            <div className="hs-drawer__header">
              {title ? <h3 className="hs-drawer__title">{title}</h3> : <span />}
              {showClose ? (
                <button
                  type="button"
                  className="hs-drawer__close"
                  aria-label="Close"
                  onClick={onClose}>
                  <Icon name="close" size={22} />
                </button>
              ) : null}
            </div>
          )}
          <div ref={bodyRef} className="hs-drawer__body">
            {children}
          </div>
          {footer ? <div className="hs-drawer__footer">{footer}</div> : null}
        </aside>
      </div>
    </OverlayPortal>
  );
}
