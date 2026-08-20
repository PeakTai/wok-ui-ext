---
title: Loading
order: 32
category: Feedback
icon: fa-spinner
description: Loading component for full-screen loading indicator.
---

# Loading

Loading is used for full-screen loading indicator.

## Basic Usage

```ts
showLoading('Loading...')
// ... async operation ...
hideLoading()
```

<br>

```demo @docs/pages/demos/loading/demo1.ts
```

<br>

## Custom Message

```ts
showLoading('Loading data...')
// ... async operation ...
hideLoading()
```

<br>

```demo @docs/pages/demos/loading/demo2.ts
```

<br>

## API

| Function | Parameter | Description |
|------|------|------|
| showLoading | `msg?: string` | Show the full-screen loading |
| hideLoading | — | Hide the full-screen loading |
