/**
 * Client-side option filter for Select sheets (local lists — no API).
 */

export const SELECT_SEARCH_DEBOUNCE_MS = 300;

export function foldSelectQuery(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function filterSelectOptions<
  T extends {label: string; value: string; searchText?: string},
>(options: T[], query: string): T[] {
  const q = foldSelectQuery(query);
  if (!q) return options;
  return options.filter(opt => {
    const label = foldSelectQuery(String(opt.label || ''));
    const extra = foldSelectQuery(String(opt.searchText || ''));
    return label.includes(q) || (extra ? extra.includes(q) : false);
  });
}
