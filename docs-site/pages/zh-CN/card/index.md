---
title: 卡片
order: 42
category: 数据展示
icon: fa-window-maximize
description: 卡片组件，用于信息分组展示。
---

# 卡片

卡片（Card）用于信息分组展示。

## 基本用法

```ts
new Card({
  content: 'Card content'
})
```

<br>

```demo @docs/pages/demos/card/demo1.ts
```

<br>

## 带头部和尾部

```ts
new Card({
  header: 'Card Header',
  content: 'Card content',
  footer: 'Card Footer'
})
```

<br>

```demo @docs/pages/demos/card/demo2.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| header | `SubModulesOpt` | — | 卡片头部内容 |
| content | `SubModulesOpt` | — | 卡片主体内容 |
| footer | `SubModulesOpt` | — | 卡片脚部内容 |
| classNames | `string[]` | — | 额外的 CSS 类名 |
