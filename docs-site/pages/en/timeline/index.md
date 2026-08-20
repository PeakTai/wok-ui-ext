---
title: Timeline
order: 53
category: Data Display
icon: fa-history
description: Timeline component for displaying a series of items arranged in chronological order.
---

# Timeline

Timeline is used to display a series of items arranged in chronological order.

## Basic Usage

```ts
new Timeline({
  items: [
    { title: 'Step 1', content: 'First step description' },
    { title: 'Step 2', content: 'Second step description' }
  ]
})
```

<br>

```demo @docs/pages/demos/timeline/demo1.ts
```

<br>

## Show Index

```ts
new Timeline({
  showIndex: true,
  items: [...]
})
```

<br>

```demo @docs/pages/demos/timeline/demo2.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `TimelineItem[]` | — | Timeline item list |
| showIndex | `boolean` | `false` | Whether to show the index |

## Types

```ts
interface TimelineItem {
  title: string
  content: SubModulesOpt
}
```
