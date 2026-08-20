---
title: Segmented
order: 63
category: Data Entry
icon: fa-columns
description: Segmented component for switching filter conditions.
---

# Segmented

Segmented is used for switching filter conditions.

## Basic Usage

```ts
new Segmented({
  items: ['All', 'Active', 'Disabled'],
  activeValue: 'All',
  onChange: (value) => showInfo(`Selected "${value}"`)
})
```

<br>

```demo @docs/pages/demos/segmented/demo1.ts
```

<br>

## Specifying label/value

```ts
new Segmented({
  items: [
    { label: 'All', value: '' },
    { label: 'Active', value: '1' },
    { label: 'Disabled', value: '0' }
  ],
  activeValue: '',
  onChange: (value) => {}
})
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `(SegmentedItem \| string)[]` | — | Option list |
| activeValue | `string` | — | Current selected value |
| onChange | `(activeValue: string) => void` | — | Toggle callback |

## Methods

| Method | Parameters | Return value | Description |
|--------|------|--------|------|
| getValue | — | `string` | Gets the current selected value |
| setValue | `value: string` | `void` | Sets the current selected value |

## Types

```ts
interface SegmentedItem {
  label: string
  value: string
}
```
