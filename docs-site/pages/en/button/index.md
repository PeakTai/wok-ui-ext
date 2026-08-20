---
title: Button
order: 10
category: General
icon: fa-hand-pointer
description: The Button component is used to trigger actions or submit forms.
---

# Button

A button is used to trigger an action, such as submitting a form, opening a modal, or navigating.

## Button Types

Set different button styles via the `type` property.

```ts
new Button({ text: 'Primary', type: 'primary' })
new Button({ text: 'Default', type: 'default' })
new Button({ text: 'Danger', type: 'danger' })
```

<br>

```demo @docs/pages/demos/button/demo1.ts
```

<br>

## Button Sizes

Control the button size via the `size` property, supporting `small`, `default` (default), and `large`.

```ts
new Button({ text: 'Small', size: 'small', type: 'primary' })
new Button({ text: 'Default', type: 'primary' })
new Button({ text: 'Large', size: 'large', type: 'primary' })
```

<br>

```demo @docs/pages/demos/button/demo2.ts
```

<br>

## Disabled State

Set `disabled: true` to disable the button.

```ts
new Button({ text: 'Disabled', disabled: true })
```

<br>

```demo @docs/pages/demos/button/demo3.ts
```

<br>

## Block Button

Set `block: true` to make the button fill the full width of its parent container.

```ts
new Button({ text: 'Block Button', type: 'primary', block: true })
```

<br>

```demo @docs/pages/demos/button/demo4.ts
```

<br>

## Click Event

Handle clicks via the `onClick` callback.

```ts
new Button({
  text: 'Click me',
  type: 'primary',
  onClick: () => showSuccess('Operation successful')
})
```

<br>

```demo @docs/pages/demos/button/demo5.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| text | `string` | — | Button text |
| type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'secondary' \| 'dashed' \| 'ghost'` | `'default'` | Button type |
| size | `'small' \| 'default' \| 'large'` | `'default'` | Button size |
| disabled | `boolean` | `false` | Whether it is disabled |
| block | `boolean` | `false` | Whether it fills the full width of the parent container |
| formType | `'submit' \| 'reset'` | — | Form submission type |
| icon | `SvgIcon \| RemoteSvgIcon` | — | Button icon |
| onClick | `(evt: MouseEvent) => void` | — | Click callback |
