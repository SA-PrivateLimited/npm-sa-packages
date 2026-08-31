import { type CSSProperties } from 'react';
export interface ImageViewerProps {
    /** Image URLs to show (caller supplies; typically max 3 for showcase). */
    images: string[];
    /** Index to show when opening. */
    initialIndex?: number;
    open: boolean;
    onClose: () => void;
    /** Accessible dialog name. */
    label?: string;
    closeLabel?: string;
    prevLabel?: string;
    nextLabel?: string;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
/**
 * Centered image modal card — presentation only.
 * Pass image URLs via props; no S3/upload/API logic.
 */
export declare function ImageViewer({ images, initialIndex, open, onClose, label, closeLabel, prevLabel, nextLabel, className, style, testId, }: ImageViewerProps): import("react").ReactPortal | null;
//# sourceMappingURL=ImageViewer.d.ts.map