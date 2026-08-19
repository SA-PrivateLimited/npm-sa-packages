import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PermissionSelector({ modules, value, onChange, disabled = false, className = '', style, testId = 'hs-permission-selector', }) {
    const selected = new Set(value);
    const toggle = (id) => {
        if (disabled)
            return;
        const next = new Set(selected);
        if (next.has(id))
            next.delete(id);
        else
            next.add(id);
        onChange(Array.from(next));
    };
    const toggleModule = (mod) => {
        if (disabled)
            return;
        const ids = mod.permissions.map((p) => p.id);
        const allOn = ids.every((id) => selected.has(id));
        const next = new Set(selected);
        if (allOn)
            ids.forEach((id) => next.delete(id));
        else
            ids.forEach((id) => next.add(id));
        onChange(Array.from(next));
    };
    return (_jsx("div", { className: `hs-perm-selector ${className}`.trim(), style: style, "data-testid": testId, children: modules.map((mod) => {
            const ids = mod.permissions.map((p) => p.id);
            const allOn = ids.length > 0 && ids.every((id) => selected.has(id));
            const someOn = ids.some((id) => selected.has(id));
            return (_jsxs("div", { className: "hs-perm-module", children: [_jsxs("label", { className: "hs-perm-module__head", children: [_jsx("input", { type: "checkbox", checked: allOn, ref: (el) => {
                                    if (el)
                                        el.indeterminate = !allOn && someOn;
                                }, disabled: disabled || ids.length === 0, onChange: () => toggleModule(mod) }), _jsx("strong", { children: mod.label })] }), _jsx("ul", { className: "hs-perm-list", children: mod.permissions.map((p) => (_jsx("li", { children: _jsxs("label", { className: "hs-perm-item", children: [_jsx("input", { type: "checkbox", checked: selected.has(p.id), disabled: disabled, onChange: () => toggle(p.id) }), _jsxs("span", { children: [_jsx("span", { className: "hs-perm-item__label", children: p.label }), p.description ? (_jsx("span", { className: "hs-perm-item__desc", children: p.description })) : null] })] }) }, p.id))) })] }, mod.id));
        }) }));
}
