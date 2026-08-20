---
title: Tag
order: 52
category: Data Display
icon: fa-tag
description: Tag component for status marking and categorized display.
---

# Tag

Tag is used for status marking and categorized display, expressing data status through semantic types.

## Basic Usage

Specify the semantic type via `type`; the default is `default`.

```ts
new Tag({ text: 'Tag Name' })
new Tag({ text: 'Success', type: 'success' })
```

<br>

```demo @docs/pages/demos/tag/demo1.ts
```

<br>

## Styles

Supports the outline style (`plain`), size (`size`) and a custom icon (`icon`).

```ts
new Tag({ text: 'Outline', plain: true })
new Tag({ text: 'Small', size: 'small' })
new Tag({ text: 'With Icon', icon: new IconEdit() })
```

<br>

```demo @docs/pages/demos/tag/demo2.ts
```

<br>

## Interactive

### Selectable

With `checkable` enabled, clicking toggles the selected state; listen for changes via `onChange`, and `selected` is used as the initial selected value. The `setSelected()` / `isSelected()` methods are supported.

```ts
new Tag({
  text: 'Selectable',
  checkable: true,
  selected: false,
  onChange: selected => showInfo(`选中状态：${selected}`)
})
```

### Closable

With `closable` enabled, a close icon is shown; clicking it triggers `onClose` and destroys the tag.

```ts
new Tag({ text: 'Closable', closable: true })
new Tag({ text: 'With Handler', closable: true, onClose: () => showSuccess('关闭成功') })
```

<br>

```demo @docs/pages/demos/tag/demo3.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| text | `SubModulesOpt` | — | Tag content |
| type | `TagType` | `default` | Semantic type: `default` `primary` `success` `warning` `danger` `info` |
| plain | `boolean` | `false` | Whether to use the outline style (transparent background + semantic color border) |
| size | `TagSize` | `default` | Size: `small` `default` `large` |
| round | `boolean` | `true` | Whether to use rounded corners |
| closable | `boolean` | `false` | Whether closable; shows a close icon |
| icon | `IconInput` | — | Tag icon |
| checkable | `boolean` | `false` | Whether selectable; clicking toggles the selected state when enabled |
| selected | `boolean` | `false` | Initial selected state; only effective when `checkable` |
| disabled | `boolean` | `false` | Whether disabled |
| onClick | `(evt: MouseEvent) => void` | — | Click callback |
| onChange | `(selected: boolean) => void` | — | Selected state change callback; only triggered when `checkable` |
| onClose | `(evt: MouseEvent) => void` | — | Close callback; triggered when clicking the close icon, after which the tag is destroyed |
