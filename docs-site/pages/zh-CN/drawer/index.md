---
title: 抽屉
order: 31
category: 反馈
icon: fa-columns
description: 抽屉组件，从侧边滑出的面板。
---

# 抽屉

抽屉（Drawer）从侧边滑出的面板。

## 基本用法

```ts
const drawer = showDrawer({
  title: 'Detail',
  body: 'Drawer content'
})
```

<br>

```demo @docs/pages/demos/drawer/demo1.ts
```

<br>

## 不同方向

```ts
showDrawer({ title: 'Right', body: 'Content', placement: 'right' })
showDrawer({ title: 'Left', body: 'Content', placement: 'left' })
showDrawer({ title: 'Top', body: 'Content', placement: 'top' })
showDrawer({ title: 'Bottom', body: 'Content', placement: 'bottom' })
```

<br>

```demo @docs/pages/demos/drawer/demo2.ts
```

<br>

## 自定义宽度

```ts
showDrawer({
  title: 'Detail',
  body: 'Content',
  width: 500
})
```

<br>

```demo @docs/pages/demos/drawer/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 标题 |
| body | `SubModulesOpt` | — | 主体内容 |
| placement | `'left' \| 'right' \| 'top' \| 'bottom'` | `right` | 滑出方向 |
| width | `number` | `400` | 宽度（仅 left/right 有效） |
| replaceByBody | `boolean` | `false` | 是否用 body 完全替换内容 |
| onClose | `() => void` | — | 关闭回调 |
| onShown | `() => void` | — | 入场动画完成后回调 |

## 返回值

```ts
interface DrawerHandle {
  close: () => void
}
```
