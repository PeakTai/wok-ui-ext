---
title: Avatar
order: 40
category: Data Display
icon: fa-user
description: Avatar component, used to display user avatars.
---

# Avatar

Avatar is used to display a user avatar.

## Basic Usage

```ts
new Avatar({})
new Avatar({ src: 'https://example.com/avatar.jpg' })
```

<br>

```demo @docs/pages/demos/avatar/demo1.ts
```

<br>

## Size

Supports preset sizes and custom sizes.

```ts
new Avatar({ size: 'sm' })
new Avatar({ size: 'lg' })
new Avatar({ size: 64 })
```

<br>

```demo @docs/pages/demos/avatar/demo2.ts
```

<br>

## Hover Tooltip

```ts
new Avatar({ src: 'avatar.jpg', title: 'User Name' })
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| src | `string` | — | Avatar image URL |
| size | `'sm' \| 'lg' \| number` | — | Size, sm=40px, lg=56px, a number for a custom pixel value |
| title | `string` | — | Tooltip text shown on mouse hover |
