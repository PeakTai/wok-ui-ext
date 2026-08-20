---
title: Badge
order: 41
category: Data Display
icon: fa-bell
description: Badge component, used to mark a count or a red dot on the top-right corner of icons, avatars and other elements.
---

# Badge

Badge is used to mark a count or a red dot at the top-right corner of icons, avatars and other elements. It can also display a number independently.

## Wrapped Mode

Pass the content to be wrapped (icons, avatars, etc.) to `children`, and the badge is displayed at its top-right corner.

```ts
new Badge({ count: 5, children: new IconBell() })
new Badge({ dot: true, children: new IconBell() })
```

When `count` exceeds `max` (default 99), `max+` is displayed.

<br>

```demo @docs/pages/demos/badge/demo1.ts
```

<br>

## Standalone Mode

When `children` is not passed, the badge is displayed independently as a numeric dot.

```ts
new Badge({ count: 6 })
new Badge({ count: 100 })            // 显示 99+
new Badge({ count: 0, showZero: true })  // 显示 0
```

<br>

```demo @docs/pages/demos/badge/demo2.ts
```

<br>

## Advanced Usage

Supports position offset (`offset`), click callback (`onClick`) and hiding (`hidden`).

```ts
new Badge({ count: 5, offset: [2, 2], children: new IconBell() })
new Badge({ count: 8, children: new IconBell(), onClick: () => showInfo('点击了徽标') })
new Badge({ count: 8, hidden: true, children: new IconBell() })
```

<br>

```demo @docs/pages/demos/badge/demo3.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| count | `number` | `0` | Count to display |
| max | `number` | `99` | Max cap for the count, displays `max+` when exceeded |
| dot | `boolean` | `false` | Pure red dot mode, does not display a number |
| type | `BadgeType` | `danger` | Color: `danger` `primary` `success` `warning` `info` |
| showZero | `boolean` | `false` | Whether to display when `count` is 0 |
| hidden | `boolean` | `false` | Whether to hide the badge |
| offset | `[number, number]` | — | Position offset `[horizontal, vertical]` |
| children | `SubModulesOpt` | — | Content to be wrapped; the badge is displayed independently when not passed |
| onClick | `(evt: MouseEvent) => void` | — | Callback when the badge is clicked |
