import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Input({ label, error, hint, prefix, suffix, multiline = false, rows = 3, className = '', style, inputClassName = '', testId = 'hs-input', id, disabled, ...rest }) {
    const fieldId = id || (typeof label === 'string' ? undefined : undefined);
    const wrapClass = [
        'hs-input-wrap',
        error ? 'hs-input-wrap--error' : '',
        disabled ? 'hs-input-wrap--disabled' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    const controlClass = ['hs-input', inputClassName].filter(Boolean).join(' ');
    return (_jsxs("div", { className: wrapClass, style: style, "data-testid": testId, children: [label ? (_jsx("label", { className: "hs-field-label", htmlFor: fieldId, children: label })) : null, _jsxs("div", { className: "hs-input__shell", children: [prefix ? _jsx("span", { className: "hs-input__affix hs-input__prefix", children: prefix }) : null, multiline ? (_jsx("textarea", { id: fieldId, className: controlClass, rows: rows, disabled: disabled, "aria-invalid": Boolean(error) || undefined, ...rest })) : (_jsx("input", { id: fieldId, className: controlClass, disabled: disabled, "aria-invalid": Boolean(error) || undefined, ...rest })), suffix ? _jsx("span", { className: "hs-input__affix hs-input__suffix", children: suffix }) : null] }), error ? _jsx("p", { className: "hs-field-error", children: error }) : null, !error && hint ? _jsx("p", { className: "hs-field-hint", children: hint }) : null] }));
}
