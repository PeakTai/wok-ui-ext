---
title: Popover
order: 35
category: Feedback
icon: fa-comment
description: Popover component, click to trigger a floating layer.
---

# Popover

Popover displays a floating layer when the trigger element is clicked; click outside or press Esc to close.

## Component Usage

```ts
new Popover({
  children: new Button({ text: 'Click me' }),
  content: 'Popover content'
})
```

<br>

```demo @docs/pages/demos/popover/demo1.ts
```

<br>

## Placements

```ts
new Popover({
  children: new Button({ text: 'Top' }),
  content: 'Content',
  placement: 'top'
})
```

Supported placements: `top`, `topLeft`, `topRight`, `bottom`, `bottomLeft`, `bottomRight`, `left`, `right`

<br>

```demo @docs/pages/demos/popover/demo2.ts
```

<br>

## Event Trigger

Call `showPopover` in any click event:

```ts
new Button({
  text: 'Click me',
  onClick: (e: MouseEvent) => {
    showPopover({
      target: e.target as HTMLElement,
      content: 'Dynamic content'
    })
  }
})
```

<br>

## Attach to Existing Elements

Use `attachPopover` to bind click triggering to existing elements:

```ts
attachPopover({
  target: document.getElementById('btn'),
  content: 'Popover content'
})
```

<br>

## Parameters

### Popover Component / attachPopover

| Parameter | Type | Default | Description |
|------|------|--------|------|
| children | `SubModulesOpt` | — | Trigger element (component style) |
| target | `HTMLElement` | — | Target element (event/attach style) |
| content | `SubModulesOpt` | — | Popup content |
| placement | `PopoverPlacement` | `bottom` | Popup placement |
| width | `number` | — | Width (px) |
| onClose | `() => void` | — | Close callback |

### showPopover

| Parameter | Type | Default | Description |
|------|------|--------|------|
| target | `HTMLElement` | — | Target element for positioning |
| content | `SubModulesOpt` | — | Popup content |
| placement | `PopoverPlacement` | `bottom` | Popup placement |
| width | `number` | — | Width (px) |
| onClose | `() => void` | — | Close callback |

## Types

```ts
type PopoverPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'
```
