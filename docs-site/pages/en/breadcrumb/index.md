---
title: Breadcrumb
order: 20
category: Navigation
icon: fa-map-signs
description: Breadcrumb component, used to display the hierarchical path of the current page.
---

# Breadcrumb

Breadcrumb is used to display the hierarchical path of the current page.

## Basic Usage

```ts
new Breadcrumb({
  items: [
    { text: 'Home', onClick: () => {} },
    { text: 'Category', onClick: () => {} },
    { text: 'Current' }
  ]
})
```

<br>

```demo @docs/pages/demos/breadcrumb/demo1.ts
```

<br>

## Custom Separator

```ts
new Breadcrumb({
  items: [...],
  separator: '>'
})
```

<br>

```demo @docs/pages/demos/breadcrumb/demo2.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `BreadcrumbItem[]` | — | List of breadcrumb items |
| separator | `string` | `/` | Separator |

## BreadcrumbItem Type Definition

```ts
interface BreadcrumbItem {
  text: string
  onClick?: () => void
  icon?: IconInput
}
```
