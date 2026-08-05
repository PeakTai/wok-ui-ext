---
title: 下拉菜单
order: 22
category: 导航
icon: fa-chevron-down
description: 下拉菜单组件，用于触发下拉操作。
---

# 下拉菜单

下拉菜单（Dropdown）用于触发下拉操作。

## 基本用法

```ts
new Dropdown({
  children: 'Menu',
  items: [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' }
  ],
  onSelect: (index) => showInfo(`Option ${index + 1} selected`)
})
```

<br>

```demo @docs/pages/demos/dropdown/demo1.ts
```

<br>

## 带图标

```ts
new Dropdown({
  children: 'Menu',
  items: [
    { text: 'Edit', icon: new IconEdit() },
    { text: 'Open', icon: new IconFolderOpen() },
    { text: 'Lock', icon: new IconLock() }
  ],
  onSelect: (index) => showInfo(`Option ${index + 1} selected`)
})
```

<br>

```demo @docs/pages/demos/dropdown/demo2.ts
```

<br>

## 右对齐

```ts
new Dropdown({
  align: 'right',
  children: 'Menu',
  items: [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' }
  ],
  onSelect: (index) => showInfo(`Option ${index + 1} selected`)
})
```

<br>

```demo @docs/pages/demos/dropdown/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | `SubModulesOpt` | — | 触发元素 |
| items | `{ icon?: IconInput; text: string; active?: boolean }[]` | — | 菜单项列表 |
| align | `'left' \| 'right'` | `left` | 对齐方式 |
| onSelect | `(index: number) => void` | — | 选择回调 |
