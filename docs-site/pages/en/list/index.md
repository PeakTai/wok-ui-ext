---
title: List
order: 49
category: Data Display
icon: fa-list-ul
description: List component, a simplified vertical list display.
---

# List

List is a lightweight data display list, suitable as an alternative to Table.

## Basic Usage

Pass list item content via `items`; each item can be text, a module or a literal value. The list has a border by default.

```ts
new List({
  items: ['Item 1', 'Item 2', 'Item 3']
})
```

<br>

```demo @docs/pages/demos/list/demo1.ts
```

<br>

## Borderless

Set `bordered: false` to disable the default border.

```ts
new List({
  items: ['Item 1', 'Item 2', 'Item 3'],
  bordered: false
})
```

<br>

```demo @docs/pages/demos/list/demo2.ts
```

<br>

## Empty State

An empty state text is shown when the list items are empty, customizable via `emptyText`.

```ts
new List({
  items: [],
  emptyText: 'No data found'
})
```

<br>

```demo @docs/pages/demos/list/demo3.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `SubModulesOpt[]` | — | List items |
| emptyText | `string` | — | Empty state text |
| bordered | `boolean` | `true` | Whether to show borders |
| size | `'default' \| 'small' \| 'large'` | `default` | Size |
