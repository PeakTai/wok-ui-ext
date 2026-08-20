---
title: Text
order: 11
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
| text | `string` | — | Text content |
| align | `'left' \| 'center' \| 'right'` | — | Alignment |
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
