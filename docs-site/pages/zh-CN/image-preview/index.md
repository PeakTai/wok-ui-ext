---
title: 图片预览
order: 48
category: 数据展示
icon: fa-search-plus
description: 图片预览组件，全屏查看图片。
---

# 图片预览

图片预览（ImagePreview）全屏遮罩查看图片，支持单张/多张预览、键盘导航。

## 基本用法

```ts
// 单张预览
previewImage({ src: 'https://example.com/photo.jpg' })

// 多张预览
previewImage([
  { src: 'https://example.com/img1.jpg', alt: 'Image 1' },
  { src: 'https://example.com/img2.jpg', alt: 'Image 2' }
])
```

<br>

```demo @docs/pages/demos/image-preview/demo1.ts
```

<br>

## 指定初始索引

```ts
previewImage(images, 1) // 从第二张开始预览
```

<br>

## 键盘导航

| 按键 | 功能 |
|------|------|
| Esc | 关闭预览 |
| ← | 上一张 |
| → | 下一张 |

<br>

## API

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| images | `ImagePreviewItem \| ImagePreviewItem[]` | — | 图片对象或数组 |
| initialIndex | `number` | `0` | 初始显示索引 |

## 类型

```ts
interface ImagePreviewItem {
  src: string
  alt?: string
}
```
