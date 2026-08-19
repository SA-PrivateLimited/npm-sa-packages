import { jsx as _jsx } from "react/jsx-runtime";
export function Icon({ name, className = '', style, label, filled = false, weight = 300, size = 20, }) {
    const fontSize = typeof size === 'number' ? `${size}px` : size;
    return (_jsx("span", { className: `material-symbols-outlined hs-icon ${className}`.trim(), style: {
            fontSize,
            fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
            ...style,
        }, "aria-hidden": label ? undefined : true, "aria-label": label, role: label ? 'img' : undefined, children: name }));
}
