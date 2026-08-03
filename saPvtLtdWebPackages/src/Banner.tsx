import type {ReactNode} from 'react';
import {Icon} from './Icon.js';

export type BannerVariant = 'success' | 'error' | 'info' | 'warning';

export interface BannerProps {
  title: string;
  detail?: string;
  meta?: ReactNode;
  variant?: BannerVariant;
  onDismiss?: () => void;
  className?: string;
  testId?: string;
}

export function Banner({
  title,
  detail,
  meta,
  variant = 'success',
  onDismiss,
  className = '',
  testId = 'hs-banner',
}: BannerProps) {
  return (
    <div
      className={`hs-banner hs-banner--${variant} ${className}`.trim()}
      role="status"
      data-testid={testId}>
      <div className="hs-banner__body">
        <strong className="hs-banner__title">{title}</strong>
        {detail ? <p className="hs-banner__detail">{detail}</p> : null}
        {meta ? <div className="hs-banner__meta">{meta}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="hs-banner__dismiss"
          aria-label="Dismiss"
          onClick={onDismiss}>
          <Icon name="close" size={18} />
        </button>
      ) : null}
    </div>
  );
}
