---
title: 导航菜单
order: 23
category: 导航
icon: fa-bars
description: 导航菜单组件，支持多级嵌套和折叠模式。
---

# 导航菜单

导航菜单（Menu）支持多级嵌套、图标、折叠模式，适用于侧边栏导航。

## 基本用法

```ts
new Menu({
  items: [
    { key: 'dashboard', label: 'Dashboard' },
    {
      key: 'system', label: 'System',
      children: [
        { key: 'basic', label: 'Basic Settings' },
        { key: 'security', label: 'Security' }
      ]
    }
  ],
  selectedKey: 'dashboard',
  onClick: key => showInfo(`Menu clicked: ${key}`)
})
```

<br>

```demo @docs/pages/demos/menu/demo1.ts
```

<br>

## 带图标

```ts
new Menu({
  items: [
    { key: 'users', icon: new IconUser(), label: 'Users' },
    { key: 'tags', icon: new IconTag(), label: 'Tags' },
    {
      key: 'system', icon: new IconFolder(), label: 'System',
      children: [
        { key: 'basic', icon: new IconEdit(), label: 'Basic Settings' },
        { key: 'security', icon: new IconLock(), label: 'Security' }
      ]
    }
  ],
  selectedKey: 'users',
  onClick: key => showInfo(`Menu clicked: ${key}`)
})
```

<br>

```demo @docs/pages/demos/menu/demo2.ts
```

<br>

## 折叠模式

```ts
new Menu({
  collapsed: true,
  items: [
    { key: 'users', icon: new IconUser(), label: 'Users' },
    { key: 'tags', icon: new IconTag(), label: 'Tags' },
    {
      key: 'system', icon: new IconFolder(), label: 'System',
      children: [
        { key: 'basic', icon: new IconEdit(), label: 'Basic Settings' },
        { key: 'security', icon: new IconLock(), label: 'Security' }
      ]
    }
  ],
  selectedKey: 'users',
  onClick: key => showInfo(`Menu clicked: ${key}`)
})
```

<br>

```demo @docs/pages/demos/menu/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `MenuItemData[]` | — | 菜单项数据 |
| selectedKey | `string` | — | 当前选中项 key |
| collapsed | `boolean` | `false` | 是否折叠 |
| width | `number` | `240` | 菜单宽度（px，仅支持数字） |
| onClick | `(key: string) => void` | — | 点击回调 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| setSelectedKey | `key: string` | `void` | 设置选中项 |
| setCollapsed | `collapsed: boolean` | `void` | 设置折叠模式 |
| getSelectedKey | — | `string \| undefined` | 获取当前选中 key |

## 类型

```ts
interface MenuItemData {
  key: string
  label: string
  icon?: Module
  children?: MenuItemData[]
}
```
