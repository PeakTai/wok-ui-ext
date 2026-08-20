---
title: Collapse
order: 43
category: Data Display
icon: fa-chevron-down
description: Collapse is used to group and store content, saving page space.
---

# Collapse

Collapse is used to group content into panels that users can expand/collapse to view details, effectively saving page space.

## Basic Usage

By default, multiple panels can be expanded/collapsed independently without affecting each other.

```ts
new Collapse({
  items: [
    { title: 'Panel 1', content: 'Content 1', defaultOpen: true },
    { title: 'Panel 2', content: 'Content 2' },
    { title: 'Panel 3', content: 'Content 3' }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo1.ts
```

<br>

## Accordion Mode

Set `accordion: true` to expand only one panel at a time.

```ts
new Collapse({
  accordion: true,
  items: [
    { title: 'Panel A', content: 'Only one can be open', defaultOpen: true },
    { title: 'Panel B', content: 'Opening this will close Panel A' }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo2.ts
```

<br>

## Fully Collapsible

In accordion mode, combined with `collapsible: true`, clicking an expanded panel closes it.

```ts
new Collapse({
  accordion: true,
  collapsible: true,
  items: [
    { title: 'Panel X', content: 'Click again to collapse', defaultOpen: true },
    { title: 'Panel Y', content: 'All panels can be fully collapsed' }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo3.ts
```

<br>

## Borderless Mode

Set `ghost: true` to remove the border and background, suitable for embedding in existing containers.

```ts
new Collapse({
  ghost: true,
  items: [
    { title: 'Panel 1', content: 'Content 1', defaultOpen: true }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo4.ts
```

<br>

## Disabled Panel

Panels support the `disabled` property; disabled panels cannot be expanded by clicking.

```ts
new Collapse({
  items: [
    { title: 'Normal', content: 'Works as usual' },
    { title: 'Disabled', content: 'Cannot be opened', disabled: true }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo5.ts
```

<br>

## API

### Collapse

| Parameter | Type | Default | Description |
|------|------|--------|------|
| items | `PanelOptions[]` | — | List of panels |
| accordion | `boolean` | `false` | Whether to use accordion mode (only one expanded) |
| collapsible | `boolean` | `false` | In accordion mode, clicking an expanded panel closes it |
| ghost | `boolean` | `false` | Borderless mode |
| onChange | `(activePanels: Panel[]) => void` | — | Expand/collapse callback, receives the currently expanded panels |

### PanelOptions

| Parameter | Type | Default | Description |
|------|------|--------|------|
| title | `string \| SubModulesOpt` | — | Panel title |
| content | `SubModulesOpt` | — | Panel content |
| defaultOpen | `boolean` | `false` | Expanded by default |
| disabled | `boolean` | `false` | Disabled |
