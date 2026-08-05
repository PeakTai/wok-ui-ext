---
title: 分页器
order: 24
category: 导航
icon: fa-forward
description: 分页器组件，用于分页导航。
---

# 分页器

分页器（Pagination）用于分页导航。

## 基本用法

```ts
new Pagination({
  total: 100,
  pz: 10,
  pn: 1,
  onChange: (pn, pz) => console.log('page', pn)
})
```

<br>

```demo @docs/pages/demos/pagination/demo1.ts
```

<br>

## 简洁模式

```ts
new Pagination({
  total: 100,
  pz: 10,
  pn: 1,
  simple: true,
  onChange: (pn, pz) => {}
})
```

<br>

```demo @docs/pages/demos/pagination/demo2.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| total | `number` | — | 总条数 |
| pz | `number` | — | 每页条数 |
| pn | `number` | — | 当前页码 |
| simple | `boolean` | `false` | 是否简洁模式 |
| onChange | `(pn: number, pz: number) => void` | — | 分页回调 |
