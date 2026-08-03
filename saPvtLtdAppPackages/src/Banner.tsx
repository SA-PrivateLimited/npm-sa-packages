import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

export type BannerVariant = 'success' | 'error' | 'info' | 'warning';

export interface BannerProps {
  title: string;
  detail?: string;
  meta?: string;
  variant?: BannerVariant;
  onDismiss?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  detailStyle?: TextStyle;
}

const VARIANT_COLORS: Record<
  BannerVariant,
  {bg: string; border: string; accent: string}
> = {
  success: {bg: '#EBF8F0', border: '#9AE6B4', accent: '#38A169'},
  error: {bg: '#FFF5F5', border: '#FEB2B2', accent: '#E53E3E'},
  info: {bg: '#EBF8FF', border: '#90CDF4', accent: '#3182CE'},
  warning: {bg: '#FFFAF0', border: '#FBD38D', accent: '#DD6B20'},
};

export function Banner({
  title,
  detail,
  meta,
  variant = 'success',
  onDismiss,
  style,
  titleStyle,
  detailStyle,
}: BannerProps) {
  const colors = VARIANT_COLORS[variant];
  return (
    <View
      style={[
        styles.banner,
        {backgroundColor: colors.bg, borderColor: colors.border},
        style,
      ]}>
      <View style={styles.body}>
        <Text style={[styles.title, {color: colors.accent}, titleStyle]}>
          {title}
        </Text>
        {detail ? (
          <Text style={[styles.detail, detailStyle]}>{detail}</Text>
        ) : null}
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      {onDismiss ? (
        <TouchableOpacity
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Text style={styles.dismiss}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  body: {flex: 1},
  title: {fontSize: 14, fontWeight: '700', marginBottom: 4},
  detail: {fontSize: 13, lineHeight: 18, color: '#2D3748'},
  meta: {marginTop: 6, fontSize: 13, fontWeight: '600', color: '#1A202C'},
  dismiss: {fontSize: 16, color: '#718096', paddingHorizontal: 4},
});
