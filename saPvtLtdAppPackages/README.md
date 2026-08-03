# sapvt-ltd-app-packages

Reusable **React Native** UI for SA Pvt Ltd (Customer / Provider apps).

> **Source of truth** for mobile reusable components. Prefer this package over inline Modal+FlatList dropdowns and duplicated Alert/Empty/Phone widgets.

> Folder: `packages/saPvtLtdAppPackages` · npm name must be **lowercase**.

## Install (monorepo)

```bash
# from HomeServices or HomeServicesProvider
npm install sapvt-ltd-app-packages@file:../packages/saPvtLtdAppPackages
```

```ts
import {
  AppThemeProvider,
  Select,
  MultiSelect,
  AlertModal,
  ConfirmationModal,
  EmptyState,
  PhoneNumberInput,
  PinBoxesInput,
  Banner,
  VirtualList,
} from 'sapvt-ltd-app-packages';
```

Wrap the app root with `AppThemeProvider` and pass your light/dark theme colors so Select and modals match branding.

## Components

| Export | Notes |
|--------|--------|
| `Select` / `MultiSelect` | Themed bottom-sheet pickers |
| `AlertModal` / `ConfirmationModal` | Centered dialogs (Unicode glyphs; no vector-icons peer) |
| `EmptyState` | Empty list placeholder |
| `PhoneNumberInput` | Fixed +91 + 10-digit field |
| `PinBoxesInput` | 6-digit PIN boxes |
| `Banner` / `VirtualList` | Existing helpers |
| `AppThemeProvider` / `useAppTheme` | Theme tokens |

## Publish (maintainers)

```bash
cd packages/saPvtLtdAppPackages
npm run build
npm publish --access public
```
