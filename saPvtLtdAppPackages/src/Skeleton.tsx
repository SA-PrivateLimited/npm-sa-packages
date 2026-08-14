import React from 'react';
import {View, StyleSheet, type StyleProp, type ViewStyle, type DimensionValue} from 'react-native';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'rect' | 'card';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: DimensionValue;
  height?: number;
  lines?: number;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  style,
}: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <View style={style}>
        {Array.from({length: lines}, (_, i) => (
          <View
            key={i}
            style={[
              styles.base,
              styles.text,
              {width: i === lines - 1 ? '70%' : width || '100%', height},
            ]}
          />
        ))}
      </View>
    );
  }

  const sizeStyle =
    variant === 'avatar'
      ? styles.avatar
      : variant === 'title'
        ? styles.title
        : variant === 'rect'
          ? styles.rect
          : variant === 'card'
            ? styles.card
            : styles.text;

  return (
    <View
      style={[
        styles.base,
        sizeStyle,
        width != null ? {width} : null,
        height != null ? {height} : null,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {height: 12, width: '100%'},
  title: {height: 20, width: '60%'},
  avatar: {width: 40, height: 40, borderRadius: 20},
  rect: {width: '100%', height: 120},
  card: {width: '100%', height: 160, borderRadius: 12},
});
