---
title: 标签
order: 52
category: 数据展示
icon: fa-tag
description: 标签组件，用于状态标记和分类。
---

# 标签

标签（Tag）用于状态标记和分类展示。

## 基本用法

```ts
new Tag({ text: 'Tag Name' })
new Tag({ text: 'Active', active: true })
```

<br>

```demo @docs/pages/demos/tag/demo1.ts
```

<br>

## 自定义图标

```ts
new Tag({ text: 'Custom', icon: new StarIcon() })
```

<br>

```demo @docs/pages/demos/tag/demo2.ts
```

<br>

## 可交互

支持编辑、删除、更多操作。

```ts
new Tag({
  text: 'Editable',
  onEdit: () => console.log('edit'),
  onDelete: () => console.log('delete'),
  onMenu: (e) => console.log('menu', e)
})
```

<br>

```demo @docs/pages/demos/tag/demo3.ts
```

<br>

## 块级标签

```ts
new Tag({ text: 'Block Tag', block: true })
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `SubModulesOpt` | — | 标签文本 |
| icon | `SvgIcon \| RemoteSvgIcon` | IconTag | 左侧图标 |
| active | `boolean` | `false` | 是否活跃状态 |
| block | `boolean` | `false` | 是否块级元素 |
| onClick | `(evt: MouseEvent) => void` | — | 点击回调 |
| onEdit | `() => void` | — | 编辑回调，显示编辑图标 |
| onDelete | `() => void` | — | 删除回调，显示删除图标 |
| onMenu | `(e: MouseEvent) => void` | — | 菜单回调，显示更多图标 |
