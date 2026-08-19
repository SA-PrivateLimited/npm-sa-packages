import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Controlled ISO date (`YYYY-MM-DD`) via native date input. */
export function DatePicker({ value, onChange, label, error, min, max, disabled = false, className = '', style, testId = 'hs-datepicker', }) {
    return (_jsxs("div", { className: `hs-datepicker ${error ? 'hs-datepicker--error' : ''} ${className}`.trim(), style: style, "data-testid": testId, children: [label ? _jsx("label", { className: "hs-field-label", children: label }) : null, _jsx("input", { className: "hs-datepicker__input", type: "date", value: value, min: min, max: max, disabled: disabled, onChange: (e) => onChange(e.target.value), "aria-invalid": Boolean(error) || undefined }), error ? _jsx("p", { className: "hs-field-error", children: error }) : null] }));
}
