import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';
import {Button} from './Button';

export interface DocumentViewerProps {
  src: string;
  title?: string;
  type?: 'image' | 'pdf' | 'auto';
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

function guessType(
  src: string,
  type: DocumentViewerProps['type'],
): 'image' | 'pdf' | 'other' {
  if (type === 'image' || type === 'pdf') return type;
  const lower = src.toLowerCase().split('?')[0];
  if (/\.(png|jpe?g|gif|webp|bmp)$/.test(lower) || lower.startsWith('data:image')) {
    return 'image';
  }
  if (/\.pdf$/.test(lower) || lower.startsWith('data:application/pdf')) return 'pdf';
  return 'other';
}

export function DocumentViewer({
  src,
  title,
  type = 'auto',
  style,
  colors: colorsOverride,
}: DocumentViewerProps) {
  const theme = useAppTheme(colorsOverride);
  const kind = guessType(src, type);

  return (
    <View style={style}>
      {title ? (
        <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
      ) : null}
      {kind === 'image' ? (
        <Image source={{uri: src}} style={styles.image} resizeMode="contain" />
      ) : (
        <View
          style={[
            styles.fallback,
            {borderColor: theme.border, backgroundColor: theme.card},
          ]}>
          <Text style={{color: theme.textSecondary, textAlign: 'center'}}>
            {kind === 'pdf'
              ? 'PDF preview opens externally on mobile.'
              : 'Preview not available for this file type.'}
          </Text>
          <Button
            variant="secondary"
            title="Open document"
            onPress={() => void Linking.openURL(src)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 15, fontWeight: '700', marginBottom: 10},
  image: {
    width: '100%',
    minHeight: 240,
    borderRadius: 10,
    backgroundColor: '#EDF2F7',
  },
  fallback: {
    padding: 24,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
});
