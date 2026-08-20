---
title: 徽标
order: 41
category: 数据展示
icon: fa-bell
description: 徽标组件，用于在图标、头像等元素右上角标记数量或红点。
---

# 徽标

徽标（Badge）用于在图标、头像等元素右上角标记数量或红点，也可以独立显示数字。

## 包裹模式

将 `children` 传入要包裹的内容（图标、头像等），徽标显示在其右上角。

```ts
new Badge({ count: 5, children: new IconBell() })
new Badge({ dot: true, children: new IconBell() })
```

`count` 超过 `max`（默认 99）时显示 `max+`。

<br>

```demo @docs/pages/demos/badge/demo1.ts
```

<br>

## 独立模式

不传 `children` 时，徽标独立显示为数字圆点。

```ts
new Badge({ count: 6 })
new Badge({ count: 100 })            // 显示 99+
new Badge({ count: 0, showZero: true })  // 显示 0
```

<br>

```demo @docs/pages/demos/badge/demo2.ts
```

<br>

## 高级用法

支持位置偏移（`offset`）、点击回调（`onClick`）和隐藏（`hidden`）。

```ts
new Badge({ count: 5, offset: [2, 2], children: new IconBell() })
new Badge({ count: 8, children: new IconBell(), onClick: () => showInfo('点击了徽标') })
new Badge({ count: 8, hidden: true, children: new IconBell() })
```

<br>

```demo @docs/pages/demos/badge/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| count | `number` | `0` | 显示数量 |
| max | `number` | `99` | 数量封顶值，超过时显示 `max+` |
| dot | `boolean` | `false` | 纯红点模式，不显示数字 |
| type | `BadgeType` | `danger` | 颜色：`danger` `primary` `success` `warning` `info` |
| showZero | `boolean` | `false` | `count` 为 0 时是否显示 |
| hidden | `boolean` | `false` | 是否隐藏徽标 |
| offset | `[number, number]` | — | 位置偏移 `[水平, 垂直]` |
| children | `SubModulesOpt` | — | 被包裹的内容，不传时徽标独立显示 |
| onClick | `(evt: MouseEvent) => void` | — | 点击徽标回调 |
