import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useAppTheme, type AppThemeColors} from './theme';

export type DrawerSide = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showClose?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<AppThemeColors>;
}

export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  showClose = true,
  style,
  colors: colorsOverride,
}: DrawerProps) {
  const theme = useAppTheme(colorsOverride);

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[
            styles.panel,
            side === 'bottom' && styles.bottom,
            side === 'left' && styles.left,
            side === 'right' && styles.right,
            {backgroundColor: theme.card},
            style,
          ]}
          onPress={e => e.stopPropagation()}>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  panel: {
    maxHeight: '92%',
    paddingBottom: 16,
  },
  right: {
    marginLeft: 'auto',
    width: '88%',
    height: '100%',
    maxHeight: '100%',
  },
  left: {
    marginRight: 'auto',
    width: '88%',
    height: '100%',
    maxHeight: '100%',
  },
  bottom: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {flex: 1, fontSize: 18, fontWeight: '700'},
  body: {padding: 16},
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
  },
});
