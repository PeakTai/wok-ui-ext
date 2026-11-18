---
title: Tabs
order: 26
category: Navigation
icon: fa-folder
description: Tabs component for switching between multiple content views.
---

# Tabs

Tabs switches between multiple content views in the same area, showing only one tab's content at a time.

## Basic Usage

The first enabled tab is active by default. Click a tab to switch its content.

```ts
new Tabs({
  items: [
    { key: 'overview', label: 'Overview', content: 'Overview content' },
    { key: 'detail', label: 'Detail', content: 'Detail content' },
    { key: 'settings', label: 'Settings', content: 'Settings content' }
  ]
})
```

<br>

```demo @docs/pages/demos/tabs/demo1.ts
```

<br>

## Specifying the Default Active Tab

Use `activeKey` to specify the initially active tab. `onChange` is triggered when the tab switches, with the tab key as its argument.

```ts
new Tabs({
  items: [
    { key: 'a', label: 'Tab A', content: 'Content A' },
    { key: 'b', label: 'Tab B', content: 'Content B' }
  ],
  activeKey: 'b',
  onChange: key => showInfo(`Switched to ${key}`)
})
```

<br>

```demo @docs/pages/demos/tabs/demo2.ts
```

<br>

## Disabled Tab

Set `disabled: true` to disable a tab. Disabled tabs cannot be clicked, and are skipped automatically when `activeKey` is not specified.

```ts
new Tabs({
  items: [
    { key: 'a', label: 'Enabled', content: 'Enabled content' },
    { key: 'b', label: 'Disabled', content: 'Hidden content', disabled: true }
  ]
})
```

<br>

```demo @docs/pages/demos/tabs/demo3.ts
```

<br>

## Lazy Content and Programmatic Control

`content` can be a function, which is rendered only when the tab is first activated and then cached by key. Use `setActiveKey()` to switch tabs programmatically.

```ts
const tabs = new Tabs({
  items: [
    { key: 'a', label: 'Tab A', content: () => 'Content A' },
    { key: 'b', label: 'Tab B', content: () => 'Content B' }
  ]
})

tabs.setActiveKey('b')
```

<br>

```demo @docs/pages/demos/tabs/demo4.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `TabsItem[]` | — | Tab list |
| activeKey | `string` | First enabled tab | Key of the initially active tab |
| onChange | `(key: string) => void` | — | Callback when a tab is switched, with the new key |

### TabsItem

| Parameter | Type | Default | Description |
|------|------|--------|------|
| key | `string` | — | Unique identifier |
| label | `SubModulesOpt` | — | Tab title |
| content | `ConvertibleModule \| (() => ConvertibleModule)` | — | Tab content; a function enables lazy rendering |
| disabled | `boolean` | `false` | Whether the tab is disabled |

## Methods

| Method | Parameters | Return value | Description |
|--------|------|--------|------|
| setActiveKey | `key: string` | `void` | Sets the active tab; disabled or unknown keys are ignored |
