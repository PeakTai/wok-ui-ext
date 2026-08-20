---
title: Switch
order: 64
category: Data Entry
icon: fa-toggle-on
description: Switch component for toggling a single setting on or off.
---

# Switch

Switch is used to toggle between two states, commonly used to turn a feature on or off.

## Basic Usage

The simplest switch; the `checked` property controls the default state.

```ts
new Switch({})
new Switch({ checked: true })
```

<br>

```demo @docs/pages/demos/switch/demo1.ts
```

<br>

## With Label

Add text to the switch via the `label` property.

```ts
new Switch({ label: 'Wi-Fi' })
new Switch({ label: 'Bluetooth', checked: true })
```

<br>

```demo @docs/pages/demos/switch/demo2.ts
```

<br>

## Disabled State

Set `disabled: true` to disable the switch and prevent user interaction.

```ts
new Switch({ disabled: true })
new Switch({ disabled: true, checked: true })
new Switch({ label: 'Disabled Switch', disabled: true })
```

<br>

```demo @docs/pages/demos/switch/demo3.ts
```

<br>

## Event Listening

Listen for switch state changes via the `onChange` callback.

```ts
new Switch({
  label: 'Toggle me',
  onChange: checked => {
    showInfo(`Switch is now ${checked ? 'ON' : 'OFF'}`)
  }
})
```

<br>

```demo @docs/pages/demos/switch/demo4.ts
```

<br>

## Programmatic Control

Control the switch state externally via the `setChecked()` method, and get the current state with `isChecked()`.

```ts
const sw = new Switch({ label: 'Controlled Switch' })
sw.setChecked(true)
const checked = sw.isChecked()
```

<br>

```demo @docs/pages/demos/switch/demo5.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| label | `string` | — | Switch label text |
| checked | `boolean` | `false` | Whether selected by default |
| disabled | `boolean` | `false` | Whether disabled |
| onChange | `(checked: boolean) => void` | — | Callback when toggled |

## Methods

| Method | Parameters | Return value | Description |
|--------|------|--------|------|
| setChecked | `checked: boolean` | `void` | Sets the selected state of the switch |
| isChecked | — | `boolean` | Gets whether it is currently selected |
