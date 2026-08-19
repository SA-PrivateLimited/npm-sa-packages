import type { CSSProperties } from 'react';
export interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
    onPageSizeChange?: (pageSize: number) => void;
    className?: string;
    style?: CSSProperties;
    testId?: string;
}
export declare function Pagination({ page, pageSize, total, onChange, showSizeChanger, pageSizeOptions, onPageSizeChange, className, style, testId, }: PaginationProps): import("react").JSX.Element;
//# sourceMappingURL=Pagination.d.ts.map