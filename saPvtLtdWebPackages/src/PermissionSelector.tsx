import type {CSSProperties} from 'react';

export interface PermissionItem {
  id: string;
  label: string;
  description?: string;
}

export interface PermissionModule {
  id: string;
  label: string;
  permissions: PermissionItem[];
}

export interface PermissionSelectorProps {
  modules: PermissionModule[];
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function PermissionSelector({
  modules,
  value,
  onChange,
  disabled = false,
  className = '',
  style,
  testId = 'hs-permission-selector',
}: PermissionSelectorProps) {
  const selected = new Set(value);

  const toggle = (id: string) => {
    if (disabled) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  const toggleModule = (mod: PermissionModule) => {
    if (disabled) return;
    const ids = mod.permissions.map((p) => p.id);
    const allOn = ids.every((id) => selected.has(id));
    const next = new Set(selected);
    if (allOn) ids.forEach((id) => next.delete(id));
    else ids.forEach((id) => next.add(id));
    onChange(Array.from(next));
  };

  return (
    <div
      className={`hs-perm-selector ${className}`.trim()}
      style={style}
      data-testid={testId}>
      {modules.map((mod) => {
        const ids = mod.permissions.map((p) => p.id);
        const allOn = ids.length > 0 && ids.every((id) => selected.has(id));
        const someOn = ids.some((id) => selected.has(id));
        return (
          <div key={mod.id} className="hs-perm-module">
            <label className="hs-perm-module__head">
              <input
                type="checkbox"
                checked={allOn}
                ref={(el) => {
                  if (el) el.indeterminate = !allOn && someOn;
                }}
                disabled={disabled || ids.length === 0}
                onChange={() => toggleModule(mod)}
              />
              <strong>{mod.label}</strong>
            </label>
            <ul className="hs-perm-list">
              {mod.permissions.map((p) => (
                <li key={p.id}>
                  <label className="hs-perm-item">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      disabled={disabled}
                      onChange={() => toggle(p.id)}
                    />
                    <span>
                      <span className="hs-perm-item__label">{p.label}</span>
                      {p.description ? (
                        <span className="hs-perm-item__desc">{p.description}</span>
                      ) : null}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
