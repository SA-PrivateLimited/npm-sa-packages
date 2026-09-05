import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppTheme} from './theme';
import {Icon} from './Icon';

export interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  label?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  testID?: string;
}

export function ImageViewer({
  images,
  initialIndex = 0,
  open,
  onClose,
  label = 'Photos',
  closeLabel = 'Close',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  testID = 'hs-image-viewer',
}: ImageViewerProps) {
  const theme = useAppTheme();
  const [index, setIndex] = useState(initialIndex);
  const src = images[Math.min(Math.max(0, index), Math.max(0, images.length - 1))];

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay} testID={testID}>
        <Text style={styles.title}>{label}</Text>
        {src ? (
          <Image source={{uri: src}} style={styles.img} resizeMode="contain" />
        ) : null}
        <View style={styles.row}>
          <Pressable
            accessibilityLabel={prevLabel}
            onPress={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index <= 0}>
            <Icon name="chevron_left" size={32} color="#fff" />
          </Pressable>
          <Pressable accessibilityLabel={closeLabel} onPress={onClose}>
            <Text style={[styles.close, {color: theme.primary}]}>{closeLabel}</Text>
          </Pressable>
          <Pressable
            accessibilityLabel={nextLabel}
            onPress={() => setIndex(i => Math.min(images.length - 1, i + 1))}
            disabled={index >= images.length - 1}>
            <Icon name="chevron_right" size={32} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    padding: 16,
  },
  title: {color: '#fff', textAlign: 'center', marginBottom: 12, fontSize: 16},
  img: {width: '100%', height: '70%'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  close: {fontSize: 16, fontWeight: '700'},
});
