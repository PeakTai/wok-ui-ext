---
title: Context Menu
order: 21
category: Navigation
icon: fa-bars
description: Context menu component, supporting multi-level nesting.
---

# Context Menu

ContextMenu supports multi-level nesting and automatically closes when clicking outside.

## Basic Usage

```ts
el.addEventListener('click', e => {
  showContextMenu({
    menu: [
      { label: 'Cut', callback: () => console.log('cut') },
      { label: 'Copy', callback: () => console.log('copy') },
      { label: 'Paste', callback: () => console.log('paste') }
    ],
    evt: e
  })
})
```

<br>

```demo @docs/pages/demos/context-menu/demo1.ts
```

<br>

## With Icons

```ts
showContextMenu({
  menu: [
    { label: 'Edit', icon: new IconEdit(), callback: () => {} },
    { label: 'Open', icon: new IconFolderOpen(), callback: () => {} },
    { label: 'Lock', icon: new IconLock(), callback: () => {} }
  ],
  evt: e
})
```

<br>

```demo @docs/pages/demos/context-menu/demo2.ts
```

<br>

## Submenu

```ts
showContextMenu({
  menu: [
    { label: 'Cut', callback: () => {} },
    {
      label: 'More',
      children: [
        { label: 'Option 1', callback: () => {} },
        { label: 'Option 2', callback: () => {} }
      ]
    },
    { label: 'Paste', callback: () => {} }
  ],
  evt: e
})
```

<br>

```demo @docs/pages/demos/context-menu/demo3.ts
```

<br>

## Parameters

### showContextMenu

| Parameter | Type | Default | Description |
|------|------|--------|------|
| menu | `ContextMenuItem[] \| ((add) => void)` | — | Menu list, supports array or functional addition |
| evt | `MouseEvent` | — | Event object, used for positioning |
| position | `MenuPosition` | `cursor` | Menu position mode |
| align | `MenuAlign` | `start` | Secondary axis alignment |

## Types

```ts
interface ContextMenuItem {
  icon?: IconInput
  label: ConvertibleModule
  active?: boolean
  callback?: () => void
  children?: ContextMenuItem[]
}

type MenuPosition = 'cursor' | 'top' | 'bottom' | 'left' | 'right'
type MenuAlign = 'start' | 'end'
```

### MenuPosition Values

| Value | Description |
|------|------|
| `cursor` | Pops up following the mouse pointer position (default) |
| `top` | Anchored to the top of the trigger element, horizontally centered, auto-adjusts when space is insufficient |
| `bottom` | Anchored to the bottom of the trigger element, horizontally centered, auto-adjusts when space is insufficient |
| `left` | Anchored to the left of the trigger element, vertically centered, auto-adjusts when space is insufficient |
| `right` | Anchored to the right of the trigger element, vertically centered, auto-adjusts when space is insufficient |

### MenuAlign Values

| Value | Description |
|------|------|
| `start` | Left-aligned for top/bottom, top-aligned for left/right (default) |
| `end` | Right-aligned for top/bottom, bottom-aligned for left/right |
