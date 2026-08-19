import { jsx as _jsx } from "react/jsx-runtime";
import { TreeSelect as AntTreeSelect } from 'antd';
import { FieldWrap } from './FieldWrap.js';
import { Icon } from './Icon.js';
function toAntTreeData(nodes) {
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
export function TreeMultiSelect({ label, treeData, value, onChange, placeholder = 'Select…', disabled = false, className = '', id, allowClear = true, showSearch = true, showCheckedStrategy = AntTreeSelect.SHOW_CHILD, treeDefaultExpandAll = false, maxTagCount = 'responsive', size = 'middle', style, }) {
    const selectId = id || 'hs-tree-multiselect';
    return (_jsx(FieldWrap, { label: label, htmlFor: selectId, className: className, children: _jsx(AntTreeSelect, { id: selectId, className: "hs-tree-multiselect", size: size, style: { width: '100%', ...style }, treeData: toAntTreeData(treeData), value: value, placeholder: placeholder, disabled: disabled, allowClear: allowClear, showSearch: showSearch, treeCheckable: true, showCheckedStrategy: showCheckedStrategy, treeDefaultExpandAll: treeDefaultExpandAll, maxTagCount: maxTagCount, treeNodeFilterProp: "title", suffixIcon: _jsx(Icon, { name: "expand_more", className: "hs-select__chevron", size: 20 }), onChange: (next) => onChange(Array.isArray(next) ? next : []), getPopupContainer: (node) => node.parentElement ?? document.body }) }));
}
export const TreeMultiSelectStrategy = {
    SHOW_ALL: AntTreeSelect.SHOW_ALL,
    SHOW_PARENT: AntTreeSelect.SHOW_PARENT,
    SHOW_CHILD: AntTreeSelect.SHOW_CHILD,
};
