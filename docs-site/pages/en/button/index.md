---
title: Button
order: 12
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

## Icon Button

A button can have both an `icon` and `text` (rendering an icon + text combination), or just an `icon` (rendering an icon-only button).

### Icon + Text

Pass both `icon` and `text` to render an icon followed by the text, arranged horizontally.

```ts
new Button({ text: 'Search', icon: new IconSearch() })
new Button({ text: 'Edit', icon: new IconEdit(), type: 'primary' })
new Button({ text: 'Upload', icon: new IconCloudUpload(), type: 'success' })
```

<br>

```demo @docs/pages/demos/button/demo7.ts
```

<br>

### Icon Only

Pass only `icon` (without `text`) to render an icon-only button, which automatically becomes circular.
It is recommended to provide an accessible label via `ariaLabel`.

```ts
new Button({ icon: new IconSearch(), ariaLabel: 'Search' })
new Button({ icon: new IconEdit(), type: 'primary', ariaLabel: 'Edit' })
new Button({ icon: new IconTimes(), type: 'danger', ariaLabel: 'Close' })
```

<br>

```demo @docs/pages/demos/button/demo6.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| text | `string` | — | Button text; when omitted together with an `icon`, renders as an icon-only button |
| type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'secondary' \| 'dashed' \| 'ghost'` | `'default'` | Button type |
| size | `'small' \| 'default' \| 'large'` | `'default'` | Button size |
| disabled | `boolean` | `false` | Whether it is disabled |
| block | `boolean` | `false` | Whether it fills the full width of the parent container |
| formType | `'submit' \| 'reset'` | — | Form submission type |
| icon | [`IconInput`](/en/icons.html) | — | Button icon |
| ariaLabel | `string` | — | Accessible label, recommended for icon-only buttons |
| classNames | `string[]` | — | Custom class names appended to the button element |
| attrs | `Record<string, string>` | — | Custom attributes appended to the button element (e.g. aria-*, data-*) |
| onClick | `(evt: MouseEvent) => void` | — | Click callback |
