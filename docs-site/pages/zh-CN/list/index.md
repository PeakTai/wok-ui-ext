---
title: 列表
order: 49
category: 数据展示
icon: fa-list-ul
description: 列表组件，简化的垂直列表展示。
---

# 列表

列表（List）是轻量级的数据展示列表，适合作为 Table 的替代方案。

## 基本用法

通过 `items` 传入列表项内容，每一项可以是文本、模块或字面量。列表默认带边框。

```ts
new List({
  items: ['Item 1', 'Item 2', 'Item 3']
})
```

<br>

```demo @docs/pages/demos/list/demo1.ts
```

<br>

## 无边框

设置 `bordered: false` 可关闭默认边框。

```ts
new List({
  items: ['Item 1', 'Item 2', 'Item 3'],
  bordered: false
})
```

<br>

```demo @docs/pages/demos/list/demo2.ts
```

<br>

## 空状态

列表项为空时显示空状态文案，可通过 `emptyText` 自定义。

```ts
new List({
  items: [],
  emptyText: 'No data found'
})
```

<br>

```demo @docs/pages/demos/list/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `SubModulesOpt[]` | — | 列表项 |
| emptyText | `string` | — | 空状态文案 |
| bordered | `boolean` | `true` | 是否带边框 |
| size | `'default' \| 'small' \| 'large'` | `default` | 尺寸 |
