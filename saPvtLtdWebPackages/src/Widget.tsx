import type {CSSProperties, ReactNode} from 'react';

export interface WidgetProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Right-aligned header actions (buttons, menus). */
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Dense padding for dashboard tiles. */
  compact?: boolean;
  testId?: string;
}

/**
 * Generic content widget / card for dashboards and settings sections.
 * Use as the shell around tables, forms, and charts.
 */
export function Widget({
  title,
  subtitle,
  actions,
  children,
  footer,
  className = '',
  style,
  compact = false,
  testId = 'hs-widget',
}: WidgetProps) {
  const hasHeader = Boolean(title || subtitle || actions);

  return (
    <section
      className={`hs-widget${compact ? ' hs-widget--compact' : ''} ${className}`.trim()}
      style={style}
      data-testid={testId}>
      {hasHeader ? (
        <header className="hs-widget__header">
          <div className="hs-widget__titles">
            {title ? <h2 className="hs-widget__title">{title}</h2> : null}
            {subtitle ? <p className="hs-widget__subtitle">{subtitle}</p> : null}
          </div>
          {actions ? <div className="hs-widget__actions">{actions}</div> : null}
        </header>
      ) : null}
      <div className="hs-widget__body">{children}</div>
      {footer ? <footer className="hs-widget__footer">{footer}</footer> : null}
    </section>
  );
}
