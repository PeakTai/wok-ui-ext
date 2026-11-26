---
title: Text
order: 10
category: General
icon: fa-font
description: Text component with multiple preset styles.
---

# Text

The Text component provides multiple preset styles for displaying text at different levels.

## Headings

```ts
new TitleLarge('Large Title')
new Title('Standard Title')
new Subtitle('Subtitle')
```

<br>

```demo @docs/pages/demos/text/demo1.ts
```

<br>

## Embedding Icons

The `text` parameter accepts `SubModulesOpt`, so you can pass an array of modules to combine icons and text.

```ts
new Title({
  text: [new IconInfoCircle(), ' Title with icon']
})
new BodyText({
  text: [new IconInfoCircle(), ' Body text can embed icons too']
})
```

<br>

```demo @docs/pages/demos/text/demo7.ts
```

<br>

## Body Text

```ts
new BodyText('Body text')
new SecondaryText('Secondary text')
new TertiaryText('Tertiary text')
```

<br>

```demo @docs/pages/demos/text/demo4.ts
```

<br>

## Sizes

```ts
new SmallText('Small text')
new TinyText('Tiny text')
```

<br>

```demo @docs/pages/demos/text/demo5.ts
```

<br>

## States

```ts
new MutedText('Muted text')
new DisabledText('Disabled text')
new StrongText('Strong text')
```

<br>

```demo @docs/pages/demos/text/demo6.ts
```

<br>

## Alignment

Set text alignment via the `align` parameter, supporting `left`, `center`, and `right`.

```ts
new BodyText({ text: 'Left Aligned', align: 'left' })
new BodyText({ text: 'Center Aligned', align: 'center' })
new BodyText({ text: 'Right Aligned', align: 'right' })
```

<br>

```demo @docs/pages/demos/text/demo2.ts
```

<br>

## Color

Set the text color via the `color` parameter. Any valid CSS color value is supported.

The most common case is to read a color from the theme, so the text color stays consistent with the current theme:

```ts
import { getTheme, BodyText } from 'wok-ui-ext'

const { primary, success, danger } = getTheme()
new BodyText({ text: 'Primary text', color: primary })
new BodyText({ text: 'Success text', color: success })
new BodyText({ text: 'Danger text', color: danger })
```

You can also pass any color value directly:

```ts
new BodyText({ text: 'Any color', color: '#ff6b35' })
new BodyText({ text: 'Any color', color: 'rgb(120, 80, 255)' })
```

<br>

```demo @docs/pages/demos/text/demo8.ts
```

<br>

> `DisabledText` represents the disabled state. To keep the state semantics consistent, it does not support `color`.

## Click Event

Handle text clicks via the `onClick` callback.

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

## Parameters

All text components support the same parameters:

| Parameter | Type | Default | Description |
|------|------|--------|------|
| text | `SubModulesOpt` | — | Text content, supports strings, modules, or module arrays (e.g. embed icons) |
| align | `'left' \| 'center' \| 'right'` | — | Alignment |
| color | `string` | — | Text color, accepts any CSS color value; read theme colors via `getTheme()`. Not supported by `DisabledText` |
| onClick | `(evt: MouseEvent) => void` | — | Click callback |

## Component List

| Component | Tag | Usage |
|------|------|------|
| TitleLarge | h1 | Page main title |
| Title | h2 | Card/section title |
| Subtitle | h3 | Category title |
| BodyText | span | Main content |
| SecondaryText | span | Secondary information |
| TertiaryText | span | Remark information |
| SmallText | span | Labels, timestamps |
| TinyText | span | Badges, hints |
| MutedText | span | Placeholders, non-critical information |
| DisabledText | span | Disabled state text |
| StrongText | span | Emphasis |
