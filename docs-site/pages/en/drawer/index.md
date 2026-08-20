---
title: Drawer
order: 31
category: Feedback
icon: fa-columns
description: Drawer component, a panel that slides in from the side.
---

# Drawer

Drawer slides in a panel from the side.

## Basic Usage

```ts
const drawer = showDrawer({
  title: 'Detail',
  body: 'Drawer content'
})
```

<br>

```demo @docs/pages/demos/drawer/demo1.ts
```

<br>

## Directions

```ts
showDrawer({ title: 'Right', body: 'Content', placement: 'right' })
showDrawer({ title: 'Left', body: 'Content', placement: 'left' })
showDrawer({ title: 'Top', body: 'Content', placement: 'top' })
showDrawer({ title: 'Bottom', body: 'Content', placement: 'bottom' })
```

<br>

```demo @docs/pages/demos/drawer/demo2.ts
```

<br>

## Custom Width

```ts
showDrawer({
  title: 'Detail',
  body: 'Content',
  width: 500
})
```

<br>

```demo @docs/pages/demos/drawer/demo3.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| title | `string` | — | Title |
| body | `SubModulesOpt` | — | Body content |
| placement | `'left' \| 'right' \| 'top' \| 'bottom'` | `right` | Slide direction |
| width | `number` | `400` | Width (only valid for left/right) |
| replaceByBody | `boolean` | `false` | Whether to completely replace the content with body |
| onClose | `() => void` | — | Close callback |
| onShown | `() => void` | — | Callback after the entrance animation completes |

## Return Value

```ts
interface DrawerHandle {
  close: () => void
}
```
