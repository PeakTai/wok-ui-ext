---
title: Image Preview
order: 48
category: Data Display
icon: fa-search-plus
description: Image Preview component, view images in full screen.
---

# Image Preview

ImagePreview views images in a full-screen overlay, supporting single/multiple image preview and keyboard navigation.

## Basic Usage

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

## Specify Initial Index

```ts
previewImage(images, 1) // 从第二张开始预览
```

<br>

## Keyboard Navigation

| Key | Function |
|------|------|
| Esc | Close preview |
| ← | Previous image |
| → | Next image |

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| images | `ImagePreviewItem \| ImagePreviewItem[]` | — | Image object or array |
| initialIndex | `number` | `0` | Initial display index |

## Types

```ts
interface ImagePreviewItem {
  src: string
  alt?: string
}
```
