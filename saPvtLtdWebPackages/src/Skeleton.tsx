import type {CSSProperties} from 'react';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'rect' | 'card';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
  style,
  testId = 'hs-skeleton',
}: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div
        className={`hs-skeleton-stack ${className}`.trim()}
        style={style}
        data-testid={testId}
        aria-hidden>
        {Array.from({length: lines}, (_, i) => (
          <span
            key={i}
            className="hs-skeleton hs-skeleton--text"
            style={{
              width: i === lines - 1 ? '70%' : width,
              height,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={`hs-skeleton hs-skeleton--${variant} ${className}`.trim()}
      style={{width, height, ...style}}
      data-testid={testId}
      aria-hidden
    />
  );
}
