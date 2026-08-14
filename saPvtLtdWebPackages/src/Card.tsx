import type {CSSProperties, ElementType, ReactNode} from 'react';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Padding scale. Default `md` (16px). */
  padding?: CardPadding;
  /** Hover elevation for clickable surfaces. */
  interactive?: boolean;
  /** Soft border (default true). */
  bordered?: boolean;
  as?: ElementType;
  onClick?: () => void;
  testId?: string;
}

/**
 * Lightweight surface for list rows, profile blocks, and section panels.
 * Prefer `Widget` when you need a titled header + body + footer shell.
 */
export function Card({
  children,
  className = '',
  style,
  padding = 'md',
  interactive = false,
  bordered = true,
  as: Comp = 'div',
  onClick,
  testId = 'hs-card',
}: CardProps) {
  const classes = [
    'hs-card',
    `hs-card--pad-${padding}`,
    bordered ? 'hs-card--bordered' : '',
    interactive ? 'hs-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Comp
      className={classes}
      style={style}
      onClick={onClick}
      data-testid={testId}
      {...(Comp === 'button' ? {type: 'button'} : {})}>
      {children}
    </Comp>
  );
}
