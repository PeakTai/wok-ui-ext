---
title: 轻提示
order: 38
category: 反馈
icon: fa-comment
description: 轻提示组件，用于消息通知。
---

# 轻提示

轻提示（Toast）用于消息通知，自动弹出并在指定时间后消失。

## 基本用法

```ts
showToast({ type: 'success', text: 'Operation successful' })
showToast({ type: 'error', text: 'Operation failed' })
showToast({ type: 'warning', text: 'Warning message' })
showToast({ type: 'info', text: 'Info message' })
```

<br>

```demo @docs/pages/demos/toast/demo1.ts
```

<br>

## 快捷方法

```ts
showSuccess('Success')
showError('Error')
showWarning('Warning')
showInfo('Info')
```

<br>

## 自定义时长

```ts
showToast({
  type: 'success',
  text: 'Success',
  duration: 5000
})
```

<br>

## API

### showToast

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'success' \| 'warning' \| 'error' \| 'info'` | — | 消息类型 |
| text | `string` | — | 消息内容 |
| duration | `number` | `3000` | 持续时间（毫秒） |

### 快捷函数

| 函数 | 参数 | 说明 |
|------|------|------|
| showSuccess | `text: string` | 显示成功消息 |
| showError | `errMsg: any` | 显示错误消息 |
| showWarning | `errMsg: any` | 显示警告消息 |
| showInfo | `text: string` | 显示信息消息 |
