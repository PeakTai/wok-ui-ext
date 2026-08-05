---
title: 分割线
order: 45
category: 数据展示
icon: fa-minus
description: 分割线用于分隔不同内容区域。
---

# 分割线

分割线用于分隔页面中的不同内容区域，支持水平/垂直方向、带文字、虚线等样式。

## 水平分割线

默认 `direction: 'horizontal'`，用于分隔上下区块。

```ts
new Divider()
```

<br>

```demo @docs/pages/demos/divider/demo1.ts
```

<br>

## 带文字分割线

通过 `text` 参数在中间显示文字。

```ts
new Divider({ text: 'TEXT' })
```

<br>

```demo @docs/pages/demos/divider/demo2.ts
```

<br>

## 虚线分割线

设置 `dashed: true` 使用虚线样式，可同时配合文字使用。

```ts
new Divider({ dashed: true })
new Divider({ text: 'DASHED', dashed: true })
```

<br>

```demo @docs/pages/demos/divider/demo3.ts
```

<br>

## 垂直分割线

`direction: 'vertical'` 用于行内元素之间的分隔，支持虚线，两侧间距通过 `HSpacer` 垫片控制。

```ts
new Divider({ direction: 'vertical' })
new Divider({ direction: 'vertical', dashed: true })
```

<br>

```demo @docs/pages/demos/divider/demo4.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 水平模式时显示在中间的文字 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 分割线方向 |
| dashed | `boolean` | `false` | 是否使用虚线 |
| color | `string` | — | 自定义线条颜色 |
