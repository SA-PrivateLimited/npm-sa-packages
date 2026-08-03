import {Checkbox, Select as AntSelect, Space} from 'antd';
import type {SelectProps as AntSelectProps} from 'antd';
import type {CSSProperties} from 'react';
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
  /** `tags` = chip tags in the field; `checkbox` = checklist in the dropdown. */
  variant?: MultiSelectVariant;
  maxTagCount?: AntSelectProps['maxTagCount'];
  size?: AntSelectProps['size'];
  style?: CSSProperties;
}

/** Multi-value dropdown (Ant Design under the hood). */
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
  variant = 'tags',
  maxTagCount = 'responsive',
  size = 'middle',
  style,
}: MultiSelectProps) {
  const selectId = id || 'hs-multiselect';
  const isCheckbox = variant === 'checkbox';

  return (
    <FieldWrap label={label} htmlFor={selectId} className={className}>
      <AntSelect
        id={selectId}
        mode="multiple"
        className={`hs-multiselect${isCheckbox ? ' hs-multiselect--checkbox' : ''}`}
        size={size}
        style={{width: '100%', ...style}}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        showSearch={showSearch}
        optionFilterProp="label"
        maxTagCount={maxTagCount}
        options={options}
        suffixIcon={
          <Icon name="expand_more" className="hs-select__chevron" size={20} />
        }
        menuItemSelectedIcon={isCheckbox ? null : undefined}
        optionRender={
          isCheckbox
            ? (oriOption) => {
                const optValue = String(oriOption.value ?? '');
                const checked = value.includes(optValue);
                return (
                  <Space size={8}>
                    <Checkbox
                      checked={checked}
                      disabled={Boolean(oriOption.data?.disabled)}
                    />
                    <span>{oriOption.label}</span>
                  </Space>
                );
              }
            : undefined
        }
        onChange={(next) => onChange(Array.isArray(next) ? next : [])}
        getPopupContainer={(node) => node.parentElement ?? document.body}
      />
    </FieldWrap>
  );
}

/** MultiSelect with checklist options; selected values show as chips inside. */
export function MultiSelectCheckbox(props: Omit<MultiSelectProps, 'variant'>) {
  return <MultiSelect {...props} variant="checkbox" />;
}
