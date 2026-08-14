import type {CSSProperties, ReactNode} from 'react';
import {Icon, type IconName} from './Icon.js';
import {Button} from './Button.js';

export interface EmptyStateProps {
  title: string;
  message?: ReactNode;
  icon?: IconName;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function EmptyState({
  title,
  message,
  icon = 'inbox',
  actionLabel,
  onAction,
  className = '',
  style,
  testId = 'hs-empty',
}: EmptyStateProps) {
  return (
    <div
      className={`hs-empty-state ${className}`.trim()}
      style={style}
      data-testid={testId}>
      <Icon name={icon} size={48} className="hs-empty-state__icon" />
      <h3 className="hs-empty-state__title">{title}</h3>
      {message ? <p className="hs-empty-state__msg">{message}</p> : null}
      {actionLabel && onAction ? (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  message?: ReactNode;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  retryLabel = 'Try again',
  onRetry,
  className = '',
  style,
  testId = 'hs-error',
}: ErrorStateProps) {
  return (
    <div
      className={`hs-error-state ${className}`.trim()}
      style={style}
      data-testid={testId}
      role="alert">
      <Icon name="error" size={48} className="hs-error-state__icon" />
      <h3 className="hs-error-state__title">{title}</h3>
      {message ? <p className="hs-error-state__msg">{message}</p> : null}
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
