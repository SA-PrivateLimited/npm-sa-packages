import {Select as AntSelect} from 'antd';
import type {SelectProps as AntSelectProps} from 'antd';
import type {CSSProperties} from 'react';
import {FieldWrap} from './FieldWrap.js';
import {Icon} from './Icon.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
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
  size?: AntSelectProps['size'];
  style?: CSSProperties;
}

/** Single-value dropdown (Ant Design under the hood). */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  id,
  allowClear,
  showSearch = false,
  size = 'middle',
  style,
}: SelectProps) {
  const selectId = id || 'hs-select';

  return (
    <FieldWrap label={label} htmlFor={selectId} className={className}>
      <AntSelect
        id={selectId}
        className="hs-select"
        size={size}
        style={{width: '100%', ...style}}
        value={value === '' ? undefined : value}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear ?? Boolean(placeholder)}
        showSearch={showSearch}
        optionFilterProp="label"
        options={options}
        suffixIcon={
          <Icon name="expand_more" className="hs-select__chevron" size={20} />
        }
        onChange={(next) => onChange(typeof next === 'string' ? next : '')}
        getPopupContainer={() => document.body}
      />
    </FieldWrap>
  );
}

/** Alias — prefer this name in new code for clarity. */
export const SingleSelect = Select;
