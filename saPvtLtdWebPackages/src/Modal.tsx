import {useEffect, type CSSProperties, type ReactNode} from 'react';
import {Icon} from './Icon.js';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  /** Close when backdrop is clicked (default true). */
  closeOnBackdrop?: boolean;
  /** Close on Escape (default true). */
  closeOnEscape?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function Modal({
  open,
  onClose,
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  style,
  testId = 'hs-modal',
}: ModalProps) {
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="hs-modal-backdrop"
      role="presentation"
      data-testid={testId}
      onClick={() => {
        if (closeOnBackdrop) onClose();
      }}>
      <div
        className={`hs-modal ${className}`.trim()}
        style={style}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showClose?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  showClose = true,
  className = '',
  style,
  testId = 'hs-dialog',
}: DialogProps) {
  return (
    <Modal open={open} onClose={onClose} className={className} style={style} testId={testId}>
      <div className="hs-dialog">
        {(title || showClose) && (
          <div className="hs-dialog__header">
            {title ? <h3 className="hs-dialog__title">{title}</h3> : <span />}
            {showClose ? (
              <button
                type="button"
                className="hs-dialog__close"
                aria-label="Close"
                onClick={onClose}>
                <Icon name="close" size={22} />
              </button>
            ) : null}
          </div>
        )}
        <div className="hs-dialog__body">{children}</div>
        {footer ? <div className="hs-dialog__footer">{footer}</div> : null}
      </div>
    </Modal>
  );
}
