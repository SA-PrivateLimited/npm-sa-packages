import React from 'react';
import {Text, type StyleProp, type TextStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {HS} from './tokens';

export type IconName = string;

export interface IconProps {
  name: IconName;
  label?: string;
  filled?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  size?: number | string;
  color?: string;
  style?: StyleProp<TextStyle>;
  colors?: Partial<AppThemeColors>;
}

const ALIAS: Record<string, string> = {
  progress_activity: 'sync',
  filter_alt: 'filter-list',
  notifications_off: 'notifications-off',
  expand_more: 'expand-more',
  expand_less: 'expand-less',
  chevron_right: 'chevron-right',
  chevron_left: 'chevron-left',
  visibility_off: 'visibility-off',
  more_vert: 'more-vert',
  check_circle: 'check-circle',
  filter_list: 'filter-list',
};

function materialName(name: string): string {
  if (ALIAS[name]) return ALIAS[name];
  return name.replace(/_/g, '-');
}

let MaterialIcons: React.ComponentType<{
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}> | null = null;
try {
  MaterialIcons = require('react-native-vector-icons/MaterialIcons').default;
} catch {
  MaterialIcons = null;
}

/** Same names as web Material Symbols Outlined; rendered with MaterialIcons. */
export function Icon({
  name,
  label,
  size = 20,
  color,
  style,
  colors: colorsOverride,
}: IconProps) {
  const theme = useAppTheme(colorsOverride);
  const px = typeof size === 'number' ? size : parseInt(String(size), 10) || 20;
  const tint = color || theme.text || HS.text;
  const glyph = materialName(String(name));
  if (MaterialIcons) {
    return (
      <MaterialIcons
        name={glyph}
        size={px}
        color={tint}
        style={style}
        {...(label ? {accessibilityLabel: label} : {accessible: false})}
      />
    );
  }
  return (
    <Text
      accessibilityLabel={label}
      style={[{fontSize: px, color: tint, lineHeight: px + 4}, style]}>
      {String(name).slice(0, 1)}
    </Text>
  );
}
