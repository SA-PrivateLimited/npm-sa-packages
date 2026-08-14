import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useAppTheme} from './theme';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

type ToastApi = {
  show: (message: string, variant?: ToastVariant, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastApi | null>(null);
let imperativeApi: ToastApi | null = null;

function makeId() {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ToastProvider({children}: {children: React.ReactNode}) {
  const theme = useAppTheme();
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(t => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 3500) => {
      const id = makeId();
      setItems(prev => [...prev, {id, message, variant, duration}]);
      if (duration > 0) {
        setTimeout(() => remove(id), duration);
      }
    },
    [remove],
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (m, d) => show(m, 'success', d),
      error: (m, d) => show(m, 'error', d),
      info: (m, d) => show(m, 'info', d),
      warning: (m, d) => show(m, 'warning', d),
    }),
    [show],
  );

  imperativeApi = api;

  return (
    <ToastContext.Provider value={api}>
      {children}
      <View pointerEvents="box-none" style={styles.stack}>
        {items.map(t => {
          const accent =
            t.variant === 'success'
              ? theme.success || '#34C759'
              : t.variant === 'error'
                ? theme.danger || '#FF3B30'
                : t.variant === 'warning'
                  ? theme.warning || '#FF9500'
                  : theme.primary;
          return (
            <View
              key={t.id}
              style={[
                styles.toast,
                {backgroundColor: theme.card, borderColor: accent},
              ]}>
              <Text style={[styles.msg, {color: theme.text}]}>{t.message}</Text>
              <Pressable onPress={() => remove(t.id)} hitSlop={8}>
                <Text style={{color: theme.textSecondary}}>×</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export const toast: ToastApi = {
  show: (m, v, d) => imperativeApi?.show(m, v, d),
  success: (m, d) => imperativeApi?.success(m, d),
  error: (m, d) => imperativeApi?.error(m, d),
  info: (m, d) => imperativeApi?.info(m, d),
  warning: (m, d) => imperativeApi?.warning(m, d),
};

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    gap: 8,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  msg: {flex: 1, fontSize: 14},
});
