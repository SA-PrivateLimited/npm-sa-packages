import type {CSSProperties} from 'react';

export type StatusChipTone =
  | 'pending'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

const DEFAULT_MAP: Record<string, StatusChipTone> = {
  pending: 'pending',
  requested: 'pending',
  open: 'pending',
  active: 'active',
  in_progress: 'active',
  assigned: 'active',
  accepted: 'active',
  completed: 'completed',
  done: 'completed',
  cancelled: 'cancelled',
  canceled: 'cancelled',
  rejected: 'error',
  failed: 'error',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

export interface StatusChipProps {
  status: string;
  label?: string;
  colorMap?: Record<string, StatusChipTone | string>;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

function resolveTone(
  status: string,
  colorMap?: Record<string, StatusChipTone | string>,
): {tone: string; customColor?: string} {
  // Normalize spaces and hyphens so "in-progress" matches "in_progress".
  const key = status.toLowerCase().trim().replace(/[\s-]+/g, '_');
  const mapped = colorMap?.[key] ?? colorMap?.[status] ?? DEFAULT_MAP[key];
  if (!mapped) return {tone: 'neutral'};
  if (
    mapped === 'pending' ||
    mapped === 'active' ||
    mapped === 'completed' ||
    mapped === 'cancelled' ||
    mapped === 'success' ||
    mapped === 'warning' ||
    mapped === 'error' ||
    mapped === 'info' ||
    mapped === 'neutral'
  ) {
    return {tone: mapped};
  }
  return {tone: 'custom', customColor: mapped};
}

export function StatusChip({
  status,
  label,
  colorMap,
  className = '',
  style,
  testId = 'hs-status-chip',
}: StatusChipProps) {
  const {tone, customColor} = resolveTone(status, colorMap);
  const text =
    label ||
    status
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={`hs-status-chip hs-status-chip--${tone} ${className}`.trim()}
      style={
        customColor
          ? {
              ...style,
              background: `color-mix(in srgb, ${customColor} 16%, white)`,
              color: customColor,
              borderColor: `color-mix(in srgb, ${customColor} 40%, white)`,
            }
          : style
      }
      data-testid={testId}>
      {text}
    </span>
  );
}
