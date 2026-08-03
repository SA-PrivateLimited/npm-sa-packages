import type {CSSProperties, ReactNode} from 'react';
import {Icon} from './Icon.js';

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface ChipProps {
  label: ReactNode;
  variant?: ChipVariant;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

/** Compact label / filter / tag chip. */
export function Chip({
  label,
  variant = 'default',
  selected = false,
  disabled = false,
  onClick,
  onClose,
  className = '',
  style,
  testId = 'hs-chip',
}: ChipProps) {
  const classes = `hs-chip hs-chip--${variant}${selected ? ' hs-chip--selected' : ''}${
    disabled ? ' hs-chip--disabled' : ''
  } ${className}`.trim();

  const closeBtn =
    onClose && !disabled ? (
      <button
        type="button"
        className="hs-chip__close"
        aria-label="Remove"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
        <Icon name="close" size={14} />
      </button>
    ) : null;

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        style={style}
        data-testid={testId}
        disabled={disabled}
        onClick={onClick}>
        <span className="hs-chip__label">{label}</span>
        {closeBtn}
      </button>
    );
  }

  return (
    <span className={classes} style={style} data-testid={testId} role="listitem">
      <span className="hs-chip__label">{label}</span>
      {closeBtn}
    </span>
  );
}

export interface ChipsProps {
  children: ReactNode;
  className?: string;
  /** When true, chips wrap onto multiple lines. */
  wrap?: boolean;
}

/** Horizontal chip group / filter row. */
export function Chips({children, className = '', wrap = true}: ChipsProps) {
  return (
    <div
      className={`hs-chips${wrap ? ' hs-chips--wrap' : ''} ${className}`.trim()}
      role="list">
      {children}
    </div>
  );
}
