---
title: 警示框
order: 30
category: 反馈
icon: fa-exclamation-circle
description: 警示框组件，用于显示提示信息。
---

# 警示框

警示框（Alert）用于显示提示信息，支持多种类型。

## 基本用法

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

## 带标题

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

## 可关闭

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

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'info' \| 'success' \| 'warning' \| 'danger'` | — | 警示框类型 |
| title | `string` | — | 标题 |
| content | `SubModulesOpt` | — | 内容 |
| closeable | `boolean` | `false` | 是否可关闭 |
