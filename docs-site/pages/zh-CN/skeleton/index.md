---
title: 骨架屏
order: 50
category: 数据展示
icon: fa-spinner
description: 骨架屏组件，用于加载占位。
---

# 骨架屏

骨架屏（Skeleton）用于加载占位，提升用户体验。

## 基本用法

```ts
new Skeleton({})
new Skeleton({ rows: 5 })
```

<br>

```demo @docs/pages/demos/skeleton/demo1.ts
```

<br>

## 带头像

```ts
new Skeleton({ showAvatar: true })
```

<br>

```demo @docs/pages/demos/skeleton/demo2.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| rows | `number` | `3` | 骨架屏行数 |
| showAvatar | `boolean` | `false` | 是否显示头像 |
