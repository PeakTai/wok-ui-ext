---
title: 分段器
order: 63
category: 数据录入
icon: fa-columns
description: 分段器组件，用于筛选条件切换。
---

# 分段器

分段器（Segmented）用于筛选条件切换。

## 基本用法

```ts
new Segmented({
  items: ['All', 'Active', 'Disabled'],
  activeValue: 'All',
  onChange: (value) => showInfo(`Selected "${value}"`)
})
```

<br>

```demo @docs/pages/demos/segmented/demo1.ts
```

<br>

## 指定 label/value

```ts
new Segmented({
  items: [
    { label: 'All', value: '' },
    { label: 'Active', value: '1' },
    { label: 'Disabled', value: '0' }
  ],
  activeValue: '',
  onChange: (value) => {}
})
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `(SegmentedItem \| string)[]` | — | 选项列表 |
| activeValue | `string` | — | 当前选中值 |
| onChange | `(activeValue: string) => void` | — | 切换回调 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getValue | — | `string` | 获取当前选中值 |
| setValue | `value: string` | `void` | 设置当前选中值 |

## 类型

```ts
interface SegmentedItem {
  label: string
  value: string
}
```
