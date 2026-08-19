import type { CSSProperties } from 'react';
export interface DocumentViewerProps {
    src: string;
    title?: string;
    /** Force type: image | pdf | auto (guess from URL). */
    type?: 'image' | 'pdf' | 'auto';
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function DocumentViewer({ src, title, type, className, style, testId, }: DocumentViewerProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentViewer.d.ts.map