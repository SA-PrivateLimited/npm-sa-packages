import React, {type ReactNode} from 'react';
import {View, Text, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {HS} from './tokens';

export interface WidgetProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
  testID?: string;
}

export function Widget({
  title,
  subtitle,
  actions,
  children,
  footer,
  compact = false,
  style,
  colors: colorsOverride,
  testID = 'hs-widget',
}: WidgetProps) {
  const theme = useAppTheme(colorsOverride);
  const pad = compact ? 12 : 16;
  const hasHeader = Boolean(title || subtitle || actions);
  return (
    <View
      testID={testID}
      style={[
        styles.shell,
        {
          backgroundColor: theme.card || HS.surface,
          borderColor: theme.border || HS.border,
        },
        style,
      ]}>
      {hasHeader ? (
        <View style={[styles.header, {paddingHorizontal: pad, paddingTop: pad}]}>
          <View style={styles.titles}>
            {title ? (
              typeof title === 'string' ? (
                <Text style={[styles.title, {color: theme.text || HS.text}]}>
                  {title}
                </Text>
              ) : (
                title
              )
            ) : null}
            {subtitle ? (
              typeof subtitle === 'string' ? (
                <Text
                  style={[styles.sub, {color: theme.textSecondary || HS.textSecondary}]}>
                  {subtitle}
                </Text>
              ) : (
                subtitle
              )
            ) : null}
          </View>
          {actions ? <View style={styles.actions}>{actions}</View> : null}
        </View>
      ) : null}
      <View style={{padding: pad}}>{children}</View>
      {footer ? (
        <View
          style={[
            styles.footer,
            {
              borderTopColor: theme.border || HS.border,
              paddingHorizontal: pad,
              paddingBottom: pad,
              paddingTop: compact ? 10 : 12,
            },
          ]}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: HS.radiusCard,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  titles: {flex: 1, minWidth: 0},
  title: {fontSize: 16, fontWeight: '700', lineHeight: 20},
  sub: {fontSize: 13, lineHeight: 18, marginTop: 4},
  actions: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8},
  footer: {borderTopWidth: 1},
});
