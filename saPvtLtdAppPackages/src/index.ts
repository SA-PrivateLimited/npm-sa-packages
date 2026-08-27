export {Banner} from './Banner';
export type {BannerProps, BannerVariant} from './Banner';

export {Select} from './Select';
export type {SelectProps, SelectOption} from './Select';
/** Alias for clarity alongside MultiSelect */
export {Select as SingleSelect} from './Select';
/** Alias — Dropdown is Select */
export {Select as Dropdown} from './Select';

export {MultiSelect} from './MultiSelect';
export type {MultiSelectProps, MultiSelectOption} from './MultiSelect';

export {VirtualList} from './VirtualList';
export type {VirtualListProps, VirtualListColumn} from './VirtualList';
/** Alias — Table is VirtualList */
export {VirtualList as Table} from './VirtualList';

export {
  AppThemeProvider,
  useAppTheme,
  DEFAULT_APP_THEME,
} from './theme';
export type {AppThemeColors, AppThemeProviderProps} from './theme';

export {AlertModal} from './AlertModal';
export type {AlertModalProps, AlertModalType} from './AlertModal';

export {ConfirmationModal} from './ConfirmationModal';
export type {
  ConfirmationModalProps,
  ConfirmationModalType,
} from './ConfirmationModal';
/** Alias — ConfirmDialog */
export {ConfirmationModal as ConfirmDialog} from './ConfirmationModal';

export {EmptyState} from './EmptyState';
export type {EmptyStateProps} from './EmptyState';

export {PhoneNumberInput} from './PhoneNumberInput';
export type {PhoneNumberInputProps} from './PhoneNumberInput';
/** Alias — PhoneInput */
export {PhoneNumberInput as PhoneInput} from './PhoneNumberInput';

export {PinBoxesInput} from './PinBoxesInput';
export type {PinBoxesInputProps} from './PinBoxesInput';
/** Alias — OtpInput */
export {PinBoxesInput as OtpInput} from './PinBoxesInput';

export {Button} from './Button';
export type {ButtonProps, ButtonVariant, ButtonSize} from './Button';

export {Input} from './Input';
export type {InputProps} from './Input';

export {Badge} from './Badge';
export type {BadgeProps, BadgeVariant} from './Badge';

export {StatusChip} from './StatusChip';
export type {StatusChipProps, StatusChipTone} from './StatusChip';

export {Avatar} from './Avatar';
export type {AvatarProps, AvatarSize} from './Avatar';

export {SearchBar} from './SearchBar';
export type {SearchBarProps} from './SearchBar';

export {DatePicker} from './DatePicker';
export type {DatePickerProps} from './DatePicker';

export {Modal, Dialog} from './Modal';
export type {ModalProps, DialogProps} from './Modal';

export {Drawer} from './Drawer';
export type {DrawerProps, DrawerSide} from './Drawer';

export {ToastProvider, useToast, toast} from './Toast';
export type {ToastVariant, ToastItem} from './Toast';

export {Loader} from './Loader';
export type {LoaderProps, LoaderSize} from './Loader';

export {Skeleton} from './Skeleton';
export type {SkeletonProps, SkeletonVariant} from './Skeleton';

export {Pagination} from './Pagination';
export type {PaginationProps} from './Pagination';

export {FilterPanel} from './FilterPanel';
export type {FilterPanelProps} from './FilterPanel';

export {PermissionSelector} from './PermissionSelector';
export type {
  PermissionSelectorProps,
  PermissionModule,
  PermissionItem,
} from './PermissionSelector';

export {ImageUpload} from './ImageUpload';
export type {ImageUploadProps} from './ImageUpload';

export {DocumentViewer} from './DocumentViewer';
export type {DocumentViewerProps} from './DocumentViewer';

export {ErrorState} from './ErrorState';
export type {ErrorStateProps} from './ErrorState';

export {
  digitsOnly,
  localTenDigits,
  toE164,
  formatPhoneDisplay,
  INDIA_DIAL_CODE,
} from './phone';

export {
  SERVICE_CATALOG,
  FEATURED_SERVICE_KEYS,
  SERVICE_GROUPS,
  resolveServiceMeta,
  matchesServiceSearch,
  bilingualProfessionLine,
  bilingualServiceNames,
  servicePrimaryName,
  serviceSelectSearchText,
} from './serviceCatalog';
export type {AppLang, LocalizedText, ServiceMeta} from './serviceCatalog';

export {
  registerNativeContactPicker,
  isNativeContactPickerRegistered,
  pickPhoneContact,
  normalizeIndianMobile,
} from './contacts';
export type {
  PickedContact,
  NativeContactRecord,
  NativeContactPicker,
} from './contacts';

export {
  customerDisplayName,
  isCustomerProfileIncomplete,
  isTemporaryProfileName,
} from './identity';

export type {
  SessionUser,
  ServiceCategory,
  QuestionnaireQuestion,
  UserRole,
  ApprovalStatus,
  ServiceRequestStatus,
} from './types';
