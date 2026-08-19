import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Generic content widget / card for dashboards and settings sections.
 * Use as the shell around tables, forms, and charts.
 */
export function Widget({ title, subtitle, actions, children, footer, className = '', style, compact = false, testId = 'hs-widget', }) {
    const hasHeader = Boolean(title || subtitle || actions);
    return (_jsxs("section", { className: `hs-widget${compact ? ' hs-widget--compact' : ''} ${className}`.trim(), style: style, "data-testid": testId, children: [hasHeader ? (_jsxs("header", { className: "hs-widget__header", children: [_jsxs("div", { className: "hs-widget__titles", children: [title ? _jsx("h2", { className: "hs-widget__title", children: title }) : null, subtitle ? _jsx("p", { className: "hs-widget__subtitle", children: subtitle }) : null] }), actions ? _jsx("div", { className: "hs-widget__actions", children: actions }) : null] })) : null, _jsx("div", { className: "hs-widget__body", children: children }), footer ? _jsx("footer", { className: "hs-widget__footer", children: footer }) : null] }));
}
