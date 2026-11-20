---
title: Card
order: 42
category: Data Display
icon: fa-window-maximize
description: Card component, used to display grouped information.
---

# Card

Card is used to display grouped information.

## Basic Usage

```ts
new Card({
  content: 'Card content'
})
```

<br>

```demo @docs/pages/demos/card/demo1.ts
```

<br>

## With Header and Footer

```ts
new Card({
  header: new Title('Card Header'),
  content: 'Card content',
  footer: 'Card Footer'
})
```

> It is recommended to pass `new Title()` to `header` as the card title for consistent heading styling.

<br>

```demo @docs/pages/demos/card/demo2.ts
```

<br>

## Inner Card

When displaying multi-level information inside a card (for example, each comment in a comment card), set `type` to `inner`. The inner card uses a darker background color and shows no shadow, including on hover.

```ts
new Card({
  header: new Title('Comments'),
  content: new Card({
    type: 'inner',
    content: 'Comment content'
  })
})
```

<br>

```demo @docs/pages/demos/card/demo3.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| type | `'inner'` | — | Card type. `inner` renders an inner card for multi-level structures inside a card |
| header | `SubModulesOpt` | — | Card header content |
| content | `SubModulesOpt` | — | Card body content |
| footer | `SubModulesOpt` | — | Card footer content |
| classNames | `string[]` | — | Additional CSS class names |
