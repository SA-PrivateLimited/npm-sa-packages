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

          {message ? (
            <View style={styles.contentContainer}>
              <Text style={[styles.messageText, {color: theme.textSecondary}]}>
                {message}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, {backgroundColor: accent}]}
            onPress={onClose}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={buttonText}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const {width} = Dimensions.get('window');
const modalWidth = Math.min(width * 0.86, 360);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    width: modalWidth,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconGlyph: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  contentContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    width: '100%',
    minHeight: 44,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default AlertModal;
