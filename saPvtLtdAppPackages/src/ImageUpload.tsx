import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  /** App provides picker; called when user taps Add. Should return image URI(s). */
  onPick?: () => Promise<string[] | string | null | undefined>;
  disabled?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function ImageUpload({
  value,
  onChange,
  max = 5,
  onPick,
  disabled = false,
  label = 'Upload images',
  style,
  colors: colorsOverride,
}: ImageUploadProps) {
  const theme = useAppTheme(colorsOverride);
  const remaining = Math.max(0, max - value.length);

  const handleAdd = async () => {
    if (!onPick || disabled || remaining <= 0) return;
    const picked = await onPick();
    if (!picked) return;
    const urls = Array.isArray(picked) ? picked : [picked];
    onChange([...value, ...urls.filter(Boolean)].slice(0, max));
  };

  return (
    <View style={style}>
      {label ? (
        <Text style={[styles.label, {color: theme.textSecondary}]}>{label}</Text>
      ) : null}
      <View style={styles.grid}>
        {value.map((src, i) => (
          <View key={`${i}-${src.slice(0, 24)}`} style={styles.thumb}>
            <Image source={{uri: src}} style={styles.img} />
            {!disabled ? (
              <Pressable
                style={styles.remove}
                onPress={() => onChange(value.filter((_, idx) => idx !== i))}>
                <Text style={{color: '#fff', fontWeight: '700'}}>×</Text>
              </Pressable>
            ) : null}
          </View>
        ))}
        {remaining > 0 && !disabled ? (
          <Pressable
            onPress={() => void handleAdd()}
            style={[styles.add, {borderColor: theme.border}]}>
            <Text style={{color: theme.primary, fontSize: 28}}>+</Text>
            <Text style={{color: theme.primary, fontSize: 11, fontWeight: '600'}}>
              Add ({value.length}/{max})
            </Text>
          </Pressable>
        ) : null}
      </View>
      {!onPick && !disabled ? (
        <Text style={{color: theme.textSecondary, fontSize: 12, marginTop: 8}}>
          Pass `onPick` to open the device image picker.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {fontSize: 12, fontWeight: '600', marginBottom: 8},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  thumb: {
    width: 88,
    height: 88,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {width: '100%', height: '100%'},
  remove: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    width: 88,
    height: 88,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
});
