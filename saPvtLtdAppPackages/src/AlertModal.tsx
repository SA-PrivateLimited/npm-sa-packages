import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export type AlertModalType = 'success' | 'error' | 'info' | 'warning';

export interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
  type?: AlertModalType;
  /** Unicode / emoji glyph shown in the icon circle (avoids vector-icons peer) */
  iconGlyph?: string;
  colors?: Partial<AppThemeColors>;
}

const TYPE_GLYPH: Record<AlertModalType, string> = {
  error: '✕',
  warning: '!',
  success: '✓',
  info: 'i',
};

export function AlertModal({
  visible,
  title,
  message,
  buttonText = 'OK',
  onClose,
  type = 'info',
  iconGlyph,
  colors: colorsOverride,
}: AlertModalProps) {
  const theme = useAppTheme(colorsOverride);

  const accent =
    type === 'error'
      ? theme.danger || '#FF3B30'
      : type === 'warning'
        ? theme.warning || '#FF9500'
        : type === 'success'
          ? theme.success || '#34C759'
          : theme.primary;

  const glyph = iconGlyph || TYPE_GLYPH[type];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {backgroundColor: theme.card}]}>
          <View style={styles.headerContainer}>
            <View
              style={[styles.iconContainer, {backgroundColor: `${accent}18`}]}>
              <Text style={[styles.iconGlyph, {color: accent}]}>{glyph}</Text>
            </View>
            <Text style={[styles.headerTitle, {color: theme.text}]}>
              {title}
            </Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={[styles.messageText, {color: theme.textSecondary}]}>
              {message}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: accent}]}
            onPress={onClose}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>{buttonText.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const {width} = Dimensions.get('window');
const modalWidth = width * 0.85;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: modalWidth,
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconGlyph: {
    fontSize: 32,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  contentContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default AlertModal;
