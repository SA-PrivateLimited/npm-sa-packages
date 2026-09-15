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
import {Icon} from './Icon';

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
  /** Single character (e.g. "!") or Material icon name (e.g. "refresh"). */
  iconGlyph?: string;
  colors?: Partial<AppThemeColors>;
}

const TYPE_GLYPH: Record<ConfirmationModalType, string> = {
  danger: '!',
  warning: '!',
  success: '✓',
  info: 'i',
};

const ICON_NAME_ALIASES: Record<string, string> = {
  refresh: 'refresh',
  'checkmark-circle': 'check-circle',
  checkmark_circle: 'check-circle',
  'check-circle': 'check-circle',
  'search-outline': 'search',
  search_outline: 'search',
  warning: 'warning',
  info: 'info',
};

/** Named Material icons are multi-char words; type glyphs are 1 char. */
function resolveIconName(raw?: string): string | null {
  const value = String(raw || '').trim();
  if (!value) return null;
  if (value.length <= 2) return null;
  const aliased =
    ICON_NAME_ALIASES[value] || ICON_NAME_ALIASES[value.toLowerCase()];
  if (aliased) return aliased;
  if (/^[a-zA-Z][a-zA-Z0-9_-]+$/.test(value)) {
    return value.replace(/_/g, '-');
  }
  return null;
}

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

  const iconName = resolveIconName(iconGlyph);
  const glyph = iconName ? null : iconGlyph || TYPE_GLYPH[type];

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
              {iconName ? (
                <Icon name={iconName} size={24} color={accent} />
              ) : (
                <Text style={[styles.iconGlyph, {color: accent}]}>{glyph}</Text>
              )}
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
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={cancelText}>
              <Text style={[styles.cancelButtonText, {color: theme.text}]}>
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, {backgroundColor: accent}]}
              onPress={onConfirm}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={confirmText}>
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    minHeight: 44,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    minHeight: 44,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ConfirmationModal;
