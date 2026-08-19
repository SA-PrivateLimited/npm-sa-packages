import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Icon } from './Icon.js';
import { Button } from './Button.js';
export function Pagination({ page, pageSize, total, onChange, showSizeChanger = false, pageSizeOptions = [10, 20, 50], onPageSizeChange, className = '', style, testId = 'hs-pagination', }) {
    const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
    const current = Math.min(Math.max(1, page), totalPages);
    const from = total === 0 ? 0 : (current - 1) * pageSize + 1;
    const to = Math.min(total, current * pageSize);
    return (_jsxs("div", { className: `hs-pagination ${className}`.trim(), style: style, "data-testid": testId, children: [_jsxs("span", { className: "hs-pagination__meta", children: [from, "\u2013", to, " of ", total] }), _jsxs("div", { className: "hs-pagination__controls", children: [showSizeChanger && onPageSizeChange ? (_jsx("select", { className: "hs-pagination__size", value: pageSize, "aria-label": "Rows per page", onChange: (e) => onPageSizeChange(Number(e.target.value)), children: pageSizeOptions.map((n) => (_jsxs("option", { value: n, children: [n, " / page"] }, n))) })) : null, _jsx(Button, { variant: "secondary", size: "sm", disabled: current <= 1, "aria-label": "Previous page", onClick: () => onChange(current - 1), children: _jsx(Icon, { name: "chevron_left", size: 18 }) }), _jsxs("span", { className: "hs-pagination__page", children: [current, " / ", totalPages] }), _jsx(Button, { variant: "secondary", size: "sm", disabled: current >= totalPages, "aria-label": "Next page", onClick: () => onChange(current + 1), children: _jsx(Icon, { name: "chevron_right", size: 18 }) })] })] }));
}
