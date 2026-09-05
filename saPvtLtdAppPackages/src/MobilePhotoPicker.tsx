import React from 'react';
import {View, Text, StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import {Button} from './Button';
import {Icon} from './Icon';
import {useAppTheme, type AppThemeColors} from './theme';

export interface MobilePhotoPickerProps {
  /** Native: return image URI(s). Web used File[]; apps pass URIs. */
  onChange: (uris: string[]) => void;
  onPickCamera?: () => Promise<string[] | string | null | undefined>;
  onPickGallery?: () => Promise<string[] | string | null | undefined>;
  multiple?: boolean;
  disabled?: boolean;
  cameraLabel?: string;
  galleryLabel?: string;
  layout?: 'inline' | 'stack' | 'quiet';
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
  testID?: string;
}

function asList(picked: string[] | string | null | undefined): string[] {
  if (!picked) return [];
  return (Array.isArray(picked) ? picked : [picked]).filter(Boolean);
}

export function MobilePhotoPicker({
  onChange,
  onPickCamera,
  onPickGallery,
  disabled = false,
  cameraLabel = 'Take photo',
  galleryLabel = 'Choose from gallery',
  layout = 'inline',
  style,
  colors: colorsOverride,
  testID = 'hs-mobile-photo-picker',
}: MobilePhotoPickerProps) {
  const theme = useAppTheme(colorsOverride);
  const stack = layout === 'stack';

  const run = async (
    pick?: () => Promise<string[] | string | null | undefined>,
  ) => {
    if (!pick || disabled) return;
    onChange(asList(await pick()));
  };

  const labelWithIcon = (icon: string, label: string) => (
    <View style={styles.labelRow}>
      <Icon name={icon} size={16} color={theme.text || '#0F1C2E'} />
      <Text style={[styles.labelText, {color: theme.text || '#0F1C2E'}]}>
        {label}
      </Text>
    </View>
  );

  return (
    <View
      testID={testID}
      style={[
        stack ? styles.stack : styles.row,
        {opacity: disabled ? 0.5 : 1},
        style,
      ]}>
      <Button
        variant="secondary"
        size="sm"
        block={stack}
        disabled={disabled || !onPickCamera}
        onPress={() => void run(onPickCamera)}
        colors={theme}
        style={stack ? styles.stackBtn : styles.inlineBtn}>
        {labelWithIcon('photo_camera', cameraLabel)}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        block={stack}
        disabled={disabled || !onPickGallery}
        onPress={() => void run(onPickGallery)}
        colors={theme}
        style={stack ? styles.stackBtn : styles.inlineBtn}>
        {labelWithIcon('photo_library', galleryLabel)}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    width: '100%',
    alignItems: 'center',
  },
  stack: {gap: 8, width: '100%', alignSelf: 'stretch'},
  stackBtn: {width: '100%', alignSelf: 'stretch'},
  inlineBtn: {
    flex: 1,
    minWidth: 0,
    alignSelf: 'stretch',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  labelText: {fontSize: 12, fontWeight: '600'},
});
