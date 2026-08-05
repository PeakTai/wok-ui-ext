---
title: 进度条
order: 36
category: 反馈
icon: fa-tasks
description: 进度条组件，展示任务完成进度。
---

# 进度条

进度条（Progress）用于展示任务完成进度。

## 基本用法

```ts
new Progress({ progress: 75 })
new Progress({ label: 'Task', progress: 50 })
```

<br>

```demo @docs/pages/demos/progress/demo1.ts
```

<br>

## 显示进度数字

```ts
new Progress({ label: 'Progress', progress: 85, showProgress: true })
```

<br>

## 不同颜色

```ts
new Progress({ progress: 100, color: 'success' })
new Progress({ progress: 80, color: 'warning' })
new Progress({ progress: 40, color: 'danger' })
```

<br>

```demo @docs/pages/demos/progress/demo2.ts
```

<br>

## 自定义文本

```ts
new Progress({ progress: 85, text: '85/100 points' })
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `SubModulesOpt` | — | 进度条标签 |
| progress | `number` | — | 进度值（0-100） |
| showProgress | `boolean` | `false` | 是否显示进度百分比 |
| color | `'primary' \| 'success' \| 'warning' \| 'danger'` | `primary` | 进度条颜色 |
| text | `string` | — | 自定义进度文本，替代百分比显示 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| setProgress | `progress: number, text?: string` | `void` | 更新进度值 |
