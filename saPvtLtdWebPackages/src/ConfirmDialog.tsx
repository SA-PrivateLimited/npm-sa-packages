import type {CSSProperties, ReactNode} from 'react';
import {Dialog} from './Modal.js';
import {Button} from './Button.js';
import {Icon} from './Icon.js';

export type ConfirmDialogType = 'danger' | 'warning' | 'info' | 'success';

const TYPE_ICON: Record<ConfirmDialogType, string> = {
  danger: 'delete',
  warning: 'warning',
  success: 'check_circle',
  info: 'info',
};

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: ConfirmDialogType;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'info',
  loading = false,
  className = '',
  style,
  testId = 'hs-confirm',
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      title={
        <span className="hs-confirm__head">
          <span className={`hs-confirm__icon hs-confirm__icon--${type}`}>
            <Icon name={TYPE_ICON[type]} size={22} />
          </span>
          {title}
        </span>
      }
      showClose={false}
      className={`hs-confirm hs-confirm--${type} ${className}`.trim()}
      style={style}
      testId={testId}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={type === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}>
            {confirmText}
          </Button>
        </>
      }>
      <p className="hs-confirm__message">{message}</p>
    </Dialog>
  );
}
