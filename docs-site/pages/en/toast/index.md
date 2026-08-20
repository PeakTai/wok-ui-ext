---
title: Toast
order: 38
category: Feedback
icon: fa-comment
description: Toast component for message notifications.
---

# Toast

Toast is used for message notifications: it pops up automatically and disappears after a specified time.

## Basic Usage

```ts
showToast({ type: 'success', text: 'Operation successful' })
showToast({ type: 'error', text: 'Operation failed' })
showToast({ type: 'warning', text: 'Warning message' })
showToast({ type: 'info', text: 'Info message' })
```

<br>

```demo @docs/pages/demos/toast/demo1.ts
```

<br>

## Quick Methods

```ts
showSuccess('Success')
showError('Error')
showWarning('Warning')
showInfo('Info')
```

<br>

## Custom Duration

```ts
showToast({
  type: 'success',
  text: 'Success',
  duration: 5000
})
```

<br>

## API

### showToast

| Parameter | Type | Default | Description |
|------|------|--------|------|
| type | `'success' \| 'warning' \| 'error' \| 'info'` | — | Message type |
| text | `string` | — | Message content |
| duration | `number` | `3000` | Duration (milliseconds) |

### Quick Functions

| Function | Parameter | Description |
|------|------|------|
| showSuccess | `text: string` | Show a success message |
| showError | `errMsg: any` | Show an error message |
| showWarning | `errMsg: any` | Show a warning message |
| showInfo | `text: string` | Show an info message |
