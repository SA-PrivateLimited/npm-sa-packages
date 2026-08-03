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

export type ConfirmationModalType = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: ConfirmationModalType;
  iconGlyph?: string;
  colors?: Partial<AppThemeColors>;
}

const TYPE_GLYPH: Record<ConfirmationModalType, string> = {
  danger: '!',
  warning: '!',
  success: '✓',
  info: 'i',
};

export function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'info',
  iconGlyph,
  colors: colorsOverride,
}: ConfirmationModalProps) {
  const theme = useAppTheme(colorsOverride);

  const accent =
    type === 'danger'
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
      onRequestClose={onCancel}>
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.cancelButton,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.background,
                },
              ]}
              onPress={onCancel}
              activeOpacity={0.7}>
              <Text style={[styles.cancelButtonText, {color: theme.text}]}>
                {cancelText.toUpperCase()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, {backgroundColor: accent}]}
              onPress={onConfirm}
              activeOpacity={0.8}>
              <Text style={styles.confirmButtonText}>
                {confirmText.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
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
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconGlyph: {
    fontSize: 28,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ConfirmationModal;
