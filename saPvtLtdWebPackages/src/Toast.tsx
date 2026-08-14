import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {Icon} from './Icon.js';

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

export function ToastProvider({children}: {children: ReactNode}) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 3500) => {
      const id = makeId();
      setItems((prev) => [...prev, {id, message, variant, duration}]);
      if (duration > 0) {
        window.setTimeout(() => remove(id), duration);
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
      <div className="hs-toast-stack" aria-live="polite" aria-relevant="additions">
        {items.map((t) => (
          <div
            key={t.id}
            className={`hs-toast hs-toast--${t.variant}`}
            role="status">
            <span className="hs-toast__msg">{t.message}</span>
            <button
              type="button"
              className="hs-toast__close"
              aria-label="Dismiss"
              onClick={() => remove(t.id)}>
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

/** Imperative helper — works after ToastProvider mounts. */
export const toast: ToastApi = {
  show: (m, v, d) => imperativeApi?.show(m, v, d),
  success: (m, d) => imperativeApi?.success(m, d),
  error: (m, d) => imperativeApi?.error(m, d),
  info: (m, d) => imperativeApi?.info(m, d),
  warning: (m, d) => imperativeApi?.warning(m, d),
};
