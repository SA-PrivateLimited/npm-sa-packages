import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type ImageStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | number;

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  colors?: Partial<AppThemeColors>;
}

function initials(name?: string): string {
  if (!name?.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
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
  size = 'md',
  style,
  imageStyle,
  colors: colorsOverride,
}: AvatarProps) {
  const theme = useAppTheme(colorsOverride);
  const [failed, setFailed] = useState(false);
  const px = sizePx(size);

  if (src && !failed) {
    return (
      <Image
        source={{uri: src}}
        onError={() => setFailed(true)}
        style={[
          styles.image,
          {width: px, height: px, borderRadius: px / 2},
          imageStyle,
          style as ImageStyle,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: px,
          height: px,
          borderRadius: px / 2,
          backgroundColor: theme.primary,
        },
        style,
      ]}>
      <Text style={[styles.initials, {fontSize: Math.round(px * 0.38)}]}>
        {initials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#E2E8F0',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#fff',
    fontWeight: '700',
  },
});
