---
title: Modal
order: 33
category: Feedback
icon: fa-window-maximize
description: Modal component for confirming important information.
---

# Modal

Modal is used to confirm important information.

## Basic Usage

```ts
showModal({
  title: 'Title',
  body: 'Modal content',
  buttons: { confirm: 'OK' },
  onConfirm: () => console.log('confirmed')
})
```

<br>

```demo @docs/pages/demos/modal/demo1.ts
```

<br>

## Confirm Dialog

Two calling styles are supported:

Style 1 (string): returns `Promise<boolean>`, suitable for chained calls.

```ts
showConfirm('Confirm delete?').then(result => {
  if (result) {
    console.log('confirmed')
  }
})
```

Style 2 (object): notifies the result via callback, suitable for handling subsequent logic in the callback.

```ts
showConfirm({
  msg: 'Confirm delete?',
  onConfirm: () => console.log('confirmed'),
  onCancel: () => console.log('cancelled')
})
```

<br>

```demo @docs/pages/demos/modal/demo3.ts
```

<br>

## Alert Dialog

Two calling styles are supported:

Style 1 (string): returns `Promise<void>`, resolves after closing.

```ts
showAlert('Warning message').then(() => {
  console.log('closed')
})
```

Style 2 (object): notifies via the `onConfirm` callback.

```ts
showAlert({
  msg: 'Warning message',
  onConfirm: () => console.log('closed')
})
```

<br>

```demo @docs/pages/demos/modal/demo2.ts
```

<br>

## Custom Buttons

Customize the text of the confirm and close buttons via `buttons`. The handle returned by `showModal` contains a `close` method, which can be used to manually close the dialog in callbacks.

```ts
const modal = showModal({
  title: 'Modal Title',
  body: 'Modal content',
  buttons: { confirm: 'Submit', cancel: 'Close' },
  onConfirm: () => {
    modal.close()
  }
})
```

<br>

```demo @docs/pages/demos/modal/demo4.ts
```

<br>

## Custom Footer

Pass a custom module via `footer` to completely replace the footer button area, suitable for scenarios requiring complex operations.

```ts
showModal({
  title: 'Save changes?',
  body: 'You have unsaved changes. What would you like to do?',
  footer: new HBox({
    gap: 12,
    children: [
      new Button({ text: 'Save', type: 'primary', onClick: () => console.log('saved') }),
      new Button({ text: 'Discard', type: 'warning', onClick: () => console.log('discarded') }),
      new Button({ text: 'Cancel', onClick: () => console.log('cancelled') })
    ]
  })
})
```

<br>

```demo @docs/pages/demos/modal/demo5.ts
```

<br>

## Fully Custom Content

When `replaceByBody: true` is set, the entire modal (title, buttons, footer) is replaced by the body, and the container no longer attaches appearance styles such as background and border radius — the appearance is fully customized by the body, suitable for fully custom scenarios such as image preview and custom panels. If a card effect is needed, add the styles to the body itself.

```ts
const modal = showModal({
  replaceByBody: true,
  body: add => {
    add({
      style: {
        background: 'var(--bg-card)',
        borderRadius: '32px',
        padding: '24px'
      },
      children: new VBox({
        gap: 12,
        children: [
          { tag: 'h3', innerText: 'Custom Title' },
          'The modal header, buttons and footer are replaced by this body.',
          new Button({ text: 'Close', onClick: () => modal.close() })
        ]
      })
    })
  }
})
```

<br>

```demo @docs/pages/demos/modal/demo6.ts
```

<br>

## Parameters

### showModal

| Parameter | Type | Default | Description |
|------|------|--------|------|
| title | `string` | — | Title |
| titleIcon | `Module` | — | Title icon |
| body | `SubModulesOpt` | — | Body content |
| buttons | `{ confirm?: string; cancel?: string }` | — | Button configuration |
| closeBtn | `boolean` | `true` | Whether to show the close button |
| replaceByBody | `boolean` | `false` | Replace the entire modal content with body; the container no longer attaches background and border radius, and the appearance is customized by body |
| className | `string` | — | Custom class appended to the modal container, can override default styles |
| width | `number` | — | Custom width (pixels) |
| footer | `ConvertibleModule` | — | Custom footer that completely replaces the button area, takes priority over buttons |
| onConfirm | `() => void` | — | Confirm callback |
| onClose | `() => void` | — | Close callback |
| onShown | `() => void` | — | Triggered after the modal entrance animation completes |

### showAlert

| Parameter | Type | Default | Description |
|------|------|--------|------|
| msg | `string` | — | Alert content |
| onConfirm | `() => void` | — | Confirm callback |

### showConfirm

| Parameter | Type | Default | Description |
|------|------|--------|------|
| msg | `string` | — | Confirm content |
| onConfirm | `() => void` | — | Confirm callback |
| onCancel | `() => void` | — | Cancel callback |

## Return Value

| Function | Return Value | Description |
|------|--------|------|
| showModal | `ModalHandle` | Modal handle, containing the `close` method |
| showAlert | `Promise<void>` | Resolves after closing |
| showConfirm | `Promise<boolean>` | Resolves `true` on confirm, `false` on cancel |
