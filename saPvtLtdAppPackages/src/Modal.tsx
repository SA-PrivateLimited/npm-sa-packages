import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function Modal({
  open,
  onClose,
  children,
  style,
  colors: colorsOverride,
}: ModalProps) {
  const theme = useAppTheme(colorsOverride);

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.card, {backgroundColor: theme.card}, style]}
          onPress={e => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showClose?: boolean;
  colors?: Partial<AppThemeColors>;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  showClose = true,
  colors: colorsOverride,
}: DialogProps) {
  const theme = useAppTheme(colorsOverride);

  return (
    <Modal open={open} onClose={onClose} colors={colorsOverride}>
      <View>
        {(title || showClose) && (
          <View style={styles.header}>
            <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
            {showClose ? (
              <Pressable onPress={onClose} hitSlop={10}>
                <Text style={{color: theme.textSecondary, fontSize: 22}}>×</Text>
              </Pressable>
            ) : null}
          </View>
        )}
        <View style={styles.body}>{children}</View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    padding: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
});
