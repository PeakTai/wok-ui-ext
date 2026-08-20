---
title: Description List
order: 44
category: Data Display
icon: fa-list-alt
description: Description List component, used for read-only detail display.
---

# Description List

DescriptionList is used for read-only detail display.

## Basic Usage

```ts
new DescriptionList({
  items: [
    { label: 'Name', content: 'John Doe' },
    { label: 'Age', content: '30' },
    { label: 'Email', content: 'john@example.com' }
  ]
})
```

<br>

```demo @docs/pages/demos/description-list/demo1.ts
```

<br>

## Custom Column Count

Control the number of columns via the `cols` parameter (default `3`); `gap` controls the spacing between items (px, default `24`):

```ts
new DescriptionList({
  items: [...],
  cols: 2,
  gap: 16
})
```

<br>

## Exclusive Row

Use `exclusiveRow: true` to make an item occupy a full row, suitable for long content:

```ts
new DescriptionList({
  items: [
    { label: 'Title', content: 'Long description text', exclusiveRow: true },
    { label: 'Name', content: 'John' }
  ]
})
```

<br>

## Label on the Left

Use `layout: 'horizontal'` to place labels on the left of the content. The default label column width is 120px, customizable via `labelWidth`:

```ts
new DescriptionList({
  items: [...],
  cols: 2,
  layout: 'horizontal',
  labelWidth: 160
})
```

<br>

```demo @docs/pages/demos/description-list/demo2.ts
```

<br>

## Custom Label Width

The label column width only takes effect in the `horizontal` layout, in pixels (px), defaulting to `120` when not set:

```ts
new DescriptionList({
  items: [...],
  cols: 2,
  layout: 'horizontal',
  labelWidth: 160
})
```

<br>

```demo @docs/pages/demos/description-list/demo4.ts
```

<br>

## Bordered

Use `bordered: true` to enable the table style; in this case the gap is fixed at 0, and it can be combined with `layout`:

```ts
new DescriptionList({
  items: [...],
  cols: 3,
  bordered: true
})
```

<br>

```demo @docs/pages/demos/description-list/demo3.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `DescriptionItem[] \| ((add) => void)` | — | Array of description items or a callback function |
| cols | `number` | `3` | Number of columns |
| gap | `number` | `24` | Spacing (px), fixed at 0 in `bordered` mode |
| layout | `'vertical' \| 'horizontal'` | `'vertical'` | Layout mode: vertical places labels above the content, horizontal places labels on the left of the content |
| labelWidth | `number` | `120` | Label column width (px), only takes effect in `horizontal` layout |
| bordered | `boolean` | `false` | Whether to show borders; enables the table style when on |

## Types

Description items are defined by the `DescriptionItem` interface:

```ts
interface DescriptionItem {
  label: SubModulesOpt
  content: SubModulesOpt
  exclusiveRow?: boolean
}
```

| Property | Type | Description |
|------|------|------|
| label | `SubModulesOpt` | Item label |
| content | `SubModulesOpt` | Item content |
| exclusiveRow | `boolean` | Whether to occupy a full row, default `false`; the item takes a full row when set to `true` |

> `SubModulesOpt` represents sub-module content, which can be a string, a DOM element or a wok-ui module.

When `items` is passed as a callback function, description items are appended via the `add` method:

```ts
new DescriptionList({
  items: add => {
    add(
      { label: 'Name', content: 'John Doe' },
      { label: 'Age', content: '30' }
    )
  }
})
```
