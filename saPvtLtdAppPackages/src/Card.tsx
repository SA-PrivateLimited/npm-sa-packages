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
import {surfaceLiftStyle} from './cssColor';

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
  const fill = theme.card || HS.surface;
  const box = [
    styles.card,
    {
      backgroundColor: fill,
      borderColor: bordered ? fill : 'transparent',
      borderWidth: bordered ? 1 : 0,
      borderRadius: metrics.radiusCard,
      padding: PAD[padding],
      overflow: 'visible' as const,
      ...surfaceLiftStyle(fill),
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
    alignSelf: 'stretch',
    borderRadius: HS.radiusCard,
  },
});
