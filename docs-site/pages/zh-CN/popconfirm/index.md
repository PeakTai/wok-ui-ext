---
title: 气泡确认
order: 34
category: 反馈
icon: fa-exclamation-triangle
description: 气泡确认组件，用于确认操作。
---

# 气泡确认

气泡确认（Popconfirm）用于确认操作，基于 Popover 实现。

## 基本用法

```ts
new Popconfirm({
  trigger: deleteBtn,
  title: 'Confirm delete?',
  onConfirm: () => deleteItem()
})
```

<br>

```demo @docs/pages/demos/popconfirm/demo1.ts
```

<br>

## 带描述

```ts
new Popconfirm({
  trigger: deleteBtn,
  title: 'Confirm delete?',
  description: 'This cannot be undone',
  onConfirm: () => deleteItem()
})
```

<br>

## 危险按钮

```ts
new Popconfirm({
  trigger: deleteBtn,
  title: 'Confirm delete?',
  confirmType: 'danger',
  onConfirm: () => deleteItem()
})
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| trigger | `HTMLElement \| { el: HTMLElement }` | — | 触发元素 |
| title | `string` | — | 确认提示文字 |
| description | `string` | — | 详细描述 |
| confirmText | `string` | 确定 | 确认按钮文字 |
| cancelText | `string` | 取消 | 取消按钮文字 |
| confirmType | `'primary' \| 'danger'` | `primary` | 确认按钮类型 |
| onConfirm | `() => void` | — | 确认回调 |
| onCancel | `() => void` | — | 取消回调 |
