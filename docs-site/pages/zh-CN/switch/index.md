---
title: 开关
order: 64
category: 数据录入
icon: fa-toggle-on
description: 开关组件用于切换单个设置的开启或关闭状态。
---

# 开关组件

开关（Switch）用于在两种状态之间切换，常用于触发某个功能的开启或关闭。

## 基本用法

最简单的开关，通过 `checked` 属性控制默认状态。

```ts
new Switch({})
new Switch({ checked: true })
```

<br>

```demo @docs/pages/demos/switch/demo1.ts
```

<br>

## 带标签

通过 `label` 属性为开关添加文字说明。

```ts
new Switch({ label: 'Wi-Fi' })
new Switch({ label: 'Bluetooth', checked: true })
```

<br>

```demo @docs/pages/demos/switch/demo2.ts
```

<br>

## 禁用状态

设置 `disabled: true` 禁用开关，阻止用户操作。

```ts
new Switch({ disabled: true })
new Switch({ disabled: true, checked: true })
new Switch({ label: 'Disabled Switch', disabled: true })
```

<br>

```demo @docs/pages/demos/switch/demo3.ts
```

<br>

## 事件监听

通过 `onChange` 回调监听开关状态变化。

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

## 编程控制

通过 `setChecked()` 方法从外部控制开关状态，`isChecked()` 获取当前状态。

```ts
const sw = new Switch({ label: 'Controlled Switch' })
sw.setChecked(true)
const checked = sw.isChecked()
```

<br>

```demo @docs/pages/demos/switch/demo5.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | — | 开关标签文字 |
| checked | `boolean` | `false` | 是否默认选中 |
| disabled | `boolean` | `false` | 是否禁用 |
| onChange | `(checked: boolean) => void` | — | 切换时的回调 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| setChecked | `checked: boolean` | `void` | 设置开关的选中状态 |
| isChecked | — | `boolean` | 获取当前是否选中 |
