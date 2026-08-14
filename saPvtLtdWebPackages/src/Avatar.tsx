import type {CSSProperties} from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg' | number;

export interface AvatarProps {
  src?: string | null;
  name?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

function initials(name?: string): string {
  if (!name?.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

function sizePx(size: AvatarSize): number {
  if (typeof size === 'number') return size;
  if (size === 'sm') return 32;
  if (size === 'lg') return 64;
  return 40;
}

export function Avatar({
  src,
  name,
  alt,
  size = 'md',
  className = '',
  style,
  testId = 'hs-avatar',
}: AvatarProps) {
  const px = sizePx(size);
  const dim = {width: px, height: px, fontSize: Math.round(px * 0.38)};

  if (src) {
    return (
      <img
        className={`hs-avatar ${className}`.trim()}
        src={src}
        alt={alt || name || ''}
        width={px}
        height={px}
        style={{...dim, ...style}}
        data-testid={testId}
      />
    );
  }

  return (
    <span
      className={`hs-avatar hs-avatar--placeholder ${className}`.trim()}
      style={{...dim, ...style}}
      data-testid={testId}
      aria-label={alt || name || 'Avatar'}
      role="img">
      {initials(name)}
    </span>
  );
}
