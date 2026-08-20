---
title: 图片
order: 47
category: 数据展示
icon: fa-image
description: 图片组件，支持加载占位和失败兜底。
---

# 图片

图片（Image）支持加载中占位、加载失败兜底、object-fit 控制。

## 基本用法

```ts
new Image({
  src: 'https://example.com/photo.jpg'
})
```

<br>

```demo @docs/pages/demos/image/demo1.ts
```

<br>

## 自定义尺寸

通过 `width` / `height` 指定尺寸，数字以 px 为单位。

```ts
new Image({
  src: 'https://example.com/photo.jpg',
  width: 200,
  height: 150
})
```

<br>

```demo @docs/pages/demos/image/demo2.ts
```

<br>

## object-fit

通过 `fit` 控制图片在容器中的填充方式。

```ts
new Image({
  src: 'https://example.com/photo.jpg',
  fit: 'cover'
})
```

支持的值：`fill`、`contain`、`cover`、`none`、`scale-down`

<br>

```demo @docs/pages/demos/image/demo3.ts
```

<br>

## 失败兜底

设置 `fallbackSrc`，图片加载失败时自动替换为兜底图；未设置则显示失败占位。

```ts
new Image({
  src: 'https://example.com/photo.jpg',
  fallbackSrc: '/assets/fallback.png'
})
```

<br>

```demo @docs/pages/demos/image/demo4.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | `string` | — | 图片地址 |
| alt | `string` | — | 替代文本 |
| fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `cover` | object-fit 属性 |
| width | `number \| string` | — | 宽度 |
| height | `number \| string` | — | 高度 |
| fallbackSrc | `string` | — | 加载失败时的兜底图片 |
| onClick | `() => void` | — | 点击回调 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| setSrc | `src: string` | `void` | 更新图片地址 |
