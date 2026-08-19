import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from './Modal.js';
import { Button } from './Button.js';
export function ConfirmDialog({ open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, type = 'info', loading = false, className = '', style, testId = 'hs-confirm', }) {
    return (_jsx(Dialog, { open: open, onClose: onCancel, title: title, className: `hs-confirm hs-confirm--${type} ${className}`.trim(), style: style, testId: testId, footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", onClick: onCancel, disabled: loading, children: cancelText }), _jsx(Button, { variant: type === 'danger' ? 'danger' : 'primary', onClick: onConfirm, loading: loading, children: confirmText })] }), children: _jsx("p", { className: "hs-confirm__message", children: message }) }));
}
