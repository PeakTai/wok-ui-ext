---
title: 时间轴
order: 53
category: 数据展示
icon: fa-history
description: 时间轴组件，展示一系列按时间顺序排列的条目。
---

# 时间轴

时间轴（Timeline）用于展示一系列按时间顺序排列的条目。

## 基本用法

```ts
new Timeline({
  items: [
    { title: 'Step 1', content: 'First step description' },
    { title: 'Step 2', content: 'Second step description' }
  ]
})
```

<br>

```demo @docs/pages/demos/timeline/demo1.ts
```

<br>

## 显示序号

```ts
new Timeline({
  showIndex: true,
  items: [...]
})
```

<br>

```demo @docs/pages/demos/timeline/demo2.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `TimelineItem[]` | — | 时间轴条目列表 |
| showIndex | `boolean` | `false` | 是否显示序号 |

## 类型

```ts
interface TimelineItem {
  title: string
  content: SubModulesOpt
}
```
