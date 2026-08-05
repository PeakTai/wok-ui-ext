---
title: 面包屑
order: 20
category: 导航
icon: fa-map-signs
description: 面包屑组件，用于展示当前页面的层级路径。
---

# 面包屑

面包屑（Breadcrumb）用于展示当前页面的层级路径。

## 基本用法

```ts
new Breadcrumb({
  items: [
    { text: 'Home', onClick: () => {} },
    { text: 'Category', onClick: () => {} },
    { text: 'Current' }
  ]
})
```

<br>

```demo @docs/pages/demos/breadcrumb/demo1.ts
```

<br>

## 自定义分隔符

```ts
new Breadcrumb({
  items: [...],
  separator: '>'
})
```

<br>

```demo @docs/pages/demos/breadcrumb/demo2.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `BreadcrumbItem[]` | — | 面包屑项列表 |
| separator | `string` | `/` | 分隔符 |

## BreadcrumbItem 类型定义

```ts
interface BreadcrumbItem {
  text: string
  onClick?: () => void
  icon?: IconInput
}
```
