import { jsx as _jsx } from "react/jsx-runtime";
function initials(name) {
    if (!name?.trim())
        return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1)
        return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
function sizePx(size) {
    if (typeof size === 'number')
        return size;
    if (size === 'sm')
        return 32;
    if (size === 'lg')
        return 64;
    return 40;
}
export function Avatar({ src, name, alt, size = 'md', className = '', style, testId = 'hs-avatar', }) {
    const px = sizePx(size);
    const dim = { width: px, height: px, fontSize: Math.round(px * 0.38) };
    if (src) {
        return (_jsx("img", { className: `hs-avatar ${className}`.trim(), src: src, alt: alt || name || '', width: px, height: px, style: { ...dim, ...style }, "data-testid": testId }));
    }
    return (_jsx("span", { className: `hs-avatar hs-avatar--placeholder ${className}`.trim(), style: { ...dim, ...style }, "data-testid": testId, "aria-label": alt || name || 'Avatar', role: "img", children: initials(name) }));
}
