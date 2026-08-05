---
title: 空状态
order: 46
category: 数据展示
icon: fa-folder-open
description: 空状态组件，用于无数据时的占位展示。
---

# 空状态

空状态（Empty）用于无数据时的占位展示。

## 基本用法

`text` 不传时使用默认文案，传入则展示自定义文本。

```ts
new Empty({})
new Empty({ text: 'No data found' })
```

<br>

```demo @docs/pages/demos/empty/demo1.ts
```

<br>

## 无边框

设置 `noBorder: true` 隐藏边框，适用于嵌入在已有卡片容器中的场景。

```ts
new Empty({ text: 'Empty', noBorder: true })
```

<br>

```demo @docs/pages/demos/empty/demo2.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 空状态提示文本，默认使用国际化文案 |
| noBorder | `boolean` | `false` | 是否隐藏边框 |
