import type {CSSProperties} from 'react';
import {Icon} from './Icon.js';
import {Button} from './Button.js';

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

export function Pagination({
  page,
  pageSize,
  total,
  onChange,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50],
  onPageSizeChange,
  className = '',
  style,
  testId = 'hs-pagination',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const current = Math.min(Math.max(1, page), totalPages);
  const from = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const to = Math.min(total, current * pageSize);

  return (
    <div
      className={`hs-pagination ${className}`.trim()}
      style={style}
      data-testid={testId}>
      <span className="hs-pagination__meta">
        {from}–{to} of {total}
      </span>
      <div className="hs-pagination__controls">
        {showSizeChanger && onPageSizeChange ? (
          <select
            className="hs-pagination__size"
            value={pageSize}
            aria-label="Rows per page"
            onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        ) : null}
        <Button
          variant="secondary"
          size="sm"
          disabled={current <= 1}
          aria-label="Previous page"
          onClick={() => onChange(current - 1)}>
          <Icon name="chevron_left" size={18} />
        </Button>
        <span className="hs-pagination__page">
          {current} / {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={current >= totalPages}
          aria-label="Next page"
          onClick={() => onChange(current + 1)}>
          <Icon name="chevron_right" size={18} />
        </Button>
      </div>
    </div>
  );
}
