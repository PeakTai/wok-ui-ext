---
title: 上下文菜单
order: 21
category: 导航
icon: fa-bars
description: 上下文菜单组件，支持多级嵌套。
---

# 上下文菜单

上下文菜单（ContextMenu）支持多级嵌套，点击外部自动关闭。

## 基本用法

```ts
el.addEventListener('click', e => {
  showContextMenu({
    menu: [
      { label: 'Cut', callback: () => console.log('cut') },
      { label: 'Copy', callback: () => console.log('copy') },
      { label: 'Paste', callback: () => console.log('paste') }
    ],
    evt: e
  })
})
```

<br>

```demo @docs/pages/demos/context-menu/demo1.ts
```

<br>

## 带图标

```ts
showContextMenu({
  menu: [
    { label: 'Edit', icon: new IconEdit(), callback: () => {} },
    { label: 'Open', icon: new IconFolderOpen(), callback: () => {} },
    { label: 'Lock', icon: new IconLock(), callback: () => {} }
  ],
  evt: e
})
```

<br>

```demo @docs/pages/demos/context-menu/demo2.ts
```

<br>

## 子菜单

```ts
showContextMenu({
  menu: [
    { label: 'Cut', callback: () => {} },
    {
      label: 'More',
      children: [
        { label: 'Option 1', callback: () => {} },
        { label: 'Option 2', callback: () => {} }
      ]
    },
    { label: 'Paste', callback: () => {} }
  ],
  evt: e
})
```

<br>

```demo @docs/pages/demos/context-menu/demo3.ts
```

<br>

## 参数

### showContextMenu

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| menu | `ContextMenuItem[] \| ((add) => void)` | — | 菜单列表，支持数组或函数式添加 |
| evt | `MouseEvent` | — | 事件对象，用于定位 |
| position | `MenuPosition` | `cursor` | 菜单位置模式 |
| align | `MenuAlign` | `start` | 次轴对齐方式 |

## 类型

```ts
interface ContextMenuItem {
  icon?: IconInput
  label: ConvertibleModule
  active?: boolean
  callback?: () => void
  children?: ContextMenuItem[]
}

type MenuPosition = 'cursor' | 'top' | 'bottom' | 'left' | 'right'
type MenuAlign = 'start' | 'end'
```

### MenuPosition 取值说明

| 值 | 说明 |
|------|------|
| `cursor` | 跟随鼠标指针位置弹出（默认） |
| `top` | 锚定在触发元素的顶部，水平居中，空间不够时自动调整 |
| `bottom` | 锚定在触发元素的底部，水平居中，空间不够时自动调整 |
| `left` | 锚定在触发元素的左侧，垂直居中，空间不够时自动调整 |
| `right` | 锚定在触发元素的右侧，垂直居中，空间不够时自动调整 |

### MenuAlign 取值说明

| 值 | 说明 |
|------|------|
| `start` | top/bottom 时左对齐，left/right 时顶对齐（默认） |
| `end` | top/bottom 时右对齐，left/right 时底对齐 |
