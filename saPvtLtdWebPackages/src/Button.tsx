import type {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
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
      <span className="hs-btn__label">{children}</span>
    </button>
  );
}
