import {TreeSelect as AntTreeSelect} from 'antd';
import type {TreeSelectProps as AntTreeSelectProps} from 'antd';
import type {CSSProperties} from 'react';
import {FieldWrap} from './FieldWrap.js';
import {Icon} from './Icon.js';

export interface TreeSelectNode {
  value: string;
  title: string;
  disabled?: boolean;
  children?: TreeSelectNode[];
  /** Extra payload (e.g. category metadata). */
  data?: unknown;
}

export interface TreeMultiSelectProps {
  label?: string;
  treeData: TreeSelectNode[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  /** Show only leaf values when parents are checked. */
  showCheckedStrategy?: AntTreeSelectProps['showCheckedStrategy'];
  treeDefaultExpandAll?: boolean;
  maxTagCount?: AntTreeSelectProps['maxTagCount'];
  size?: AntTreeSelectProps['size'];
  style?: CSSProperties;
}

function toAntTreeData(
  nodes: TreeSelectNode[],
): NonNullable<AntTreeSelectProps['treeData']> {
  return nodes.map((node) => ({
    value: node.value,
    title: node.title,
    disabled: node.disabled,
    children: node.children ? toAntTreeData(node.children) : undefined,
  }));
}

/**
 * Hierarchical multi-select with checkable tree (Ant Design TreeSelect).
 * Use for category / org / nested filter UIs.
 */
export function TreeMultiSelect({
  label,
  treeData,
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  className = '',
  id,
  allowClear = true,
  showSearch = true,
  showCheckedStrategy = AntTreeSelect.SHOW_CHILD,
  treeDefaultExpandAll = false,
  maxTagCount = 'responsive',
  size = 'middle',
  style,
}: TreeMultiSelectProps) {
  const selectId = id || 'hs-tree-multiselect';

  return (
    <FieldWrap label={label} htmlFor={selectId} className={className}>
      <AntTreeSelect
        id={selectId}
        className="hs-tree-multiselect"
        size={size}
        style={{width: '100%', ...style}}
        treeData={toAntTreeData(treeData)}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        showSearch={showSearch}
        treeCheckable
        showCheckedStrategy={showCheckedStrategy}
        treeDefaultExpandAll={treeDefaultExpandAll}
        maxTagCount={maxTagCount}
        treeNodeFilterProp="title"
        suffixIcon={
          <Icon name="expand_more" className="hs-select__chevron" size={20} />
        }
        onChange={(next) => onChange(Array.isArray(next) ? (next as string[]) : [])}
        getPopupContainer={(node) => node.parentElement ?? document.body}
      />
    </FieldWrap>
  );
}

export const TreeMultiSelectStrategy = {
  SHOW_ALL: AntTreeSelect.SHOW_ALL,
  SHOW_PARENT: AntTreeSelect.SHOW_PARENT,
  SHOW_CHILD: AntTreeSelect.SHOW_CHILD,
} as const;
