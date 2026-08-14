# Component inventory — sapvt-ltd-app-packages

**Source of truth** for React Native reusable UI (Customer / Provider apps).

Wrap the app (or screens) with `AppThemeProvider` when using themed components.

```ts
import {
  AppThemeProvider,
  Button,
  PhoneInput,
  OtpInput,
  ConfirmDialog,
} from 'sapvt-ltd-app-packages';
```

## Inventory

| Component | Export | Notes |
|-----------|--------|--------|
| Theme | `AppThemeProvider`, `useAppTheme` | color tokens |
| Banner | `Banner` | |
| Button | `Button` | primary / secondary / ghost / danger |
| Input | `Input` | label, error, secure |
| OTP Input | `OtpInput` / `PinBoxesInput` | digit boxes |
| Phone Input | `PhoneInput` / `PhoneNumberInput` | +91 + 10 digits |
| Modal | `Modal` | backdrop shell |
| Dialog | `Dialog` | titled + footer |
| Drawer | `Drawer` | left / right / bottom |
| Toast | `ToastProvider`, `useToast`, `toast` | top stack |
| Loader | `Loader` | ActivityIndicator |
| Skeleton | `Skeleton` | placeholder blocks |
| Pagination | `Pagination` | |
| Table | `Table` / `VirtualList` | FlatList columns |
| Badge | `Badge` | count or dot |
| Status Chip | `StatusChip` | semantic tones |
| Avatar | `Avatar` | image or initials |
| Search Bar | `SearchBar` | |
| Filter Panel | `FilterPanel` | collapsible |
| Date Picker | `DatePicker` | pure RN calendar sheet |
| Dropdown | `Dropdown` / `Select` / `SingleSelect` | |
| Permission Selector | `PermissionSelector` | module checkboxes |
| Image Upload | `ImageUpload` | requires `onPick` from app |
| Document Viewer | `DocumentViewer` | image + open external |
| Empty State | `EmptyState` | |
| Error State | `ErrorState` | |
| Confirm Dialog | `ConfirmDialog` / `ConfirmationModal` | |
| Alert Modal | `AlertModal` | |
| MultiSelect | `MultiSelect` | |
| Chip helpers | via Select / MultiSelect | |

## Peers

`react`, `react-native` (>=0.73)
