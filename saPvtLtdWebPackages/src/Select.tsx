import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import {DropdownOverlay, useDropdownOverlay} from './DropdownOverlay.js';
import {FieldWrap} from './FieldWrap.js';
import {Icon} from './Icon.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Extra haystack for dropdown search (aliases, other languages). */
  searchText?: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  /** Placeholder for the in-dropdown search field when `showSearch` is true. */
  searchPlaceholder?: string;
  /** Shown when search/filter yields no options. */
  emptyMessage?: string;
  /** Accessible label for the clear control. */
  clearAriaLabel?: string;
  /** Kept for Ant API compat; ignored by custom dropdown. */
  size?: 'small' | 'middle' | 'large';
  style?: CSSProperties;
}

/**
 * Custom single-select dropdown (no Ant Design).
 * Mobile: full-width bottom sheet. Desktop: anchored list.
 */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  className = '',
  id,
  allowClear,
  showSearch = false,
  searchPlaceholder = 'Search…',
  emptyMessage = 'No options',
  clearAriaLabel = 'Clear',
  style,
}: SelectProps) {
  const autoId = useId();
  const selectId = id || autoId;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const canClear = allowClear ?? Boolean(placeholder);
  const {mobile, box} = useDropdownOverlay(open);

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => {
      const hay = `${o.label} ${o.searchText || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [options, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    if (mobile) {
      return () => document.removeEventListener('keydown', onKey);
    }
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', onDoc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, mobile]);

  const onTriggerKey = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <FieldWrap label={label} htmlFor={selectId} className={className}>
      <div
        ref={rootRef}
        className={`hs-dd${open ? ' is-open' : ''}${disabled ? ' is-disabled' : ''}`}
        style={style}>
        <button
          type="button"
          id={selectId}
          className="hs-dd__trigger"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={onTriggerKey}>
          <span
            className={
              selected ? 'hs-dd__value' : 'hs-dd__value hs-dd__placeholder'
            }>
            {selected?.label || placeholder}
          </span>
          <span className="hs-dd__actions">
            {canClear && value ? (
              <span
                className="hs-dd__clear"
                role="button"
                tabIndex={-1}
                aria-label={clearAriaLabel}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                  close();
                }}>
                <Icon name="close" size={16} />
              </span>
            ) : null}
            <Icon
              name="expand_more"
              className="hs-dd__chevron"
              size={20}
            />
          </span>
        </button>

        <DropdownOverlay open={open} mobile={mobile} box={box} onClose={close}>
          <div className="hs-dd__panel" role="listbox" aria-labelledby={selectId}>
            <div className="hs-dd__sheet-handle" aria-hidden />
            {label || placeholder ? (
              <p className="hs-dd__panel-title">{label || placeholder}</p>
            ) : null}
            {showSearch ? (
              <div className="hs-dd__search">
                <input
                  className="hs-dd__search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  autoFocus
                />
              </div>
            ) : null}
            <ul className="hs-dd__list">
              {filtered.length === 0 ? (
                <li className="hs-dd__empty">{emptyMessage}</li>
              ) : (
                filtered.map((opt) => {
                  const active = opt.value === value;
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        disabled={opt.disabled}
                        className={`hs-dd__option${active ? ' is-active' : ''}`}
                        onClick={() => {
                          if (opt.disabled) return;
                          onChange(opt.value);
                          close();
                        }}>
                        <span>{opt.label}</span>
                        {active ? (
                          <Icon name="check" size={18} className="hs-dd__check" />
                        ) : null}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </DropdownOverlay>
      </div>
    </FieldWrap>
  );
}

/** Alias — prefer this name in new code for clarity. */
export const SingleSelect = Select;
