---
title: 按钮
order: 10
category: 通用
icon: fa-hand-pointer
description: 按钮组件用于触发操作或提交表单。
---

# 按钮组件

按钮用于触发一个操作，如提交表单、打开弹窗、导航等。

## 按钮类型

通过 `type` 属性设置不同的按钮样式。

```ts
new Button({ text: 'Primary', type: 'primary' })
new Button({ text: 'Default', type: 'default' })
new Button({ text: 'Danger', type: 'danger' })
```

<br>

```demo @docs/pages/demos/button/demo1.ts
```

<br>

## 按钮大小

通过 `size` 属性控制按钮尺寸，支持 `small`、`default`（默认）、`large`。

```ts
new Button({ text: 'Small', size: 'small', type: 'primary' })
new Button({ text: 'Default', type: 'primary' })
new Button({ text: 'Large', size: 'large', type: 'primary' })
```

<br>

```demo @docs/pages/demos/button/demo2.ts
```

<br>

## 禁用状态

设置 `disabled: true` 禁用按钮。

```ts
new Button({ text: 'Disabled', disabled: true })
```

<br>

```demo @docs/pages/demos/button/demo3.ts
```

<br>

## 块级按钮

设置 `block: true` 使按钮占满父容器宽度。

```ts
new Button({ text: 'Block Button', type: 'primary', block: true })
```

<br>

```demo @docs/pages/demos/button/demo4.ts
```

<br>

## 点击事件

通过 `onClick` 回调处理点击。

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

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 按钮文本 |
| type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'secondary' \| 'dashed' \| 'ghost'` | `'default'` | 按钮类型 |
| size | `'small' \| 'default' \| 'large'` | `'default'` | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| block | `boolean` | `false` | 是否占满父容器宽度 |
| formType | `'submit' \| 'reset'` | — | 表单提交类型 |
| icon | `SvgIcon \| RemoteSvgIcon` | — | 按钮图标 |
| onClick | `(evt: MouseEvent) => void` | — | 点击回调 |
