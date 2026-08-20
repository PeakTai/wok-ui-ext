---
title: Result
order: 37
category: Feedback
icon: fa-check-circle
description: Result component
---

# Result

Result is used to display the outcome of an operation, supporting four statuses: success, error, info and warning.

```demo @docs/pages/demos/result/demo.ts
```

## Parameters

```ts
interface ResultOptions {
  /** 结果状态 */
  status: 'success' | 'error' | 'info' | 'warning'
  /** 主标题 */
  title: string
  /** 副标题（可选） */
  subTitle?: string
  /** 操作区（可选，通常放按钮） */
  extra?: SubModulesOpt
}
```

| Parameter | Description | Type | Default |
|------|------|------|--------|
| status | Result status | `'success' \| 'error' \| 'info' \| 'warning'` | — |
| title | Main title | `string` | — |
| subTitle | Subtitle | `string` | — |
| extra | Action area | `SubModulesOpt` | — |
