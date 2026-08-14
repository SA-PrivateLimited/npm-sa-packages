import type {CSSProperties, InputHTMLAttributes} from 'react';
import {Icon} from './Icon.js';

export interface SearchBarProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'onSubmit'
  > {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search…',
  className = '',
  style,
  testId = 'hs-search',
  disabled,
  ...rest
}: SearchBarProps) {
  return (
    <form
      className={`hs-search ${className}`.trim()}
      style={style}
      data-testid={testId}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}>
      <Icon name="search" size={20} className="hs-search__icon" />
      <input
        className="hs-search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        type="search"
        aria-label={typeof placeholder === 'string' ? placeholder : 'Search'}
        {...rest}
      />
      {value ? (
        <button
          type="button"
          className="hs-search__clear"
          aria-label="Clear search"
          disabled={disabled}
          onClick={() => {
            onChange('');
            onClear?.();
          }}>
          <Icon name="close" size={18} />
        </button>
      ) : null}
    </form>
  );
}
