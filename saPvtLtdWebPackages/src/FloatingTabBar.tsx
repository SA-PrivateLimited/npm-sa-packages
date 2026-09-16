import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  clampGlassPillX,
  glassPillIndexForX,
  glassPillXForIndex,
  glassTabMetrics,
} from './glassTabMetrics.js';

const DRAG_THRESHOLD_PX = 6;
const CLICK_SUPPRESS_MS = 320;

export interface GlassTabBarProps {
  activeIndex: number;
  tabCount: number;
  onSelect: (index: number) => void;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  children: ReactNode;
}

/**
 * Floating tab bar with a glass pill that can be dragged freely.
 * On release the pill snaps to the nearest tab and `onSelect` opens that page.
 */
export function GlassTabBar({
  activeIndex,
  tabCount,
  onSelect,
  className = '',
  style,
  'aria-label': ariaLabel,
  children,
}: GlassTabBarProps) {
  const barRef = useRef<HTMLElement>(null);
  const [barW, setBarW] = useState(0);
  const [pillX, setPillX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const pillXRef = useRef(0);
  const onSelectRef = useRef(onSelect);
  const metricsRef = useRef({
    ...glassTabMetrics(0, tabCount),
    tabCount,
  });
  const suppressClickRef = useRef(false);

  onSelectRef.current = onSelect;
  metricsRef.current = {...glassTabMetrics(barW, tabCount), tabCount};
  pillXRef.current = pillX;

  useLayoutEffect(() => {
    const {tabW, pillW, maxX} = glassTabMetrics(barW, tabCount);
    if (draggingRef.current) return;
    setPillX(glassPillXForIndex(activeIndex, tabW, pillW, maxX));
  }, [activeIndex, tabCount, barW]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || typeof ResizeObserver === 'undefined') return;
    const sync = () => setBarW(bar.getBoundingClientRect().width);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = useCallback((event: PointerEvent) => {
    if (event.button !== 0) return;
    const bar = barRef.current;
    if (!bar) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = pillXRef.current;
    let didDrag = false;

    const onMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (!didDrag) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX || Math.abs(dx) <= Math.abs(dy)) {
          return;
        }
        didDrag = true;
        draggingRef.current = true;
        suppressClickRef.current = true;
        setDragging(true);
        try {
          bar.setPointerCapture(moveEvent.pointerId);
        } catch {
          /* capture is optional */
        }
      }
      moveEvent.preventDefault();
      const {maxX} = metricsRef.current;
      setPillX(clampGlassPillX(origin + dx, maxX));
    };

    const finish = (endEvent: PointerEvent) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      if (!didDrag) return;
      const {tabW, pillW, maxX, tabCount: count} = metricsRef.current;
      const released = clampGlassPillX(
        origin + (endEvent.clientX - startX),
        maxX,
      );
      const index = glassPillIndexForX(released, pillW, tabW, count);
      const snapped = glassPillXForIndex(index, tabW, pillW, maxX);
      draggingRef.current = false;
      setPillX(snapped);
      setDragging(false);
      onSelectRef.current(index);
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, CLICK_SUPPRESS_MS);
    };

    window.addEventListener('pointermove', onMove, {passive: false});
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClickRef.current) return;
      event.preventDefault();
      event.stopPropagation();
    };
    bar.addEventListener('pointerdown', onPointerDown);
    bar.addEventListener('click', onClickCapture, true);
    return () => {
      bar.removeEventListener('pointerdown', onPointerDown);
      bar.removeEventListener('click', onClickCapture, true);
    };
  }, [onPointerDown]);

  const {pillW} = metricsRef.current;
  const pillStyle: CSSProperties = {
    width: pillW > 0 ? pillW : undefined,
    transform: `translate3d(${pillX}px, 0, 0)`,
    transition: dragging ? 'none' : undefined,
  };
  const classes = dragging ? `${className} is-dragging`.trim() : className;

  return (
    <nav
      ref={barRef}
      className={classes}
      style={
        {
          ...style,
          '--tab-count': tabCount,
        } as CSSProperties
      }
      aria-label={ariaLabel}>
      <span className="tab-pill" style={pillStyle} aria-hidden="true" />
      {children}
    </nav>
  );
}
