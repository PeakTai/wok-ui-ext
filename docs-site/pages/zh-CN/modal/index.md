---
title: 模态框
order: 33
category: 反馈
icon: fa-window-maximize
description: 模态框组件，用于重要信息确认。
---

# 模态框

模态框（Modal）用于重要信息确认。

## 基本用法

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

## 确认对话框

支持两种调用方式：

方式一（字符串）：返回 `Promise<boolean>`，适合链式调用。

```ts
showConfirm('Confirm delete?').then(result => {
  if (result) {
    console.log('confirmed')
  }
})
```

方式二（对象）：通过回调通知结果，适合在回调中处理后续逻辑。

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

## 警告对话框

支持两种调用方式：

方式一（字符串）：返回 `Promise<void>`，关闭后 resolve。

```ts
showAlert('Warning message').then(() => {
  console.log('closed')
})
```

方式二（对象）：通过 `onConfirm` 回调通知。

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

## 自定义按钮

通过 `buttons` 自定义确认和关闭按钮的文案。`showModal` 返回的句柄包含 `close` 方法，可在回调中手动关闭弹窗。

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

## 自定义脚部

通过 `footer` 传入自定义模块完全替换脚部按钮区域，适用于需要复杂操作的场景。

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

## 完全自定义内容

设置 `replaceByBody: true` 后，整个模态框（标题、按钮、脚部）都会被 body 替换，且容器不再附加背景、圆角等外观样式，外观完全由 body 自定义，适用于图片预览、自定义面板等完全自定义场景。如需卡片效果，请由 body 自行添加样式。

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

## 参数

### showModal

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 标题 |
| titleIcon | `Module` | — | 标题图标 |
| body | `SubModulesOpt` | — | 主体内容 |
| buttons | `{ confirm?: string; cancel?: string }` | — | 按钮配置 |
| closeBtn | `boolean` | `true` | 是否显示关闭按钮 |
| replaceByBody | `boolean` | `false` | 使用 body 替换整个模态框内容，容器不再附加背景与圆角，外观由 body 自定义 |
| className | `string` | — | 追加到模态框容器上的自定义 class，可覆盖默认样式 |
| width | `number` | — | 自定义宽度（像素） |
| footer | `ConvertibleModule` | — | 自定义脚部，完全替换按钮区域，优先级高于 buttons |
| onConfirm | `() => void` | — | 确认回调 |
| onClose | `() => void` | — | 关闭回调 |
| onShown | `() => void` | — | 模态框入场动画完成后触发 |

### showAlert

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| msg | `string` | — | 警告内容 |
| onConfirm | `() => void` | — | 确认回调 |

### showConfirm

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| msg | `string` | — | 确认内容 |
| onConfirm | `() => void` | — | 确认回调 |
| onCancel | `() => void` | — | 取消回调 |

## 返回值

| 函数 | 返回值 | 说明 |
|------|--------|------|
| showModal | `ModalHandle` | 模态框句柄，包含 `close` 方法 |
| showAlert | `Promise<void>` | 关闭后 resolve |
| showConfirm | `Promise<boolean>` | 确认返回 `true`，取消返回 `false` |
