import { jsx as _jsx } from "react/jsx-runtime";
export function Skeleton({ variant = 'text', width, height, lines = 1, className = '', style, testId = 'hs-skeleton', }) {
    if (variant === 'text' && lines > 1) {
        return (_jsx("div", { className: `hs-skeleton-stack ${className}`.trim(), style: style, "data-testid": testId, "aria-hidden": true, children: Array.from({ length: lines }, (_, i) => (_jsx("span", { className: "hs-skeleton hs-skeleton--text", style: {
                    width: i === lines - 1 ? '70%' : width,
                    height,
                } }, i))) }));
    }
    return (_jsx("span", { className: `hs-skeleton hs-skeleton--${variant} ${className}`.trim(), style: { width, height, ...style }, "data-testid": testId, "aria-hidden": true }));
}
