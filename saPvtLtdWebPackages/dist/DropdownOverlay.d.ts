import { type ReactNode } from 'react';
import { useVisualViewportBox } from './overlay.js';
export declare function useDropdownOverlay(open: boolean): {
    mobile: boolean;
    box: import("./overlay.js").VisualViewportBox;
};
export declare function DropdownOverlay({ open, mobile, box, onClose, children, }: {
    open: boolean;
    mobile: boolean;
    box: ReturnType<typeof useVisualViewportBox>;
    onClose: () => void;
    children: ReactNode;
}): import("react").JSX.Element | null;
//# sourceMappingURL=DropdownOverlay.d.ts.map