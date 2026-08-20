---
title: Date Picker
order: 60
category: Data Entry
icon: fa-calendar
description: Date picker component for selecting a date or a date range.
---

# Date Picker

DatePicker is used to select a single date, and DateRangePicker is used to select a date range.

## Basic Usage

The simplest date picker; click to pop up the calendar panel.

```ts
new DatePicker({})
new DatePicker({ placeholder: 'Choose a date' })
```

<br>

```demo @docs/pages/demos/date-picker/demo1.ts
```

<br>

## Date Range

Use `DateRangePicker` to select a date range. Clicking the input pops up a dual-month panel; click the start date and the end date in turn to complete the selection.

```ts
new DateRangePicker({})
```

<br>

```demo @docs/pages/demos/date-picker/demo2.ts
```

<br>

## Disabled State

Set `disabled: true` to disable the picker.

```ts
new DatePicker({ disabled: true })
new DateRangePicker({ disabled: true })
```

<br>

```demo @docs/pages/demos/date-picker/demo3.ts
```

<br>

## Date Restrictions

Restrict the selectable date range via the `min` and `max` properties.

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

## Disabling Specific Dates

Customize the disabling logic via the `disabledDate` callback.

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

## Event Listening

Listen for date changes via the `onChange` callback.

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

## Parameters

### DatePicker

| Parameter | Type | Default | Description |
|------|------|--------|------|
| value | `Date` | — | Initial date |
| placeholder | `string` | `Please select a date` | Placeholder text |
| required | `boolean \| string` | — | Whether required; a string is a custom error message |
| min | `Date \| { min: Date; errMsg: string }` | — | Minimum selectable date |
| max | `Date \| { max: Date; errMsg: string }` | — | Maximum selectable date |
| disabled | `boolean` | `false` | Whether disabled |
| disabledDate | `(date: Date) => boolean` | — | Callback for disabling specific dates |
| onChange | `(date?: Date) => void` | — | Callback when the date changes |

### DateRangePicker

| Parameter | Type | Default | Description |
|------|------|--------|------|
| value | `[Date, Date]` | — | Initial date range |
| placeholder | `string` | `Please select a date range` | Placeholder text |
| required | `boolean \| string` | — | Whether required; a string is a custom error message |
| min | `Date \| { min: Date; errMsg: string }` | — | Minimum selectable date |
| max | `Date \| { max: Date; errMsg: string }` | — | Maximum selectable date |
| disabled | `boolean` | `false` | Whether disabled |
| disabledDate | `(date: Date) => boolean` | — | Callback for disabling specific dates |
| onChange | `(range?: [Date, Date]) => void` | — | Callback when the date range changes |

## Types

```ts
type DateRange = [Date, Date]
```
