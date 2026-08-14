# Publishing SA Pvt Ltd packages to npm

## Source of truth

Reusable UI always ships from these **public packages**. Apps must not invent parallel Select / MultiSelect / Banner / table / icon implementations, and must not import Ant Design (web) or one-off controls for those primitives.

**Icons:** only [Material Symbols](https://fonts.google.com/icons) via package `Icon` — no custom icon sets.

| Surface | Folder | npm name |
|---------|--------|----------|
| Web (Admin / Website) | `packages/saPvtLtdWebPackages` | **`sapvt-ltd-web-packages`** |
| App (Customer / Provider) | `packages/saPvtLtdAppPackages` | **`sapvt-ltd-app-packages`** |

Implementation detail (e.g. Ant Design under web selects) stays **inside the package**. Apps only import from `sapvt-ltd-*-packages` and install declared peer deps (`antd` for web).

Web inventory: see `packages/saPvtLtdWebPackages/COMPONENTS.md` (Button, Input, Modal, Toast, Table, PermissionSelector, …).
App inventory: see `packages/saPvtLtdAppPackages/COMPONENTS.md`.

## 1. Create / login to npm

```bash
npm adduser
# or
npm login
npm whoami
```

## 2. Build

From repo root:

```bash
cd home-services
npm install
npm run build:packages
```

## 3. Publish

```bash
npm run publish:web-packages
npm run publish:app-packages
```

Or from each package:

```bash
cd packages/saPvtLtdWebPackages && npm publish --access public
cd ../saPvtLtdAppPackages && npm publish --access public
```

## 4. Install in apps

**AdminWeb / Website**

```bash
npm install sapvt-ltd-web-packages antd
```

```ts
import { Banner, Select, MultiSelect, VirtualTable } from 'sapvt-ltd-web-packages';
import 'sapvt-ltd-web-packages/styles.css';
```

> `Select` / `MultiSelect` / `TreeMultiSelect` wrap Ant Design. Apps must install `antd` as a peer dependency. Full list: `packages/saPvtLtdWebPackages/COMPONENTS.md`.

**Customer / Provider**

```bash
npm install sapvt-ltd-app-packages
```

```ts
import { Banner, Select, MultiSelect, VirtualList } from 'sapvt-ltd-app-packages';
```

## Version bumps

Before next publish:

```bash
cd packages/saPvtLtdWebPackages && npm version patch
cd ../saPvtLtdAppPackages && npm version patch
```

Then publish again.
