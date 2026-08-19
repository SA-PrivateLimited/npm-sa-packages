import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Lightweight surface for list rows, profile blocks, and section panels.
 * Prefer `Widget` when you need a titled header + body + footer shell.
 */
export function Card({ children, className = '', style, padding = 'md', interactive = false, bordered = true, as: Comp = 'div', onClick, testId = 'hs-card', }) {
    const classes = [
        'hs-card',
        `hs-card--pad-${padding}`,
        bordered ? 'hs-card--bordered' : '',
        interactive ? 'hs-card--interactive' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsx(Comp, { className: classes, style: style, onClick: onClick, "data-testid": testId, ...(Comp === 'button' ? { type: 'button' } : {}), children: children }));
}
