---
title: 快速输入
order: 35
category: 反馈
icon: fa-keyboard
description: 快速输入弹窗，prompt 式交互，返回用户输入的值。
---

# 快速输入

`quickInput` 是 wok-ui-ext 提供的 prompt 式输入弹窗：弹出一个小型模态框，内置一个输入框，确认后返回用户输入的值，取消时返回 `undefined`。适合「重命名、填写单个字段」这类只需要一次简单输入的场景，比 `showFormModal` 更简洁。

## 文本输入

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

## 数字输入

需要输入数字时使用 `quickInputNumber`，返回 `Promise<number | undefined>`。

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

## 参数

### quickInput

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 弹窗标题 |
| `inputLabel` | `string` | — | 输入框标题，不填则不显示 |
| `placeholder` | `string` | — | 输入框占位符，不填则不显示 |
| `required` | `boolean` | `false` | 是否必填 |
| `maxLength` | `number` | — | 最大长度，不填则不限制 |
| `value` | `string` | — | 初始值 |

### quickInputNumber

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 弹窗标题 |
| `inputLabel` | `string` | — | 输入框标题，不填则不显示 |
| `placeholder` | `string` | — | 输入框占位符，不填则不显示 |
| `required` | `boolean` | `false` | 是否必填 |
| `min` | `number` | — | 最小值，不填则不限制 |
| `max` | `number` | — | 最大值，不填则不限制 |
| `value` | `number` | — | 初始值 |

## 返回值

| 函数 | 返回值 | 说明 |
|------|--------|------|
| `quickInput` | `Promise<string \| undefined>` | 确认后 resolve 输入的值，取消时 resolve `undefined` |
| `quickInputNumber` | `Promise<number \| undefined>` | 确认后 resolve 输入的值，取消时 resolve `undefined` |

> 提示：取消输入属于正常结果，通过返回 `undefined` 表达，调用方只需判断返回值即可，无需异常处理。`quickInputNumber` 也可以通过 `onSuccess` / `onCancel` 回调替代 Promise 用法。
>
> 提示：如果输入项不止一个，或需要更完整的表单校验，请使用 `showFormModal`。
