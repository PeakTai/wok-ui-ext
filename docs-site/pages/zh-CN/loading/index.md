---
title: 加载
order: 32
category: 反馈
icon: fa-spinner
description: 加载组件，用于全屏加载提示。
---

# 加载

加载（Loading）用于全屏加载提示。

## 基本用法

```ts
showLoading('Loading...')
// ... async operation ...
hideLoading()
```

<br>

```demo @docs/pages/demos/loading/demo1.ts
```

<br>

## 自定义文案

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

| 函数 | 参数 | 说明 |
|------|------|------|
| showLoading | `msg?: string` | 显示全屏加载 |
| hideLoading | — | 隐藏全屏加载 |
