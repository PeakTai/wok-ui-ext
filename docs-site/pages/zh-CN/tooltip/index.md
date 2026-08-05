---
title: 工具提示
order: 39
category: 反馈
icon: fa-info-circle
description: 工具提示组件，鼠标悬停时显示提示信息。
---

# 工具提示

工具提示（Tooltip）在鼠标悬停时显示提示信息。

## 基本用法

```ts
new Tooltip({
  content: 'Hover me',
  text: 'Tooltip content'
})
```

<br>

```demo @docs/pages/demos/tooltip/demo1.ts
```

<br>

## 不同位置

```ts
new Tooltip({
  content: 'Hover',
  text: 'Top',
  placement: 'top'
})
new Tooltip({
  content: 'Hover',
  text: 'Bottom',
  placement: 'bottom'
})
new Tooltip({
  content: 'Hover',
  text: 'Left',
  placement: 'left'
})
new Tooltip({
  content: 'Hover',
  text: 'Right',
  placement: 'right'
})
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `SubModulesOpt` | — | 触发元素 |
| text | `string` | — | 提示文本 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `top` | 提示位置 |
