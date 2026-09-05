import type {TextStyle, ViewStyle} from 'react-native';
import type {AppThemeColors} from './theme';

/** Customer web `global.css` :root + AppShell tabbar / main padding. */
export const CUSTOMER_WEB = {
  background: '#F8FAFC',
  /** Web `--crystal-bg` (near-solid glass; RN has no CSS backdrop-filter). */
  card: 'rgba(255,255,255,0.82)',
  text: '#1A202C',
  textSecondary: '#718096',
  primary: '#3182CE',
  primaryDark: '#2C5282',
  secondary: '#38B2AC',
  border: '#E2E8F0',
  error: '#E53E3E',
  success: '#38A169',
  warning: '#DD6B20',
  tabBar: 'rgba(255,255,255,0.92)',
  placeholder: '#A0AEC0',
  star: '#FFD700',
  radius: 16,
  radiusSm: 12,
  radiusCard: 22,
  radiusButton: 14,
  radiusInput: 16,
  controlH: 40,
  controlHLg: 48,
  controlPx: 14,
  controlPy: 8,
  tabBarH: 56,
  tabBarPadTop: 4,
  tabLabelSize: 11,
  tabLabelWeight: '600' as const,
  tabIcon: 24,
  tabItemGap: 2,
  tabItemPadV: 4,
  tabItemPadH: 2,
  pagePadX: 14,
  pagePadTopExtra: 12,
  pagePadBottomExtra: 14,
  headerH: 56,
  headerTitleSize: 17,
  headerPadX: 16,
  crystalRadiusSm: 16,
  pcardRadius: 18,
  border50: 'rgba(226, 232, 240, 0.5)',
  border55: 'rgba(226, 232, 240, 0.55)',
  highlightInset: 'rgba(255, 255, 255, 0.65)',
  tabShadow: 'rgba(30, 60, 90, 0.04)',
};

/** Partner web `global.css` :root + AppShell tabbar. */
export const PROVIDER_WEB = {
  background: '#F5F7FA',
  card: 'rgba(255,255,255,0.82)',
  text: '#1A202C',
  textSecondary: '#718096',
  primary: '#34C759',
  primaryDark: '#28A745',
  secondary: '#007AFF',
  border: '#E2E8F0',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  tabBar: 'rgba(255,255,255,0.92)',
  placeholder: '#A0AEC0',
  radius: 12,
  radiusSm: 8,
  radiusCard: 12,
  hsRadius: 10,
  controlH: 36,
  controlHLg: 44,
  controlPx: 12,
  controlPy: 6,
  tabBarH: 60,
  tabBarPadTop: 8,
  tabLabelSize: 11,
  tabLabelWeight: '500' as const,
  tabInactive: '#8E8E93',
  tabIcon: 24,
  pagePadX: 14,
  headerH: 56,
  headerTitleSize: 17,
  headerPadX: 16,
  border50: 'rgba(226, 232, 240, 0.5)',
  highlightInset: 'rgba(255, 255, 255, 0.65)',
  tabShadow: 'rgba(30, 60, 90, 0.04)',
};

export function customerAppThemeColors(
  overrides: Partial<AppThemeColors> = {},
): AppThemeColors {
  return {
    primary: CUSTOMER_WEB.primary,
    background: CUSTOMER_WEB.background,
    card: CUSTOMER_WEB.card,
    text: CUSTOMER_WEB.text,
    textSecondary: CUSTOMER_WEB.textSecondary,
    border: CUSTOMER_WEB.border,
    danger: CUSTOMER_WEB.error,
    success: CUSTOMER_WEB.success,
    warning: CUSTOMER_WEB.warning,
    controlH: CUSTOMER_WEB.controlH,
    controlHLg: CUSTOMER_WEB.controlHLg,
    controlPx: CUSTOMER_WEB.controlPx,
    radiusSm: CUSTOMER_WEB.radiusSm,
    radius: CUSTOMER_WEB.radius,
    radiusCard: CUSTOMER_WEB.radiusCard,
    ...overrides,
  };
}

export function providerAppThemeColors(
  overrides: Partial<AppThemeColors> = {},
): AppThemeColors {
  return {
    primary: PROVIDER_WEB.primary,
    background: PROVIDER_WEB.background,
    card: PROVIDER_WEB.card,
    text: PROVIDER_WEB.text,
    textSecondary: PROVIDER_WEB.textSecondary,
    border: PROVIDER_WEB.border,
    danger: PROVIDER_WEB.error,
    success: PROVIDER_WEB.success,
    warning: PROVIDER_WEB.warning,
    controlH: PROVIDER_WEB.controlH,
    controlHLg: PROVIDER_WEB.controlHLg,
    controlPx: PROVIDER_WEB.controlPx,
    radiusSm: PROVIDER_WEB.radiusSm,
    radius: PROVIDER_WEB.hsRadius,
    radiusCard: PROVIDER_WEB.radiusCard,
    ...overrides,
  };
}

export function webTabBarStyle(opts: {
  height: number;
  padTop: number;
  safeBottom: number;
  borderTopColor: string;
}): ViewStyle {
  return {
    height: opts.height + opts.safeBottom,
    paddingTop: opts.padTop,
    paddingBottom: opts.safeBottom,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopWidth: 1,
    borderTopColor: opts.borderTopColor,
    borderWidth: 0,
    elevation: 8,
    shadowColor: '#1E3C5A',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.04,
    shadowRadius: 12,
  };
}

export function webTabLabelStyle(size: number, weight: '500' | '600'): TextStyle {
  return {
    fontSize: size,
    fontWeight: weight,
    lineHeight: size * 1.15,
  };
}
