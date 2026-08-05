---
title: 徽标
order: 41
category: 数据展示
icon: fa-bell
description: 徽标组件，用于标记未读数量或状态。
---

# 徽标

徽标（Badge）用于标记未读数量或状态提示。

## 基本用法

```ts
new Badge({ text: '1' })
new Badge({ text: '99+' })
```

<br>

```demo @docs/pages/demos/badge/demo1.ts
```

<br>

## 不同类型

支持 5 种预设类型：success、warning、danger、info、neutral。

```ts
new Badge({ text: 'Success', type: 'success' })
new Badge({ text: 'Warning', type: 'warning' })
new Badge({ text: 'Danger', type: 'danger' })
new Badge({ text: 'Info', type: 'info' })
new Badge({ text: 'Neutral', type: 'neutral' })
```

<br>

```demo @docs/pages/demos/badge/demo2.ts
```

<br>

## 带图标

可通过 `icon` 参数为徽标添加左侧图标，图标需为 `SvgIcon` 实例。

```ts
new Badge({ text: 'New', type: 'success', icon: new IconBell() })
```

<br>

```demo @docs/pages/demos/badge/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 徽标文本 |
| type | `'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | — | 徽标类型 |
| icon | `SvgIcon \| RemoteSvgIcon` | — | 左侧图标 |
| onClick | `(evt: MouseEvent) => void` | — | 点击回调 |
