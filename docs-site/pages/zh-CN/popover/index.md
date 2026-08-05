---
title: 气泡卡片
order: 35
category: 反馈
icon: fa-comment-o
description: 气泡卡片组件，点击触发显示浮层。
---

# 气泡卡片

气泡卡片（Popover）点击触发元素显示浮层，点击外部或按 Esc 关闭。

## 基本用法

```ts
const btn = new Button({ text: 'Click me' })
new Popover({
  trigger: btn,
  content: 'Popover content'
})
```

<br>

```demo @docs/pages/demos/popover/demo1.ts
```

<br>

## 不同位置

```ts
new Popover({
  trigger: btn,
  content: 'Content',
  placement: 'top'
})
```

支持的位置：`top`、`topLeft`、`topRight`、`bottom`、`bottomLeft`、`bottomRight`、`left`、`right`

<br>

## 自定义宽度

```ts
new Popover({
  trigger: btn,
  content: 'Content',
  width: 300
})
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| trigger | `HTMLElement \| { el: HTMLElement }` | — | 触发元素 |
| content | `SubModulesOpt` | — | 弹出内容 |
| placement | `PopoverPlacement` | `bottom` | 弹出位置 |
| width | `number` | — | 宽度（px） |
| onClose | `() => void` | — | 关闭回调 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| show | — | `void` | 显示 |
| hide | — | `void` | 隐藏 |
| toggle | — | `void` | 切换显示/隐藏 |

## 类型

```ts
type PopoverPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'
```
