---
title: Quick Input
order: 35
category: Feedback
icon: fa-keyboard
description: Quick input dialog, a prompt-style interaction that returns the value entered by the user.
---

# Quick Input

`quickInput` is a prompt-style input dialog provided by wok-ui-ext: it pops up a small modal with a built-in input box, resolves with the value entered by the user on confirm, and resolves with `undefined` on cancel. It suits simple one-field input scenarios such as "rename, fill in a single field", and is more concise than `showFormModal`.

## Text Input

```ts
quickInput({
  title: 'Enter Your Name',
  placeholder: 'Please enter your name',
  required: true,
  maxLength: 16
}).then(val => {
  if (val === undefined) {
    // 用户取消了输入
    return
  }
  console.log(val)
})
```

<br>

```demo @docs/pages/demos/quick-input/demo1.ts
```

<br>

## Number Input

Use `quickInputNumber` when a number is needed, it returns `Promise<number | undefined>`.

```ts
quickInputNumber({
  title: 'Enter Your Age',
  required: true,
  min: 1,
  max: 150
}).then(val => {
  if (val === undefined) {
    // 用户取消了输入
    return
  }
  console.log(val)
})
```

<br>

```demo @docs/pages/demos/quick-input/demo2.ts
```

<br>

## Parameters

### quickInput

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `title` | `string` | — | Dialog title |
| `inputLabel` | `string` | — | Input label, not shown if omitted |
| `placeholder` | `string` | — | Input placeholder, not shown if omitted |
| `required` | `boolean` | `false` | Whether it is required |
| `maxLength` | `number` | — | Maximum length, unlimited if omitted |
| `value` | `string` | — | Initial value |

### quickInputNumber

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `title` | `string` | — | Dialog title |
| `inputLabel` | `string` | — | Input label, not shown if omitted |
| `placeholder` | `string` | — | Input placeholder, not shown if omitted |
| `required` | `boolean` | `false` | Whether it is required |
| `min` | `number` | — | Minimum value, unlimited if omitted |
| `max` | `number` | — | Maximum value, unlimited if omitted |
| `value` | `number` | — | Initial value |

## Return Value

| Function | Return Value | Description |
|------|--------|------|
| `quickInput` | `Promise<string \| undefined>` | Resolves with the entered value on confirm, resolves with `undefined` on cancel |
| `quickInputNumber` | `Promise<number \| undefined>` | Resolves with the entered value on confirm, resolves with `undefined` on cancel |

> Note: Cancelling the input is a normal result, expressed by returning `undefined`. The caller only needs to check the return value and no exception handling is required. `quickInputNumber` can also use `onSuccess` / `onCancel` callbacks instead of the Promise style.
>
> Note: If more than one input item is needed, or more complete form validation is required, please use `showFormModal`.
