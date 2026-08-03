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
<Icon name="expand_more" />  // chevron
<Icon name="close" />         // dismiss
```

| Component | Export | Notes |
|-----------|--------|--------|
| Icon | `Icon` | Material Symbols ligature wrapper |
| Banner | `Banner` | Uses `Icon` `close` |
| Single Select | `Select`, `SingleSelect` | `expand_more` chevron |
| MultiSelect (tags) | `MultiSelect` | `variant="tags"` |
| MultiSelect checkbox | `MultiSelectCheckbox` | Checklist + chips inside |
| Tree MultiSelect | `TreeMultiSelect` | Checkable tree |
| Chip / Chips | `Chip`, `Chips` | Uses `Icon` `close` |
| Widget | `Widget` | Card shell |
| VirtualTable | `VirtualTable` | Sticky headers; column `search` icon; debounced filter; no row checkboxes |

## Theme tokens

`--hs-primary`, `--hs-primary-dark`, `--hs-secondary`, `--hs-surface`, `--hs-text`, `--hs-text-secondary`, `--hs-border`, `--hs-error`, `--hs-success`, `--hs-warning`, `--hs-background`

## Peers

`react`, `react-dom`, `antd` (^5)
