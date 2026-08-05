---
title: 日期选择器
order: 60
category: 数据录入
icon: fa-calendar
description: 日期选择器组件用于选择日期或日期范围。
---

# 日期选择器

日期选择器（DatePicker）用于选择单个日期，日期范围选择器（DateRangePicker）用于选择日期区间。

## 基本用法

最简单的日期选择器，点击弹出日历面板。

```ts
new DatePicker({})
new DatePicker({ placeholder: 'Choose a date' })
```

<br>

```demo @docs/pages/demos/date-picker/demo1.ts
```

<br>

## 日期范围

使用 `DateRangePicker` 选择日期区间。

```ts
new DateRangePicker({})
```

<br>

```demo @docs/pages/demos/date-picker/demo2.ts
```

<br>

## 禁用状态

设置 `disabled: true` 禁用选择器。

```ts
new DatePicker({ disabled: true })
new DateRangePicker({ disabled: true })
```

<br>

```demo @docs/pages/demos/date-picker/demo3.ts
```

<br>

## 日期限制

通过 `min` 和 `max` 属性限制可选日期范围。

```ts
const today = new Date()
const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)

new DatePicker({
  min: minDate,
  max: maxDate
})
```

<br>

```demo @docs/pages/demos/date-picker/demo4.ts
```

<br>

## 禁用特定日期

通过 `disabledDate` 回调自定义禁用逻辑。

```ts
new DatePicker({
  disabledDate: date => {
    const today = new Date()
    return date.getDay() === 0 || date.getDay() === 6 || date < today
  }
})
```

<br>

```demo @docs/pages/demos/date-picker/demo5.ts
```

<br>

## 事件监听

通过 `onChange` 回调监听日期变化。

```ts
new DatePicker({
  onChange: date => {
    console.log('Selected:', date)
  }
})

new DateRangePicker({
  onChange: range => {
    console.log('Start:', range?.[0], 'End:', range?.[1])
  }
})
```

<br>

```demo @docs/pages/demos/date-picker/demo6.ts
```

<br>

## 参数

### DatePicker

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `Date` | — | 初始日期 |
| placeholder | `string` | `请选择日期` | 占位提示文字 |
| required | `boolean \| string` | — | 是否必填，字符串为自定义错误信息 |
| min | `Date \| { min: Date; errMsg: string }` | — | 最小可选日期 |
| max | `Date \| { max: Date; errMsg: string }` | — | 最大可选日期 |
| disabled | `boolean` | `false` | 是否禁用 |
| disabledDate | `(date: Date) => boolean` | — | 禁用特定日期的回调 |
| onChange | `(date?: Date) => void` | — | 日期变化时的回调 |

### DateRangePicker

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `[Date, Date]` | — | 初始日期范围 |
| placeholder | `[string, string]` | `['开始日期', '结束日期']` | 占位提示文字 |
| required | `boolean \| string` | — | 是否必填，字符串为自定义错误信息 |
| min | `Date \| { min: Date; errMsg: string }` | — | 最小可选日期 |
| max | `Date \| { max: Date; errMsg: string }` | — | 最大可选日期 |
| disabled | `boolean` | `false` | 是否禁用 |
| disabledDate | `(date: Date) => boolean` | — | 禁用特定日期的回调 |
| onChange | `(range?: [Date, Date]) => void` | — | 日期范围变化时的回调 |

## 类型

```ts
type DateRange = [Date, Date]
```
