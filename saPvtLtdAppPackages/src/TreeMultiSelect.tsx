import React from 'react';
import {MultiSelect, type MultiSelectOption, type MultiSelectProps} from './MultiSelect';

export type TreeSelectNode = MultiSelectOption & {children?: TreeSelectNode[]};

export enum TreeMultiSelectStrategy {
  Independent = 'independent',
  ParentSelectsChildren = 'parent',
}

export type TreeMultiSelectProps = Omit<MultiSelectProps, 'options'> & {
  nodes?: TreeSelectNode[];
  options?: MultiSelectOption[];
  strategy?: TreeMultiSelectStrategy;
};

function flatten(nodes: TreeSelectNode[] = []): MultiSelectOption[] {
  const out: MultiSelectOption[] = [];
  const walk = (list: TreeSelectNode[]) => {
    for (const n of list) {
      out.push({label: n.label, value: n.value});
      if (n.children?.length) walk(n.children);
    }
  };
  walk(nodes);
  return out;
}

/** RN stand-in for web TreeMultiSelect — flattens nodes into MultiSelect. */
export function TreeMultiSelect({
  nodes,
  options,
  strategy: _strategy,
  ...rest
}: TreeMultiSelectProps) {
  const flat = options?.length ? options : flatten(nodes);
  return <MultiSelect {...rest} options={flat} />;
}
