---
title: 标签页
order: 26
category: 导航
icon: fa-folder
description: 标签页组件用于在多个内容视图之间切换。
---

# 标签页

标签页（Tabs）用于在同一区域内切换多个内容视图，一次只展示一个标签页的内容。

## 基本用法

默认激活第一个未禁用的标签页，点击标签即可切换内容。

```ts
new Tabs({
  items: [
    { key: 'overview', label: '概览', content: '概览内容' },
    { key: 'detail', label: '详情', content: '详情内容' },
    { key: 'settings', label: '设置', content: '设置内容' }
  ]
})
```

<br>

```demo @docs/pages/demos/tabs/demo1.ts
```

<br>

## 指定默认激活项

通过 `activeKey` 指定初始激活的标签页，切换时触发 `onChange`，参数为标签页的 key。

```ts
new Tabs({
  items: [
    { key: 'a', label: '标签 A', content: '内容 A' },
    { key: 'b', label: '标签 B', content: '内容 B' }
  ],
  activeKey: 'b',
  onChange: key => showInfo(`切换到 ${key}`)
})
```

<br>

```demo @docs/pages/demos/tabs/demo2.ts
```

<br>

## 禁用标签页

设置 `disabled: true` 禁用标签页，禁用项不可点击；未指定 `activeKey` 时会自动跳过禁用项。

```ts
new Tabs({
  items: [
    { key: 'a', label: '可用', content: '可用内容' },
    { key: 'b', label: '已禁用', content: '不可见内容', disabled: true }
  ]
})
```

<br>

```demo @docs/pages/demos/tabs/demo3.ts
```

<br>

## 惰性内容与编程控制

`content` 支持传入函数，在标签页首次激活时才渲染，并按 key 缓存渲染结果。可通过 `setActiveKey()` 从外部切换标签页。

```ts
const tabs = new Tabs({
  items: [
    { key: 'a', label: '标签 A', content: () => '内容 A' },
    { key: 'b', label: '标签 B', content: () => '内容 B' }
  ]
})

tabs.setActiveKey('b')
```

<br>

```demo @docs/pages/demos/tabs/demo4.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `TabsItem[]` | — | 标签页列表 |
| activeKey | `string` | 第一个未禁用的项 | 初始激活的标签页 key |
| onChange | `(key: string) => void` | — | 标签切换回调，参数为切换后的 key |

### TabsItem

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| key | `string` | — | 唯一标识 |
| label | `SubModulesOpt` | — | 标签页标题 |
| content | `ConvertibleModule \| (() => ConvertibleModule)` | — | 标签页内容，传函数时惰性渲染 |
| disabled | `boolean` | `false` | 是否禁用 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| setActiveKey | `key: string` | `void` | 设置当前激活的标签页，禁用或不存在的 key 会被忽略 |
