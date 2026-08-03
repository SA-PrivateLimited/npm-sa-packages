# sapvt-ltd-web-packages

Reusable **React web** component library for SA Pvt Ltd — and other projects that adopt the same design tokens.

> **Source of truth** for web UI primitives. Apps import from this package only. Ant Design stays **inside** the package.

## Icons

**Only** [Material Symbols](https://fonts.google.com/icons) via `Icon`. No custom SVGs / emoji / unicode for chrome.

Load the font in the host app once (AdminWeb `index.html` already does):

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
  rel="stylesheet"
/>
```

```ts
import { Icon } from 'sapvt-ltd-web-packages';
<Icon name="expand_more" />
<Icon name="close" />
```

## Install

```bash
npm install sapvt-ltd-web-packages antd
```

```ts
import {
  Icon,
  Banner,
  SingleSelect,
  MultiSelect,
  MultiSelectCheckbox,
  TreeMultiSelect,
  Chip,
  Chips,
  Widget,
  VirtualTable,
} from 'sapvt-ltd-web-packages';
import 'sapvt-ltd-web-packages/styles.css';
```

See [COMPONENTS.md](./COMPONENTS.md) for the full inventory.

Peer deps: `react`, `react-dom`, `antd` (^5).

## Publish

```bash
npm run build
npm version minor   # or patch
npm publish --access public
```
