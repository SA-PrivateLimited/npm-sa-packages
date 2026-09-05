# saPvtLtdAppPackages

React Native counterparts of `saPvtLtdWebPackages`.

- `src/styles.css` is copied from the web package (`:root` tokens). Metro must not import it.
- `src/tokens.ts` (`HS`) is the StyleSheet mapping of those CSS variables.
- Icons use the same Material Symbols names as web (`filter_alt` → MaterialIcons `filter-list`).
