import { jsx as _jsx } from "react/jsx-runtime";
export function Icon({ name, className = '', style, label, filled = false, weight = 400, size = 20, }) {
    const fontSize = typeof size === 'number' ? `${size}px` : size;
    return (_jsx("span", { className: `material-symbols-outlined hs-icon ${className}`.trim(), style: {
            fontSize,
            fontFamily: "'Material Symbols Outlined', sans-serif",
            fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
            WebkitFontFeatureSettings: "'liga'",
            fontFeatureSettings: "'liga'",
            ...style,
        }, "aria-hidden": label ? undefined : true, "aria-label": label, role: label ? 'img' : undefined, children: name }));
}
