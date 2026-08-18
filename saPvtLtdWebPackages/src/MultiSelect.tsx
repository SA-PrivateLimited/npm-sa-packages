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

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type MultiSelectVariant = 'tags' | 'checkbox';

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  /** `tags` and `checkbox` both use checklist in the panel; selected show as chips. */
  variant?: MultiSelectVariant;
  maxTagCount?: number | 'responsive';
  size?: 'small' | 'middle' | 'large';
  style?: CSSProperties;
}

/**
 * Custom multi-select dropdown (no Ant Design).
 * Checklist in panel; selected values as chips on the trigger.
 */
export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  className = '',
  id,
  allowClear = true,
  showSearch = true,
  maxTagCount = 'responsive',
  style,
}: MultiSelectProps) {
  const autoId = useId();
  const selectId = id || autoId;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const {mobile, box} = useDropdownOverlay(open);

  const labelByValue = useMemo(() => {
    const map = new Map(options.map((o) => [o.value, o.label]));
    return map;
  }, [options]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
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

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const visibleTags = useMemo(() => {
    if (maxTagCount === 'responsive') return value.slice(0, 2);
    if (typeof maxTagCount === 'number') return value.slice(0, maxTagCount);
    return value;
  }, [value, maxTagCount]);

  const hiddenCount = Math.max(0, value.length - visibleTags.length);

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
        className={`hs-dd hs-dd--multi${open ? ' is-open' : ''}${disabled ? ' is-disabled' : ''}`}
        style={style}>
        <button
          type="button"
          id={selectId}
          className="hs-dd__trigger hs-dd__trigger--multi"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={onTriggerKey}>
          <span className="hs-dd__chips">
            {value.length === 0 ? (
              <span className="hs-dd__placeholder">{placeholder}</span>
            ) : (
              <>
                {visibleTags.map((v) => (
                  <span key={v} className="hs-dd__chip">
                    {labelByValue.get(v) || v}
                    <span
                      className="hs-dd__chip-x"
                      role="button"
                      tabIndex={-1}
                      aria-label={`Remove ${labelByValue.get(v) || v}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(value.filter((x) => x !== v));
                      }}>
                      ×
                    </span>
                  </span>
                ))}
                {hiddenCount > 0 ? (
                  <span className="hs-dd__chip hs-dd__chip--more">
                    +{hiddenCount}
                  </span>
                ) : null}
              </>
            )}
          </span>
          <span className="hs-dd__actions">
            {allowClear && value.length > 0 ? (
              <span
                className="hs-dd__clear"
                role="button"
                tabIndex={-1}
                aria-label="Clear"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange([]);
                }}>
                <Icon name="close" size={16} />
              </span>
            ) : null}
            <Icon name="expand_more" className="hs-dd__chevron" size={20} />
          </span>
        </button>

        <DropdownOverlay open={open} mobile={mobile} box={box} onClose={close}>
          <div
            className="hs-dd__panel"
            role="listbox"
            aria-multiselectable
            aria-labelledby={selectId}>
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
                  placeholder="Search…"
                  autoFocus
                />
              </div>
            ) : null}
            <ul className="hs-dd__list">
              {filtered.length === 0 ? (
                <li className="hs-dd__empty">No options</li>
              ) : (
                filtered.map((opt) => {
                  const checked = value.includes(opt.value);
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={checked}
                        disabled={opt.disabled}
                        className={`hs-dd__option hs-dd__option--check${checked ? ' is-active' : ''}`}
                        onClick={() => {
                          if (opt.disabled) return;
                          toggle(opt.value);
                        }}>
                        <span
                          className={`hs-dd__checkbox${checked ? ' is-checked' : ''}`}
                          aria-hidden>
                          {checked ? <Icon name="check" size={14} /> : null}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
            <div className="hs-dd__footer">
              <button type="button" className="hs-dd__done" onClick={close}>
                Done
              </button>
            </div>
          </div>
        </DropdownOverlay>
      </div>
    </FieldWrap>
  );
}

/** MultiSelect with checklist options; selected values show as chips inside. */
export function MultiSelectCheckbox(props: Omit<MultiSelectProps, 'variant'>) {
  return <MultiSelect {...props} variant="checkbox" />;
}
