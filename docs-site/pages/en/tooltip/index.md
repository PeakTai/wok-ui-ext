---
title: Tooltip
order: 39
category: Feedback
icon: fa-info-circle
description: Tooltip component, displays a hint message on mouse hover.
---

# Tooltip

Tooltip displays a hint message on mouse hover. The floating layer is mounted to `body` and is not affected by the parent container's stacking context.

## Basic Usage

```ts
new Tooltip({
  children: new Button({ text: 'Hover me' }),
  content: 'Tooltip content'
})
```

<br>

```demo @docs/pages/demos/tooltip/demo1.ts
```

<br>

## Placements

```ts
new Tooltip({ children: new Button({ text: 'Top' }), content: 'Top', placement: 'top' })
new Tooltip({ children: new Button({ text: 'Bottom' }), content: 'Bottom', placement: 'bottom' })
new Tooltip({ children: new Button({ text: 'Left' }), content: 'Left', placement: 'left' })
new Tooltip({ children: new Button({ text: 'Right' }), content: 'Right', placement: 'right' })
```

<br>

```demo @docs/pages/demos/tooltip/demo2.ts
```

<br>

## Functional Binding

You can also bind a tooltip directly to existing DOM elements:

```ts
import { attachTooltip } from 'wok-ui-ext'

attachTooltip({
  target: document.getElementById('target'),
  content: 'API tooltip',
  placement: 'top',
  delay: 200,
  leaveDelay: 100
})
```

<br>

## Parameters

### Tooltip Component

| Parameter | Type | Default | Description |
|------|------|--------|------|
| children | `SubModulesOpt` | — | Trigger element |
| content | `SubModulesOpt` | — | Hint content |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `top` | Hint placement |
| delay | `number` | `0` | Show delay (ms) |
| leaveDelay | `number` | `0` | Hide delay (ms) |
| disabled | `boolean` | `false` | Whether it is disabled |

### attachTooltip

| Parameter | Type | Default | Description |
|------|------|--------|------|
| target | `HTMLElement` | — | Target element to bind |
| content | `SubModulesOpt` | — | Hint content |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `top` | Hint placement |
| delay | `number` | `0` | Show delay (ms) |
| leaveDelay | `number` | `0` | Hide delay (ms) |
| disabled | `boolean` | `false` | Whether it is disabled |
