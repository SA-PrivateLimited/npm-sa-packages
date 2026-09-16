/** Geometry for the sliding glass pill on the floating tab bar (RN GlassTabBar parity). */
export interface GlassTabMetrics {
    tabW: number;
    pillW: number;
    maxX: number;
}
export declare function glassTabMetrics(barW: number, tabCount: number): GlassTabMetrics;
export declare function glassPillXForIndex(index: number, tabW: number, pillW: number, maxX: number): number;
export declare function glassPillIndexForX(x: number, pillW: number, tabW: number, tabCount: number): number;
export declare function clampGlassPillX(x: number, maxX: number): number;
//# sourceMappingURL=glassTabMetrics.d.ts.map