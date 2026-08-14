import type {CSSProperties} from 'react';

export type LoaderSize = 'sm' | 'md' | 'lg';

export interface LoaderProps {
  size?: LoaderSize;
  label?: string;
  fullscreen?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function Loader({
  size = 'md',
  label,
  fullscreen = false,
  className = '',
  style,
  testId = 'hs-loader',
}: LoaderProps) {
  const body = (
    <div
      className={`hs-loader hs-loader--${size} ${className}`.trim()}
      style={style}
      data-testid={testId}
      role="status"
      aria-label={label || 'Loading'}>
      <span className="hs-loader__spinner" aria-hidden />
      {label ? <span className="hs-loader__label">{label}</span> : null}
    </div>
  );

  if (fullscreen) {
    return <div className="hs-loader-fullscreen">{body}</div>;
  }
  return body;
}
