import {useEffect, type ReactNode} from 'react';
import {OverlayPortal} from './OverlayPortal.js';
import {
  lockBodyScroll,
  useNarrowOverlay,
  useVisualViewportBox,
  viewportBoxStyle,
} from './overlay.js';

export function useDropdownOverlay(open: boolean) {
  const mobile = useNarrowOverlay();
  const box = useVisualViewportBox(open && mobile);

  useEffect(() => {
    if (!open || !mobile) return;
    return lockBodyScroll();
  }, [open, mobile]);

  return {mobile, box};
}

export function DropdownOverlay({
  open,
  mobile,
  box,
  onClose,
  children,
}: {
  open: boolean;
  mobile: boolean;
  box: ReturnType<typeof useVisualViewportBox>;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  // On desktop render children only — no backdrop needed (dropdown closes on outside click via its own listener)
  if (!mobile) return <>{children}</>;

  const panel = (
    <>
      <div className="hs-dd__backdrop" onClick={onClose} aria-hidden />
      {children}
    </>
  );

  return (
    <OverlayPortal>
      <div
        className="hs-dd-overlay"
        role="presentation"
        style={viewportBoxStyle(box)}>
        {panel}
      </div>
    </OverlayPortal>
  );
}
