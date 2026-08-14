import type {CSSProperties} from 'react';
import {Button} from './Button.js';

export interface DocumentViewerProps {
  src: string;
  title?: string;
  /** Force type: image | pdf | auto (guess from URL). */
  type?: 'image' | 'pdf' | 'auto';
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

function guessType(src: string, type: DocumentViewerProps['type']): 'image' | 'pdf' | 'other' {
  if (type === 'image' || type === 'pdf') return type;
  const lower = src.toLowerCase().split('?')[0];
  if (/\.(png|jpe?g|gif|webp|svg|bmp)$/.test(lower) || lower.startsWith('data:image')) {
    return 'image';
  }
  if (/\.pdf$/.test(lower) || lower.startsWith('data:application/pdf')) return 'pdf';
  return 'other';
}

export function DocumentViewer({
  src,
  title,
  type = 'auto',
  className = '',
  style,
  testId = 'hs-doc-viewer',
}: DocumentViewerProps) {
  const kind = guessType(src, type);

  return (
    <div
      className={`hs-doc-viewer ${className}`.trim()}
      style={style}
      data-testid={testId}>
      {title ? <h4 className="hs-doc-viewer__title">{title}</h4> : null}
      {kind === 'image' ? (
        <img className="hs-doc-viewer__img" src={src} alt={title || 'Document'} />
      ) : kind === 'pdf' ? (
        <iframe
          className="hs-doc-viewer__frame"
          src={src}
          title={title || 'PDF document'}
        />
      ) : (
        <div className="hs-doc-viewer__fallback">
          <p>Preview not available for this file type.</p>
          <Button
            variant="secondary"
            onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}>
            Open document
          </Button>
        </div>
      )}
    </div>
  );
}
