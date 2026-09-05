export function canRequestThisProvider(provider: {
  showRequestService?: boolean;
} | null | undefined): boolean {
  return provider?.showRequestService !== false;
}

export function canCallThisProvider(provider: {
  showContactToUser?: boolean;
  contactAvailable?: boolean;
} | null | undefined): boolean {
  if (!provider) return false;
  if (provider.showContactToUser === false) return false;
  if (provider.contactAvailable === false) return false;
  return true;
}
