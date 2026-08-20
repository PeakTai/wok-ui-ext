---
title: 工具提示
order: 39
category: 反馈
icon: fa-info-circle
description: 工具提示组件，鼠标悬停时显示提示信息。
---

# 工具提示

工具提示（Tooltip）在鼠标悬停时显示提示信息。浮层挂载到 `body`，不受父容器层叠上下文影响。

## 基本用法

```ts
new Tooltip({
  children: new Button({ text: 'Hover me' }),
  content: 'Tooltip content'
})
```

<br>

```demo @docs/pages/demos/tooltip/demo1.ts
```

<br>

## 不同位置

```ts
new Tooltip({ children: new Button({ text: 'Top' }), content: 'Top', placement: 'top' })
new Tooltip({ children: new Button({ text: 'Bottom' }), content: 'Bottom', placement: 'bottom' })
new Tooltip({ children: new Button({ text: 'Left' }), content: 'Left', placement: 'left' })
new Tooltip({ children: new Button({ text: 'Right' }), content: 'Right', placement: 'right' })
```

<br>

```demo @docs/pages/demos/tooltip/demo2.ts
```

<br>

## 函数式绑定

也可直接给已有 DOM 元素绑定 tooltip：

```ts
import { attachTooltip } from 'wok-ui-ext'

attachTooltip({
  target: document.getElementById('target'),
  content: 'API tooltip',
  placement: 'top',
  delay: 200,
  leaveDelay: 100
})
```

<br>

## 参数

### Tooltip 组件

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | `SubModulesOpt` | — | 触发元素 |
| content | `SubModulesOpt` | — | 提示内容 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `top` | 提示位置 |
| delay | `number` | `0` | 显示延迟（ms） |
| leaveDelay | `number` | `0` | 隐藏延迟（ms） |
| disabled | `boolean` | `false` | 是否禁用 |

### attachTooltip

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| target | `HTMLElement` | — | 要绑定的目标元素 |
| content | `SubModulesOpt` | — | 提示内容 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `top` | 提示位置 |
| delay | `number` | `0` | 显示延迟（ms） |
| leaveDelay | `number` | `0` | 隐藏延迟（ms） |
| disabled | `boolean` | `false` | 是否禁用 |
