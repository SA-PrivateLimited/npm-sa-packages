import {localTenDigits} from './phone';

export type PickedContact = {
  name: string;
  phone: string;
};

export type NativeContactRecord = {
  givenName?: string;
  familyName?: string;
  displayName?: string;
  phoneNumbers?: Array<{number?: string; label?: string}>;
};

export type NativeContactPicker = () => Promise<NativeContactRecord | null>;

let nativePicker: NativeContactPicker | null = null;

/** Host apps register a React Native Contacts (or equivalent) implementation. */
export function registerNativeContactPicker(picker: NativeContactPicker): void {
  nativePicker = picker;
}

export function isNativeContactPickerRegistered(): boolean {
  return typeof nativePicker === 'function';
}

export function normalizeIndianMobile(raw: string): string {
  const digits = localTenDigits(raw);
  return digits.length === 10 ? digits : '';
}

export function contactDisplayName(row: NativeContactRecord): string {
  const joined = [row.givenName, row.familyName].filter(Boolean).join(' ').trim();
  return joined || (row.displayName || '').trim();
}

export async function pickPhoneContact(): Promise<PickedContact | null> {
  if (!nativePicker) return null;
  try {
    const row = await nativePicker();
    if (!row) return null;
    const name = contactDisplayName(row);
    const phone = normalizeIndianMobile(
      (row.phoneNumbers || []).map(p => p.number || '').find(Boolean) || '',
    );
    if (!phone && !name) return null;
    return {name, phone};
  } catch {
    return null;
  }
}
