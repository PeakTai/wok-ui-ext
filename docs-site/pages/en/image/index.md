---
title: Image
order: 47
category: Data Display
icon: fa-image
description: Image component, supports loading placeholder and failure fallback.
---

# Image

Image supports loading placeholder, failure fallback and object-fit control.

## Basic Usage

```ts
new Image({
  src: 'https://example.com/photo.jpg'
})
```

<br>

```demo @docs/pages/demos/image/demo1.ts
```

<br>

## Custom Size

Specify the size via `width` / `height`, with numbers in px.

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

Control how the image fills its container via `fit`.

```ts
new Image({
  src: 'https://example.com/photo.jpg',
  fit: 'cover'
})
```

Supported values: `fill`, `contain`, `cover`, `none`, `scale-down`

<br>

```demo @docs/pages/demos/image/demo3.ts
```

<br>

## Failure Fallback

Set `fallbackSrc` so the image is automatically replaced with the fallback image when loading fails; if not set, a failure placeholder is shown.

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

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| src | `string` | — | Image URL |
| alt | `string` | — | Alternative text |
| fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `cover` | object-fit property |
| width | `number \| string` | — | Width |
| height | `number \| string` | — | Height |
| fallbackSrc | `string` | — | Fallback image when loading fails |
| onClick | `() => void` | — | Click callback |

## Methods

| Method | Parameters | Return Value | Description |
|--------|------|--------|------|
| setSrc | `src: string` | `void` | Update the image URL |
