# Component inventory — sapvt-ltd-web-packages

**Source of truth** for web reusable UI. Apps import from this package only.

## Icons

**Only** [Material Symbols](https://fonts.google.com/icons) via `Icon` (`material-symbols-outlined`). No custom SVGs, emoji, or unicode glyphs for UI chrome.

Host apps must load the font (AdminWeb already does in `index.html`):

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
  rel="stylesheet"
/>
```

```ts
import { Icon } from 'sapvt-ltd-web-packages';
<Icon name="expand_more" />
```

## Inventory

| Component | Export | Notes |
|-----------|--------|--------|
| Icon | `Icon` | Material Symbols ligature wrapper |
| Banner | `Banner` | Uses `Icon` `close` |
| Button | `Button` | primary / secondary / ghost / danger |
| Input | `Input` | label, error, prefix/suffix, multiline |
| OTP Input | `OtpInput` | digit boxes, paste, onComplete |
| Phone Input | `PhoneInput` | +91 + 10 digits |
| Modal | `Modal` | backdrop shell |
| Dialog | `Dialog` | titled modal + footer |
| Drawer | `Drawer` | left / right / bottom |
| Toast | `ToastProvider`, `useToast`, `toast` | imperative + hook |
| Loader | `Loader` | spinner, optional fullscreen |
| Skeleton | `Skeleton` | text / title / avatar / rect / card |
| Pagination | `Pagination` | page / pageSize / total |
| Table | `Table` / `VirtualTable` | sticky headers, filters |
| Badge | `Badge` | count or dot |
| Status Chip | `StatusChip` | semantic status tones |
| Avatar | `Avatar` | image or initials |
| Search Bar | `SearchBar` | search + clear |
| Filter Panel | `FilterPanel` | collapsible apply/reset |
| Date Picker | `DatePicker` | native `YYYY-MM-DD` |
| Dropdown | `Dropdown` / `Select` / `SingleSelect` | alias of Select |
| Permission Selector | `PermissionSelector` | module checkbox groups |
| Image Upload | `ImageUpload` | data-URL thumbs |
| Document Viewer | `DocumentViewer` | image / PDF iframe |
| Empty State | `EmptyState` | icon + CTA |
| Error State | `ErrorState` | alert + retry |
| Confirm Dialog | `ConfirmDialog` | danger / warning / info / success |
| Chip / Chips | `Chip`, `Chips` | tags / filters |
| MultiSelect | `MultiSelect`, `MultiSelectCheckbox` | tags / checklist |
| Tree MultiSelect | `TreeMultiSelect` | checkable tree |
| Widget | `Widget` | card shell |

## Theme tokens

`--hs-primary`, `--hs-primary-dark`, `--hs-secondary`, `--hs-surface`, `--hs-text`, `--hs-text-secondary`, `--hs-border`, `--hs-error`, `--hs-success`, `--hs-warning`, `--hs-background`

## Peers

`react`, `react-dom`, `antd` (^5)
