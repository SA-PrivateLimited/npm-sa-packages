import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Shared label + stack for form controls in this package. */
export function FieldWrap({ label, htmlFor, className = '', children, }) {
    return (_jsxs("div", { className: `hs-select-wrap ${className}`.trim(), children: [label ? (_jsx("label", { className: "hs-field-label", htmlFor: htmlFor, children: label })) : null, children] }));
}
