/** Geometry for the sliding glass pill on the floating tab bar (RN GlassTabBar parity). */
const PILL_INSET = 4;
const MIN_PILL_W = 68;
export function glassTabMetrics(barW, tabCount) {
    const count = Math.max(0, tabCount);
    const tabW = count > 0 && barW > 0 ? barW / count : 0;
    const pillW = tabW > 0 ? Math.max(MIN_PILL_W, tabW - PILL_INSET * 2) : 0;
    const maxX = Math.max(0, barW - pillW);
    return { tabW, pillW, maxX };
}
export function glassPillXForIndex(index, tabW, pillW, maxX) {
    if (tabW <= 0)
        return 0;
    return Math.min(maxX, Math.max(0, index) * tabW + (tabW - pillW) / 2);
}
export function glassPillIndexForX(x, pillW, tabW, tabCount) {
    if (tabCount <= 0)
        return 0;
    const center = x + pillW / 2;
    return Math.max(0, Math.min(tabCount - 1, Math.floor(center / Math.max(tabW, 1))));
}
export function clampGlassPillX(x, maxX) {
    return Math.max(0, Math.min(maxX, x));
}
