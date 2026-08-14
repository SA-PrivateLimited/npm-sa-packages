import {useState, type CSSProperties, type ReactNode} from 'react';
import {Icon} from './Icon.js';
import {Button} from './Button.js';

export interface FilterPanelProps {
  title?: ReactNode;
  children?: ReactNode;
  onApply?: () => void;
  onReset?: () => void;
  applyLabel?: string;
  resetLabel?: string;
  defaultOpen?: boolean;
  collapsible?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function FilterPanel({
  title = 'Filters',
  children,
  onApply,
  onReset,
  applyLabel = 'Apply',
  resetLabel = 'Reset',
  defaultOpen = true,
  collapsible = true,
  className = '',
  style,
  testId = 'hs-filter-panel',
}: FilterPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={`hs-filter-panel ${open ? 'is-open' : ''} ${className}`.trim()}
      style={style}
      data-testid={testId}>
      <div className="hs-filter-panel__header">
        <h3 className="hs-filter-panel__title">{title}</h3>
        {collapsible ? (
          <button
            type="button"
            className="hs-filter-panel__toggle"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}>
            <Icon name={open ? 'expand_less' : 'expand_more'} size={22} />
          </button>
        ) : null}
      </div>
      {open ? (
        <>
          <div className="hs-filter-panel__body">{children}</div>
          {onApply || onReset ? (
            <div className="hs-filter-panel__footer">
              {onReset ? (
                <Button variant="ghost" size="sm" onClick={onReset}>
                  {resetLabel}
                </Button>
              ) : null}
              {onApply ? (
                <Button variant="primary" size="sm" onClick={onApply}>
                  {applyLabel}
                </Button>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
