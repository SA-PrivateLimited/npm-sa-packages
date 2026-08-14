import type {CSSProperties, ReactNode} from 'react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface BadgeProps {
  children?: ReactNode;
  count?: number;
  max?: number;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function Badge({
  children,
  count,
  max = 99,
  variant = 'primary',
  dot = false,
  className = '',
  style,
  testId = 'hs-badge',
}: BadgeProps) {
  const showCount = typeof count === 'number' && count > 0;
  const label = showCount ? (count > max ? `${max}+` : String(count)) : null;

  if (children != null) {
    return (
      <span
        className={`hs-badge-wrap ${className}`.trim()}
        style={style}
        data-testid={testId}>
        {children}
        {dot || showCount ? (
          <span
            className={`hs-badge hs-badge--${variant}${dot ? ' hs-badge--dot' : ''}`}>
            {dot ? null : label}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={`hs-badge hs-badge--${variant}${dot ? ' hs-badge--dot' : ''} ${className}`.trim()}
      style={style}
      data-testid={testId}>
      {dot ? null : label ?? children}
    </span>
  );
}
