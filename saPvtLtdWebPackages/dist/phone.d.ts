/**
 * Canonical phone helpers (India-first, +91).
 */
export declare function digitsOnly(value?: string | null): string;
export declare function localTenDigits(value?: string | null): string;
export declare function toE164(value?: string | null, defaultCc?: string): string;
export declare function formatPhoneDisplay(...candidates: Array<string | null | undefined>): string;
export declare const INDIA_DIAL_CODE = "+91";
//# sourceMappingURL=phone.d.ts.map