---
title: Dropdown
order: 22
category: Navigation
icon: fa-chevron-down
description: Dropdown component, used to trigger dropdown operations.
---

# Dropdown

Dropdown is used to trigger dropdown operations.

## Basic Usage

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

## With Icons

```ts
new Dropdown({
  children: 'Menu',
  items: [
    { text: 'Edit', icon: () => new IconEdit() },
    { text: 'Open', icon: () => new IconFolderOpen() },
    { text: 'Lock', icon: () => new IconLock() }
  ],
  onSelect: (index) => showInfo(`Option ${index + 1} selected`)
})
```

<br>

```demo @docs/pages/demos/dropdown/demo2.ts
```

<br>

## Right Aligned

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

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| children | `SubModulesOpt` | — | Trigger element |
| items | `{ icon?: () => IconInput; text: string; active?: boolean }[]` | — | List of menu items; icon accepts a factory function, executed each time the menu opens to return a new icon instance |
| align | `'left' \| 'right'` | `left` | Alignment |
| onSelect | `(index: number) => void` | — | Selection callback |
