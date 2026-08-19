import { type CSSProperties } from 'react';
/** Nested-safe body scroll lock for viewport overlays. */
export declare function lockBodyScroll(): () => void;
export type VisualViewportBox = {
    top: number;
    left: number;
    width: string;
    height: string;
};
/**
 * Live visual-viewport box so overlays sit above the keyboard
 * and restore when it closes. Does not cache window.innerHeight.
 */
export declare function useVisualViewportBox(active: boolean): VisualViewportBox;
export declare function useNarrowOverlay(query?: string): boolean;
export declare function viewportBoxStyle(box: VisualViewportBox): Pick<CSSProperties, 'position' | 'top' | 'left' | 'width' | 'height' | 'right' | 'bottom' | 'inset'>;
//# sourceMappingURL=overlay.d.ts.map