---
title: Popconfirm
order: 34
category: Feedback
icon: fa-exclamation-triangle
description: Popconfirm component for confirming operations.
---

# Popconfirm

Popconfirm is used to confirm operations and is implemented based on Popover.

## Component Usage

```ts
new Popconfirm({
  children: new Button({ text: 'Delete', type: 'danger' }),
  title: 'Confirm delete?',
  confirmType: 'danger',
  onConfirm: () => deleteItem()
})
```

<br>

```demo @docs/pages/demos/popconfirm/demo1.ts
```

<br>

## With Description

```ts
new Popconfirm({
  children: new Button({ text: 'Delete' }),
  title: 'Confirm delete?',
  description: 'This cannot be undone',
  onConfirm: () => deleteItem()
})
```

<br>

```demo @docs/pages/demos/popconfirm/demo2.ts
```

<br>

## Event Trigger

Call `showPopconfirm` in any click event:

```ts
new Button({
  text: 'Delete',
  onClick: (e: MouseEvent) => {
    showPopconfirm({
      target: e.target as HTMLElement,
      title: 'Confirm delete?',
      confirmType: 'danger',
      onConfirm: () => deleteItem()
    })
  }
})
```

<br>

```demo @docs/pages/demos/popconfirm/demo3.ts
```

<br>

## Placement

```ts
new Popconfirm({
  children: new Button({ text: 'Delete' }),
  title: 'Confirm delete?',
  placement: 'bottom',
  onConfirm: () => deleteItem()
})
```

Supported placements: `top`, `topLeft`, `topRight`, `bottom`, `bottomLeft`, `bottomRight`, `left`, `right`

<br>

```demo @docs/pages/demos/popconfirm/demo4.ts
```

<br>

## Attach to Existing Elements

Use `attachPopconfirm` to bind click triggering to existing elements:

```ts
attachPopconfirm({
  target: document.getElementById('delete-btn'),
  title: 'Confirm delete?',
  onConfirm: () => deleteItem()
})
```

<br>

## Parameters

### Popconfirm Component / attachPopconfirm

| Parameter | Type | Default | Description |
|------|------|--------|------|
| children | `SubModulesOpt` | — | Trigger element (component style) |
| target | `HTMLElement` | — | Target element (event/attach style) |
| title | `string` | — | Confirmation prompt text |
| description | `string` | — | Detailed description |
| confirmText | `string` | OK | Confirm button text |
| cancelText | `string` | Cancel | Cancel button text |
| confirmType | `'primary' \| 'danger'` | `primary` | Confirm button type |
| placement | `PopoverPlacement` | `top` | Popup placement |
| width | `number` | `260` | Width (px) |
| onConfirm | `() => void` | — | Confirm callback |
| onCancel | `() => void` | — | Cancel callback |

### showPopconfirm

| Parameter | Type | Default | Description |
|------|------|--------|------|
| target | `HTMLElement` | — | Target element for positioning |
| title | `string` | — | Confirmation prompt text |
| description | `string` | — | Detailed description |
| confirmText | `string` | OK | Confirm button text |
| cancelText | `string` | Cancel | Cancel button text |
| confirmType | `'primary' \| 'danger'` | `primary` | Confirm button type |
| placement | `PopoverPlacement` | `top` | Popup placement |
| width | `number` | `260` | Width (px) |
| onConfirm | `() => void` | — | Confirm callback |
| onCancel | `() => void` | — | Cancel callback |

## Types

```ts
type PopoverPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'
```
