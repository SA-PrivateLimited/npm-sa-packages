import React, {createContext, useContext, useMemo} from 'react';

export interface AppThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  danger?: string;
  success?: string;
  warning?: string;
  controlH?: number;
  controlHLg?: number;
  controlPx?: number;
  radiusSm?: number;
  radius?: number;
  radiusCard?: number;
}

export const DEFAULT_APP_THEME: AppThemeColors = {
  primary: '#3182CE',
  background: '#F7FAFC',
  card: 'rgba(255,255,255,0.82)',
  text: '#1A202C',
  textSecondary: '#718096',
  border: '#E2E8F0',
  danger: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
};

const AppThemeContext = createContext<AppThemeColors>(DEFAULT_APP_THEME);

export interface AppThemeProviderProps {
  colors?: Partial<AppThemeColors>;
  children: React.ReactNode;
}

export function AppThemeProvider({colors, children}: AppThemeProviderProps) {
  const value = useMemo(
    () => ({...DEFAULT_APP_THEME, ...colors}),
    [colors],
  );
  return (
    <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>
  );
}

export function useAppTheme(override?: Partial<AppThemeColors>): AppThemeColors {
  const ctx = useContext(AppThemeContext);
  return useMemo(
    () => (override ? {...ctx, ...override} : ctx),
    [ctx, override],
  );
}
