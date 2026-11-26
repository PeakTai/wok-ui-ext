---
title: Spacer
order: 13
category: General
icon: fa-arrows-alt-v
description: Semantic spacing shims that are created directly with new, no parameters required.
---

# Spacer

Spacers create fixed spacing between elements. wok-ui's built-in `Spacer` / `HSpacer` only provide a few sizes; this library provides a set of semantic spacers based on the global spacing tokens, created directly with `new` and no parameters.

## Vertical Spacer

Separates elements vertically by expanding height.

| Class | Recommended usage |
|----|----------|
| `SpacerTiny` | Adjacent elements that should stay close, such as icon and text, badge and subject |
| `SpacerTight` | Button groups, inline elements |
| `SpacerCompact` | Block-level elements in the same group, list items |
| `SpacerBase` | Default content areas, elements inside a card |
| `SpacerRelaxed` | Form groups, sections |
| `SpacerSpacious` | Page-level section separation |

```ts
new SpacerCompact()
```

<br>

```demo @docs/pages/demos/spacer/demo1.ts
```

<br>

## Horizontal Spacer

Separates elements horizontally by expanding width, suitable for inline elements or flex row layouts.

| Class | Recommended usage |
|----|----------|
| `HSpacerTiny` | Adjacent elements that should stay close, such as icon and text, badge and subject |
| `HSpacerTight` | Button groups, inline elements |
| `HSpacerCompact` | Block-level elements in the same group, list items |
| `HSpacerBase` | Default content areas, elements inside a card |
| `HSpacerRelaxed` | Form groups, sections |
| `HSpacerSpacious` | Page-level section separation |

```ts
new HSpacerTight()
```

<br>

```demo @docs/pages/demos/spacer/demo2.ts
```

<br>

## Relation to Spacing Tokens

All spacers take their sizes from the global `--gap-*` variables. Spacing is a fixed design baseline: it does not change with themes and cannot be modified via `applyTheme()` / `setTheme()`. To adjust it globally, override these variables in your style entry. See the Spacing section of Themes for the full variable list.

To pass `gap` to layout components like `HBox` / `VBox` from JS/TS, use the `tokens` constant — values match `--gap-*`. See the [JS/TS Access](/en/themes.html) section of Themes.
