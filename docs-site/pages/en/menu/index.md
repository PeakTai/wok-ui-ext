---
title: Menu
order: 23
category: Navigation
icon: fa-bars
description: Menu component, supporting multi-level nesting and collapsed mode.
---

# Menu

Menu supports multi-level nesting, icons, and collapsed mode, suitable for sidebar navigation.

## Basic Usage

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

## With Icons

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

## Collapsed Mode

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

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `MenuItemData[]` | — | Menu item data |
| selectedKey | `string` | — | Key of the currently selected item |
| collapsed | `boolean` | `false` | Whether to collapse |
| onClick | `(key: string) => void` | — | Click callback |

## Methods

| Method | Parameters | Return | Description |
|--------|------|--------|------|
| setSelectedKey | `key: string` | `void` | Set the selected item |
| setCollapsed | `collapsed: boolean` | `void` | Set collapsed mode |
| getSelectedKey | — | `string \| undefined` | Get the currently selected key |

## Types

```ts
interface MenuItemData {
  key: string
  label: string
  icon?: Module
  children?: MenuItemData[]
}
```
