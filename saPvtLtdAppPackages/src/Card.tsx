import React, {type ReactNode} from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {HS, metricsFromTheme} from './tokens';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: ReactNode;
  padding?: CardPadding;
  interactive?: boolean;
  bordered?: boolean;
  onPress?: () => void;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
  testID?: string;
}

const PAD: Record<CardPadding, number> = {
  none: 0,
  sm: 12,
  md: 16,
  lg: 20,
};

export function Card({
  children,
  padding = 'md',
  interactive = false,
  bordered = true,
  onPress,
  onClick,
  style,
  colors: colorsOverride,
  testID = 'hs-card',
}: CardProps) {
  const theme = useAppTheme(colorsOverride);
  const metrics = metricsFromTheme(theme);
  const press = onPress || onClick;
  const box = [
    styles.card,
    {
      backgroundColor: theme.card || HS.surface,
      borderColor: bordered ? theme.border || HS.border : 'transparent',
      borderWidth: bordered ? 1 : 0,
      borderRadius: metrics.radiusCard,
      padding: PAD[padding],
      marginBottom: 12,
    },
    style,
  ];
  if (press || interactive) {
    return (
      <Pressable testID={testID} onPress={press} style={box}>
        {children}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={box}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: HS.radiusCard,
    shadowColor: '#1E3C5A',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 3,
  },
});
