---
title: 头像
order: 40
category: 数据展示
icon: fa-user
description: 头像组件，用于用户头像展示。
---

# 头像

头像（Avatar）用于展示用户头像。

## 基本用法

```ts
new Avatar({})
new Avatar({ src: 'https://example.com/avatar.jpg' })
```

<br>

```demo @docs/pages/demos/avatar/demo1.ts
```

<br>

## 尺寸

支持预设尺寸和自定义尺寸。

```ts
new Avatar({ size: 'sm' })
new Avatar({ size: 'lg' })
new Avatar({ size: 64 })
```

<br>

```demo @docs/pages/demos/avatar/demo2.ts
```

<br>

## 悬停提示

```ts
new Avatar({ src: 'avatar.jpg', title: 'User Name' })
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | — | 头像图片地址 |
| size | `'sm' \| 'lg' \| number` | — | 尺寸，sm=40px, lg=56px，数字为自定义像素值 |
| title | `string` | — | 鼠标悬停时的提示文字 |
