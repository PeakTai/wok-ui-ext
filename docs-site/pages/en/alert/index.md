---
title: Alert
order: 30
category: Feedback
icon: fa-exclamation-circle
description: Alert component for displaying notification messages.
---

# Alert

Alert is used to display notification messages and supports multiple types.

## Basic Usage

```ts
new Alert({ type: 'info', content: 'Info message' })
new Alert({ type: 'success', content: 'Success message' })
new Alert({ type: 'warning', content: 'Warning message' })
new Alert({ type: 'danger', content: 'Danger message' })
```

<br>

```demo @docs/pages/demos/alert/demo1.ts
```

<br>

## With Title

```ts
new Alert({
  type: 'info',
  title: 'Title',
  content: 'Alert content'
})
```

<br>

```demo @docs/pages/demos/alert/demo2.ts
```

<br>

## Closeable

```ts
new Alert({
  type: 'info',
  content: 'Closeable alert',
  closeable: true
})
```

<br>

```demo @docs/pages/demos/alert/demo3.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| type | `'info' \| 'success' \| 'warning' \| 'danger'` | — | Alert type |
| title | `string` | — | Title |
| content | `SubModulesOpt` | — | Content |
| closeable | `boolean` | `false` | Whether it can be closed |
