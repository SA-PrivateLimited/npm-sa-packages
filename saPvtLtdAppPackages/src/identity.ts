import type {SessionUser} from './types';

const TEMP_NAME_RE = /^(Customer|Provider|Partner)\s+\d+$/i;

export function isTemporaryProfileName(name?: string | null): boolean {
  return TEMP_NAME_RE.test(String(name || '').trim());
}

export function customerDisplayName(user: SessionUser | null | undefined): string {
  if (!user) return '';
  const raw = (user.name || user.displayName || '').trim();
  if (raw && !isTemporaryProfileName(raw) && !/^Customer$/i.test(raw)) {
    return raw;
  }
  const id = user.customerDisplayId;
  if (id != null && String(id).trim()) {
    return `Customer ${String(id).trim()}`;
  }
  if (isTemporaryProfileName(raw)) return raw;
  return raw || 'Customer';
}

export function isCustomerProfileIncomplete(
  user: SessionUser | null | undefined,
): boolean {
  if (!user) return false;
  if (user.customerProfileComplete === false) return true;
  if (user.customerProfileComplete === true) return false;
  const raw = (user.name || user.displayName || '').trim();
  return !raw || /^Customer$/i.test(raw) || isTemporaryProfileName(raw);
}
