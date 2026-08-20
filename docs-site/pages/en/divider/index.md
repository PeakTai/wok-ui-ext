---
title: Divider
order: 45
category: Data Display
icon: fa-minus
description: Divider is used to separate different content areas.
---

# Divider

Divider is used to separate different content areas on a page, supporting horizontal/vertical directions, text, dashed lines and other styles.

## Horizontal Divider

The default `direction: 'horizontal'` is used to separate upper and lower blocks.

```ts
new Divider()
```

<br>

```demo @docs/pages/demos/divider/demo1.ts
```

<br>

## Divider with Text

Display text in the middle via the `text` parameter.

```ts
new Divider({ text: 'TEXT' })
```

<br>

```demo @docs/pages/demos/divider/demo2.ts
```

<br>

## Dashed Divider

Set `dashed: true` to use the dashed style, which can be combined with text.

```ts
new Divider({ dashed: true })
new Divider({ text: 'DASHED', dashed: true })
```

<br>

```demo @docs/pages/demos/divider/demo3.ts
```

<br>

## Vertical Divider

`direction: 'vertical'` is used to separate inline elements; it supports dashed lines, and the spacing on both sides is controlled by the `HSpacer` shim.

```ts
new Divider({ direction: 'vertical' })
new Divider({ direction: 'vertical', dashed: true })
```

<br>

```demo @docs/pages/demos/divider/demo4.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| text | `string` | — | Text displayed in the middle in horizontal mode |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
| dashed | `boolean` | `false` | Whether to use dashed lines |
| color | `string` | — | Custom line color |
