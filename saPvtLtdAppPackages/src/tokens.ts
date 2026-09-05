import type {AppThemeColors} from './theme';

/** Mirrors packages/saPvtLtdWebPackages/src/styles.css :root (package defaults). */

export const HS = {
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 24,
  space6: 32,
  controlH: 36,
  controlHLg: 44,
  controlPx: 12,
  radiusSm: 8,
  radius: 10,
  radiusCard: 12,
  primary: '#3182CE',
  success: '#38A169',
  error: '#E53E3E',
  warning: '#DD6B20',
  text: '#1A202C',
  textSecondary: '#718096',
  border: '#E2E8F0',
  surface: 'rgba(255,255,255,0.82)',
  mixPrimary12: '#E8F2FB',
  mixPrimary28: '#B6D4F1',
  mixSuccess12: '#E8F6EE',
  mixSuccess28: '#B7E0C8',
  mixWarning12: '#FBF0E6',
  mixWarning28: '#F0C9A8',
  mixError12: '#FBEAEA',
  mixError28: '#F3B6B6',
  mixPending14: '#F8EEE6',
  mixPending35: '#F0C9A8',
  mixActive14: '#E6F1FA',
  mixActive35: '#B6D4F1',
  mixOk14: '#E6F4EC',
  mixOk35: '#B7E0C8',
  mixErr14: '#F9E6E6',
  mixErr35: '#F3B6B6',
  mixWarn14: '#F8EEE6',
  mixWarn35: '#F0C9A8',
  statusPendingFg: '#C05621',
  statusNeutralBg: '#EDF2F7',
  statusNeutralFg: '#4A5568',
};

export function metricsFromTheme(theme: AppThemeColors) {
  return {
    controlH: theme.controlH ?? HS.controlH,
    controlHLg: theme.controlHLg ?? HS.controlHLg,
    controlPx: theme.controlPx ?? HS.controlPx,
    radiusSm: theme.radiusSm ?? HS.radiusSm,
    radius: theme.radius ?? HS.radius,
    radiusCard: theme.radiusCard ?? HS.radiusCard,
  };
}
