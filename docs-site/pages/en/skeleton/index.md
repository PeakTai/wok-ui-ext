---
title: Skeleton
order: 50
category: Data Display
icon: fa-spinner
description: Skeleton component, used as a loading placeholder.
---

# Skeleton

Skeleton is used as a loading placeholder to improve the user experience.

## Basic Usage

```ts
new Skeleton({})
new Skeleton({ rows: 5 })
```

<br>

```demo @docs/pages/demos/skeleton/demo1.ts
```

<br>

## With Avatar

```ts
new Skeleton({ showAvatar: true })
```

<br>

```demo @docs/pages/demos/skeleton/demo2.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| rows | `number` | `3` | Number of skeleton rows |
| showAvatar | `boolean` | `false` | Whether to show an avatar |
