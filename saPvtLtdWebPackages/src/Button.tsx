import type {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react';
import {Icon} from './Icon.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonArrow = boolean | 'chevron_right' | 'arrow_forward';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
  /** Trailing directional arrow for navigation CTAs. Off by default. */
  arrow?: ButtonArrow;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  block = false,
  arrow = false,
  disabled,
  children,
  className = '',
  style,
  testId = 'hs-button',
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'hs-btn',
    `hs-btn--${variant}`,
    `hs-btn--${size}`,
    block ? 'hs-btn--block' : '',
    loading ? 'hs-btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const arrowName = arrow === true ? 'arrow_forward' : arrow || null;
  const arrowSize = size === 'sm' ? 16 : 18;

  return (
    <button
      type={type}
      className={classes}
      style={style}
      data-testid={testId}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}>
      {loading ? <span className="hs-btn__spinner" aria-hidden /> : null}
      <span className="hs-btn__label">
        {children}
        {arrowName ? <Icon name={arrowName} size={arrowSize} /> : null}
      </span>
    </button>
  );
}
