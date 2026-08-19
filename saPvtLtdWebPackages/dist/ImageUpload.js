import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from './Icon.js';
function readFiles(files) {
    if (!files?.length)
        return Promise.resolve([]);
    return Promise.all(Array.from(files).map((file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    })));
}
export function ImageUpload({ value, onChange, max = 5, accept = 'image/*', disabled = false, label = 'Upload images', className = '', style, testId = 'hs-image-upload', }) {
    const remaining = Math.max(0, max - value.length);
    const onPick = async (e) => {
        const urls = await readFiles(e.target.files);
        e.target.value = '';
        if (!urls.length)
            return;
        onChange([...value, ...urls].slice(0, max));
    };
    return (_jsxs("div", { className: `hs-image-upload ${className}`.trim(), style: style, "data-testid": testId, children: [label ? _jsx("p", { className: "hs-field-label", children: label }) : null, _jsxs("div", { className: "hs-image-upload__grid", children: [value.map((src, i) => (_jsxs("div", { className: "hs-image-upload__thumb", children: [_jsx("img", { src: src, alt: "" }), !disabled ? (_jsx("button", { type: "button", className: "hs-image-upload__remove", "aria-label": "Remove image", onClick: () => onChange(value.filter((_, idx) => idx !== i)), children: _jsx(Icon, { name: "close", size: 14 }) })) : null] }, `${i}-${src.slice(0, 24)}`))), remaining > 0 && !disabled ? (_jsxs("label", { className: "hs-image-upload__add", children: [_jsx(Icon, { name: "add", size: 28 }), _jsxs("span", { children: ["Add (", value.length, "/", max, ")"] }), _jsx("input", { type: "file", accept: accept, multiple: remaining > 1, hidden: true, onChange: (e) => void onPick(e) })] })) : null] })] }));
}
