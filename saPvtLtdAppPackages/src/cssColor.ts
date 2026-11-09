import type {ViewStyle} from 'react-native';

/** Parse #rgb / #rrggbb / rgb() / rgba() into channels. */
export function parseCssColor(
  input: string,
): {r: number; g: number; b: number; a: number} | null {
  const raw = String(input || '').trim();
  if (raw.startsWith('#')) {
    const h = raw.slice(1);
    if (h.length === 3) {
      return {
        r: parseInt(h[0] + h[0], 16),
        g: parseInt(h[1] + h[1], 16),
        b: parseInt(h[2] + h[2], 16),
        a: 1,
      };
    }
    if (h.length >= 6) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: 1,
      };
    }
    return null;
  }
  const m = raw.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i,
  );
  if (!m) return null;
  return {
    r: Number(m[1]),
    g: Number(m[2]),
    b: Number(m[3]),
    a: m[4] != null ? Number(m[4]) : 1,
  };
}

export function formatCssColor(rgb: {
  r: number;
  g: number;
  b: number;
  a: number;
}): string {
  const r = Math.max(0, Math.min(255, Math.round(rgb.r)));
  const g = Math.max(0, Math.min(255, Math.round(rgb.g)));
  const b = Math.max(0, Math.min(255, Math.round(rgb.b)));
  const a = Math.max(0, Math.min(1, rgb.a));
  if (a < 0.999) {
    return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})`;
  }
  const h = (n: number) => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

export function colorAlpha(color: string): number {
  return parseCssColor(color)?.a ?? 1;
}

export function isTranslucent(color: string): boolean {
  return colorAlpha(color) < 0.99;
}

/** Card stroke color — same as the fill, not `theme.border`. */
export function matchingStroke(border: string, fill: string): string {
  return fill || border;
}

/**
 * Light lift. Never use Android elevation on glass — it paints a grey
 * ring. iOS gets a soft drop shadow only.
 */
export function surfaceLiftStyle(fill?: string): ViewStyle {
  const glass = fill ? isTranslucent(fill) : false;
  return {
    shadowColor: '#1E3C5A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: glass ? 0.1 : 0.08,
    shadowRadius: 14,
    elevation: 0,
  };
}
