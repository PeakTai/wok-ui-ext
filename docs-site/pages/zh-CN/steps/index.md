---
title: 步骤条
order: 25
category: 导航
icon: fa-list-ol
description: 步骤条组件，用于展示流程进度。
---

# 步骤条

步骤条（Steps）用于展示流程进度。

## 基本用法

```ts
new Steps({
  items: [
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' }
  ],
  current: 1
})
```

<br>

```demo @docs/pages/demos/steps/demo1.ts
```

<br>

## 带描述

```ts
new Steps({
  items: [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' }
  ],
  current: 1
})
```

<br>

```demo @docs/pages/demos/steps/demo2.ts
```

<br>

## 垂直方向

```ts
new Steps({
  items: [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' }
  ],
  current: 1,
  direction: 'vertical'
})
```

<br>

```demo @docs/pages/demos/steps/demo3.ts
```

<br>

## 错误状态

```ts
new Steps({
  items: [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' }
  ],
  current: 1,
  status: 'error'
})
```

<br>

```demo @docs/pages/demos/steps/demo4.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `StepItem[]` | — | 步骤项列表 |
| current | `number` | `0` | 当前步骤索引（从 0 开始） |
| status | `'process' \| 'error'` | `process` | 步骤状态 |
| direction | `'horizontal' \| 'vertical'` | `horizontal` | 方向 |

## 类型

```ts
interface StepItem {
  title: string
  description?: string
  icon?: IconInput
}
```
