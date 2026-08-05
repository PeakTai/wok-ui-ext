---
title: 文本
order: 11
category: 通用
icon: fa-font
description: 文本组件，提供多种预设样式。
---

# 文本

文本（Text）组件提供多种预设样式，用于不同层级的文本展示。

## 标题

```ts
new TitleLarge('Large Title')
new Title('Standard Title')
new Subtitle('Subtitle')
```

<br>

```demo @docs/pages/demos/text/demo1.ts
```

<br>

## 正文

```ts
new BodyText('Body text')
new SecondaryText('Secondary text')
new TertiaryText('Tertiary text')
```

<br>

```demo @docs/pages/demos/text/demo4.ts
```

<br>

## 尺寸

```ts
new SmallText('Small text')
new TinyText('Tiny text')
```

<br>

```demo @docs/pages/demos/text/demo5.ts
```

<br>

## 状态

```ts
new MutedText('Muted text')
new DisabledText('Disabled text')
new StrongText('Strong text')
```

<br>

```demo @docs/pages/demos/text/demo6.ts
```

<br>

## 对齐方式

通过 `align` 参数设置文本对齐方式，支持 `left`、`center`、`right`。

```ts
new BodyText({ text: 'Left Aligned', align: 'left' })
new BodyText({ text: 'Center Aligned', align: 'center' })
new BodyText({ text: 'Right Aligned', align: 'right' })
```

<br>

```demo @docs/pages/demos/text/demo2.ts
```

<br>

## 点击事件

通过 `onClick` 回调处理文本点击。

```ts
new BodyText({
  text: 'Click me',
  onClick: () => showSuccess('Text clicked')
})
```

<br>

```demo @docs/pages/demos/text/demo3.ts
```

<br>

## 参数

所有文本组件支持相同的参数：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 文本内容 |
| align | `'left' \| 'center' \| 'right'` | — | 对齐方式 |
| onClick | `(evt: MouseEvent) => void` | — | 点击回调 |

## 组件列表

| 组件 | 标签 | 用途 |
|------|------|------|
| TitleLarge | h1 | 页面主标题 |
| Title | h2 | 卡片/区域标题 |
| Subtitle | h3 | 分类标题 |
| BodyText | span | 主要内容 |
| SecondaryText | span | 辅助信息 |
| TertiaryText | span | 备注信息 |
| SmallText | span | 标签、时间戳 |
| TinyText | span | 角标、提示 |
| MutedText | span | 占位符、非重要信息 |
| DisabledText | span | 禁用状态文字 |
| StrongText | span | 重点突出 |
