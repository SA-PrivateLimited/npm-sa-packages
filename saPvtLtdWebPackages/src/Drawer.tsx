import type {CSSProperties, ReactNode} from 'react';
import {Icon} from './Icon.js';

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
  if (!open) return null;

  return (
    <div
      className="hs-drawer-backdrop"
      role="presentation"
      data-testid={testId}
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
        <div className="hs-drawer__body">{children}</div>
        {footer ? <div className="hs-drawer__footer">{footer}</div> : null}
      </aside>
    </div>
  );
}
