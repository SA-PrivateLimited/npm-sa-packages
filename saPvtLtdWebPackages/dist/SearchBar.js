import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from './Icon.js';
export function SearchBar({ value, onChange, onSubmit, onClear, placeholder = 'Search…', className = '', style, testId = 'hs-search', disabled, ...rest }) {
    return (_jsxs("form", { className: `hs-search ${className}`.trim(), style: style, "data-testid": testId, onSubmit: (e) => {
            e.preventDefault();
            onSubmit?.(value);
        }, children: [_jsx(Icon, { name: "search", size: 20, className: "hs-search__icon" }), _jsx("input", { className: "hs-search__input", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, disabled: disabled, type: "search", "aria-label": typeof placeholder === 'string' ? placeholder : 'Search', ...rest }), value ? (_jsx("button", { type: "button", className: "hs-search__clear", "aria-label": "Clear search", disabled: disabled, onClick: () => {
                    onChange('');
                    onClear?.();
                }, children: _jsx(Icon, { name: "close", size: 18 }) })) : null] }));
}
