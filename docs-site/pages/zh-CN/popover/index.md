---
title: 气泡卡片
order: 35
category: 反馈
icon: fa-comment
description: 气泡卡片组件，点击触发显示浮层。
---

# 气泡卡片

气泡卡片（Popover）点击触发元素显示浮层，点击外部或按 Esc 关闭。

## 组件式用法

```ts
new Popover({
  children: new Button({ text: 'Click me' }),
  content: 'Popover content'
})
```

<br>

```demo @docs/pages/demos/popover/demo1.ts
```

<br>

## 不同位置

```ts
new Popover({
  children: new Button({ text: 'Top' }),
  content: 'Content',
  placement: 'top'
})
```

支持的位置：`top`、`topLeft`、`topRight`、`bottom`、`bottomLeft`、`bottomRight`、`left`、`right`

<br>

```demo @docs/pages/demos/popover/demo2.ts
```

<br>

## 事件触发

在任意点击事件中调用 `showPopover`：

```ts
new Button({
  text: 'Click me',
  onClick: (e: MouseEvent) => {
    showPopover({
      target: e.target as HTMLElement,
      content: 'Dynamic content'
    })
  }
})
```

<br>

## 绑定已有元素

使用 `attachPopover` 给已有元素绑定点击触发：

```ts
attachPopover({
  target: document.getElementById('btn'),
  content: 'Popover content'
})
```

<br>

## 参数

### Popover 组件 / attachPopover

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | `SubModulesOpt` | — | 触发元素（组件式） |
| target | `HTMLElement` | — | 目标元素（事件/绑定式） |
| content | `SubModulesOpt` | — | 弹出内容 |
| placement | `PopoverPlacement` | `bottom` | 弹出位置 |
| width | `number` | — | 宽度（px） |
| onClose | `() => void` | — | 关闭回调 |

### showPopover

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| target | `HTMLElement` | — | 定位目标元素 |
| content | `SubModulesOpt` | — | 弹出内容 |
| placement | `PopoverPlacement` | `bottom` | 弹出位置 |
| width | `number` | — | 宽度（px） |
| onClose | `() => void` | — | 关闭回调 |

## 类型

```ts
type PopoverPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'
```
