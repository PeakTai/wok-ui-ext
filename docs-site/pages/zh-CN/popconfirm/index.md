---
title: 气泡确认
order: 34
category: 反馈
icon: fa-exclamation-triangle
description: 气泡确认组件，用于确认操作。
---

# 气泡确认

气泡确认（Popconfirm）用于确认操作，基于 Popover 实现。

## 组件式用法

```ts
new Popconfirm({
  children: new Button({ text: 'Delete', type: 'danger' }),
  title: 'Confirm delete?',
  confirmType: 'danger',
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
  children: new Button({ text: 'Delete' }),
  title: 'Confirm delete?',
  description: 'This cannot be undone',
  onConfirm: () => deleteItem()
})
```

<br>

```demo @docs/pages/demos/popconfirm/demo2.ts
```

<br>

## 事件触发

在任意点击事件中调用 `showPopconfirm`：

```ts
new Button({
  text: 'Delete',
  onClick: (e: MouseEvent) => {
    showPopconfirm({
      target: e.target as HTMLElement,
      title: 'Confirm delete?',
      confirmType: 'danger',
      onConfirm: () => deleteItem()
    })
  }
})
```

<br>

```demo @docs/pages/demos/popconfirm/demo3.ts
```

<br>

## 弹出位置

```ts
new Popconfirm({
  children: new Button({ text: 'Delete' }),
  title: 'Confirm delete?',
  placement: 'bottom',
  onConfirm: () => deleteItem()
})
```

支持的位置：`top`、`topLeft`、`topRight`、`bottom`、`bottomLeft`、`bottomRight`、`left`、`right`

<br>

```demo @docs/pages/demos/popconfirm/demo4.ts
```

<br>

## 绑定已有元素

使用 `attachPopconfirm` 给已有元素绑定点击触发：

```ts
attachPopconfirm({
  target: document.getElementById('delete-btn'),
  title: 'Confirm delete?',
  onConfirm: () => deleteItem()
})
```

<br>

## 参数

### Popconfirm 组件 / attachPopconfirm

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | `SubModulesOpt` | — | 触发元素（组件式） |
| target | `HTMLElement` | — | 目标元素（事件/绑定式） |
| title | `string` | — | 确认提示文字 |
| description | `string` | — | 详细描述 |
| confirmText | `string` | 确定 | 确认按钮文字 |
| cancelText | `string` | 取消 | 取消按钮文字 |
| confirmType | `'primary' \| 'danger'` | `primary` | 确认按钮类型 |
| placement | `PopoverPlacement` | `top` | 弹出位置 |
| width | `number` | `260` | 宽度（px） |
| onConfirm | `() => void` | — | 确认回调 |
| onCancel | `() => void` | — | 取消回调 |

### showPopconfirm

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| target | `HTMLElement` | — | 定位目标元素 |
| title | `string` | — | 确认提示文字 |
| description | `string` | — | 详细描述 |
| confirmText | `string` | 确定 | 确认按钮文字 |
| cancelText | `string` | 取消 | 取消按钮文字 |
| confirmType | `'primary' \| 'danger'` | `primary` | 确认按钮类型 |
| placement | `PopoverPlacement` | `top` | 弹出位置 |
| width | `number` | `260` | 宽度（px） |
| onConfirm | `() => void` | — | 确认回调 |
| onCancel | `() => void` | — | 取消回调 |

## 类型

```ts
type PopoverPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'
```
