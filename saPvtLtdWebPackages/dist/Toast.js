import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState, } from 'react';
import { Icon } from './Icon.js';
const ToastContext = createContext(null);
let imperativeApi = null;
function makeId() {
    return `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
export function ToastProvider({ children }) {
    const [items, setItems] = useState([]);
    const remove = useCallback((id) => {
        setItems((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const show = useCallback((message, variant = 'info', duration = 3500) => {
        const id = makeId();
        setItems((prev) => [...prev, { id, message, variant, duration }]);
        if (duration > 0) {
            window.setTimeout(() => remove(id), duration);
        }
    }, [remove]);
    const api = useMemo(() => ({
        show,
        success: (m, d) => show(m, 'success', d),
        error: (m, d) => show(m, 'error', d),
        info: (m, d) => show(m, 'info', d),
        warning: (m, d) => show(m, 'warning', d),
    }), [show]);
    imperativeApi = api;
    return (_jsxs(ToastContext.Provider, { value: api, children: [children, _jsx("div", { className: "hs-toast-stack", "aria-live": "polite", "aria-relevant": "additions", children: items.map((t) => (_jsxs("div", { className: `hs-toast hs-toast--${t.variant}`, role: "status", children: [_jsx("span", { className: "hs-toast__msg", children: t.message }), _jsx("button", { type: "button", className: "hs-toast__close", "aria-label": "Dismiss", onClick: () => remove(t.id), children: _jsx(Icon, { name: "close", size: 16 }) })] }, t.id))) })] }));
}
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return ctx;
}
/** Imperative helper — works after ToastProvider mounts. */
export const toast = {
    show: (m, v, d) => imperativeApi?.show(m, v, d),
    success: (m, d) => imperativeApi?.success(m, d),
    error: (m, d) => imperativeApi?.error(m, d),
    info: (m, d) => imperativeApi?.info(m, d),
    warning: (m, d) => imperativeApi?.warning(m, d),
};
