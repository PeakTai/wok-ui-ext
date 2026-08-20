---
title: 搜索框
order: 62
category: 数据录入
icon: fa-search
description: 搜索框组件，用于快速搜索。
---

# 搜索框

搜索框（SearchBox）用于快速搜索。

## 基本用法

```ts
new SearchBox({
  onSearch: (value) => console.log('search', value)
})
```

<br>

```demo @docs/pages/demos/search-box/demo1.ts
```

<br>

## 自定义占位符

```ts
new SearchBox({
  placeholder: 'Search...',
  onSearch: (value) => {}
})
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| placeholder | `string` | — | 占位符 |
| maxLength | `number` | — | 最大长度 |
| value | `string` | — | 默认值 |
| onSearch | `(value: string) => void` | — | 搜索回调 |
