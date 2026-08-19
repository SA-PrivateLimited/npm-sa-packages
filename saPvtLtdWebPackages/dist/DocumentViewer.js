import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './Button.js';
function guessType(src, type) {
    if (type === 'image' || type === 'pdf')
        return type;
    const lower = src.toLowerCase().split('?')[0];
    if (/\.(png|jpe?g|gif|webp|svg|bmp)$/.test(lower) || lower.startsWith('data:image')) {
        return 'image';
    }
    if (/\.pdf$/.test(lower) || lower.startsWith('data:application/pdf'))
        return 'pdf';
    return 'other';
}
export function DocumentViewer({ src, title, type = 'auto', className = '', style, testId = 'hs-doc-viewer', }) {
    const kind = guessType(src, type);
    return (_jsxs("div", { className: `hs-doc-viewer ${className}`.trim(), style: style, "data-testid": testId, children: [title ? _jsx("h4", { className: "hs-doc-viewer__title", children: title }) : null, kind === 'image' ? (_jsx("img", { className: "hs-doc-viewer__img", src: src, alt: title || 'Document' })) : kind === 'pdf' ? (_jsx("iframe", { className: "hs-doc-viewer__frame", src: src, title: title || 'PDF document' })) : (_jsxs("div", { className: "hs-doc-viewer__fallback", children: [_jsx("p", { children: "Preview not available for this file type." }), _jsx(Button, { variant: "secondary", onClick: () => window.open(src, '_blank', 'noopener,noreferrer'), children: "Open document" })] }))] }));
}
