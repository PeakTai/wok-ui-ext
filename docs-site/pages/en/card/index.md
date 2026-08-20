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
  header: 'Card Header',
  content: 'Card content',
  footer: 'Card Footer'
})
```

<br>

```demo @docs/pages/demos/card/demo2.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| header | `SubModulesOpt` | — | Card header content |
| content | `SubModulesOpt` | — | Card body content |
| footer | `SubModulesOpt` | — | Card footer content |
| classNames | `string[]` | — | Additional CSS class names |
