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
  header: new Title('Card Header'),
  content: 'Card content',
  footer: 'Card Footer'
})
```

> 推荐 `header` 传入 `new Title()` 作为卡片标题，以获得统一的标题样式。

<br>

```demo @docs/pages/demos/card/demo2.ts
```

<br>

## 内部卡片

在卡片内部展示多层级结构时（如评论卡片里的每条评论），把 `type` 设为 `inner`。内嵌卡片使用更深的背景色，不显示阴影和悬停阴影。

```ts
new Card({
  header: new Title('Comments'),
  content: new Card({
    type: 'inner',
    content: 'Comment content'
  })
})
```

<br>

```demo @docs/pages/demos/card/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'inner'` | — | 卡片类型，传入 `inner` 表示内嵌卡片，用于卡片内部展示多层级结构 |
| header | `SubModulesOpt` | — | 卡片头部内容 |
| content | `SubModulesOpt` | — | 卡片主体内容 |
| footer | `SubModulesOpt` | — | 卡片脚部内容 |
| classNames | `string[]` | — | 额外的 CSS 类名 |
