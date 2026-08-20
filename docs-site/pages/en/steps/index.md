---
title: Steps
order: 25
category: Navigation
icon: fa-list-ol
description: Steps component, used to display process progress.
---

# Steps

Steps is used to display process progress.

## Basic Usage

```ts
new Steps({
  items: [
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' }
  ],
  current: 1
})
```

<br>

```demo @docs/pages/demos/steps/demo1.ts
```

<br>

## With Descriptions

```ts
new Steps({
  items: [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' }
  ],
  current: 1
})
```

<br>

```demo @docs/pages/demos/steps/demo2.ts
```

<br>

## Vertical Direction

```ts
new Steps({
  items: [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' }
  ],
  current: 1,
  direction: 'vertical'
})
```

<br>

```demo @docs/pages/demos/steps/demo3.ts
```

<br>

## Error Status

```ts
new Steps({
  items: [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' }
  ],
  current: 1,
  status: 'error'
})
```

<br>

```demo @docs/pages/demos/steps/demo4.ts
```

<br>

## Callback Event

Once `onChange` is set, steps become clickable. Clicking a step re-renders the component, switches that step to the active state, and triggers the callback with the step index as the argument. Clicking has no effect when no callback is set.

```ts
new Steps({
  items: [
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' }
  ],
  current: 1,
  onChange: (index: number) => {
    showInfo(`click step ${index + 1}`)
  }
})
```

<br>

```demo @docs/pages/demos/steps/demo5.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `StepItem[]` | — | List of step items |
| current | `number` | `0` | Index of the current step (starting from 0) |
| status | `'process' \| 'error'` | `process` | Step status |
| direction | `'horizontal' \| 'vertical'` | `horizontal` | Direction |
| onChange | `(index: number) => void` | — | Triggered when a step is clicked, with the step index as the argument |

## Types

```ts
interface StepItem {
  title: string
  description?: string
  icon?: IconInput
}
```
