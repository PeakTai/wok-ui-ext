---
title: Progress
order: 36
category: Feedback
icon: fa-tasks
description: Progress component for displaying task completion progress.
---

# Progress

Progress is used to display task completion progress.

## Basic Usage

```ts
new Progress({ progress: 75 })
new Progress({ label: 'Task', progress: 50 })
```

<br>

```demo @docs/pages/demos/progress/demo1.ts
```

<br>

## Show Progress Percentage

```ts
new Progress({ label: 'Progress', progress: 85, showProgress: true })
```

<br>

## Colors

```ts
new Progress({ progress: 100, color: 'success' })
new Progress({ progress: 80, color: 'warning' })
new Progress({ progress: 40, color: 'danger' })
```

<br>

```demo @docs/pages/demos/progress/demo2.ts
```

<br>

## Custom Text

```ts
new Progress({ progress: 85, text: '85/100 points' })
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| label | `SubModulesOpt` | — | Progress bar label |
| progress | `number` | — | Progress value (0-100) |
| showProgress | `boolean` | `false` | Whether to show the progress percentage |
| color | `'primary' \| 'success' \| 'warning' \| 'danger'` | `primary` | Progress bar color |
| text | `string` | — | Custom progress text, replacing the percentage display |

## Methods

| Method | Parameter | Return Value | Description |
|--------|------|--------|------|
| setProgress | `progress: number, text?: string` | `void` | Update the progress value |
