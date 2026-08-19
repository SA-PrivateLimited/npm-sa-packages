import { createPortal } from 'react-dom';
export function OverlayPortal({ children }) {
    if (typeof document === 'undefined')
        return null;
    return createPortal(children, document.body);
}
