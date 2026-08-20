---
title: 标签
order: 52
category: 数据展示
icon: fa-tag
description: 标签组件，用于状态标记和分类展示。
---

# 标签

标签（Tag）用于状态标记和分类展示，通过语义类型表达数据状态。

## 基本用法

通过 `type` 指定语义类型，默认 `default`。

```ts
new Tag({ text: 'Tag Name' })
new Tag({ text: 'Success', type: 'success' })
```

<br>

```demo @docs/pages/demos/tag/demo1.ts
```

<br>

## 样式

支持描边样式（`plain`）、尺寸（`size`）和自定义图标（`icon`）。

```ts
new Tag({ text: 'Outline', plain: true })
new Tag({ text: 'Small', size: 'small' })
new Tag({ text: 'With Icon', icon: new IconEdit() })
```

<br>

```demo @docs/pages/demos/tag/demo2.ts
```

<br>

## 可交互

### 可选中

开启 `checkable` 后点击切换选中状态，通过 `onChange` 监听变化，`selected` 作为初始选中值。支持 `setSelected()` / `isSelected()` 方法。

```ts
new Tag({
  text: 'Selectable',
  checkable: true,
  selected: false,
  onChange: selected => showInfo(`选中状态：${selected}`)
})
```

### 可关闭

开启 `closable` 后显示关闭图标，点击后触发 `onClose` 并销毁标签。

```ts
new Tag({ text: 'Closable', closable: true })
new Tag({ text: 'With Handler', closable: true, onClose: () => showSuccess('关闭成功') })
```

<br>

```demo @docs/pages/demos/tag/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `SubModulesOpt` | — | 标签内容 |
| type | `TagType` | `default` | 语义类型：`default` `primary` `success` `warning` `danger` `info` |
| plain | `boolean` | `false` | 是否描边样式（透明底 + 语义色边框） |
| size | `TagSize` | `default` | 尺寸：`small` `default` `large` |
| round | `boolean` | `true` | 是否圆角 |
| closable | `boolean` | `false` | 是否可关闭，显示关闭图标 |
| icon | `IconInput` | — | 标签图标 |
| checkable | `boolean` | `false` | 是否可选中，开启后点击切换选中状态 |
| selected | `boolean` | `false` | 初始选中状态，仅 `checkable` 时生效 |
| disabled | `boolean` | `false` | 是否禁用 |
| onClick | `(evt: MouseEvent) => void` | — | 点击回调 |
| onChange | `(selected: boolean) => void` | — | 选中状态变化回调，仅 `checkable` 时触发 |
| onClose | `(evt: MouseEvent) => void` | — | 关闭回调，点击关闭图标时触发，标签随后被销毁 |
