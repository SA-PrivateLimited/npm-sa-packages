import type {CSSProperties} from 'react';

/**
 * Material Symbols Outlined — single icon source of truth.
 * Catalog: https://fonts.google.com/icons
 *
 * Host apps must load the font once, e.g. in index.html:
 * ```html
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
 *   rel="stylesheet"
 * />
 * ```
 */
export type IconName =
  | 'expand_more'
  | 'expand_less'
  | 'close'
  | 'check'
  | 'search'
  | 'filter_list'
  | 'filter_alt'
  | 'chevron_right'
  | 'chevron_left'
  | 'add'
  | 'delete'
  | 'edit'
  | 'visibility'
  | 'visibility_off'
  | 'more_vert'
  | 'info'
  | 'warning'
  | 'error'
  | 'check_circle'
  | 'progress_activity'
  | (string & {});

export interface IconProps {
  /** Ligature name from https://fonts.google.com/icons (e.g. `close`, `expand_more`). */
  name: IconName;
  className?: string;
  style?: CSSProperties;
  /** Accessible label; omit when decorative (parent has aria-label). */
  label?: string;
  filled?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  size?: number | string;
}

export function Icon({
  name,
  className = '',
  style,
  label,
  filled = false,
  weight = 400,
  size = 20,
}: IconProps) {
  const fontSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={`material-symbols-outlined hs-icon ${className}`.trim()}
      style={{
        fontSize,
        fontFamily: "'Material Symbols Outlined', sans-serif",
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        WebkitFontFeatureSettings: "'liga'",
        fontFeatureSettings: "'liga'",
        ...style,
      }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}>
      {name}
    </span>
  );
}
