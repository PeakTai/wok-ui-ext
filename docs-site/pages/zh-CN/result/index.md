---
title: 结果页
order: 37
category: 反馈
icon: fa-check-circle
description: 结果页组件
---

# 结果页

结果页用于操作反馈的结果展示，支持成功、失败、信息、警告四种状态。

```demo @docs/pages/demos/result/demo.ts
```

## 参数

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

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| status | 结果状态 | `'success' \| 'error' \| 'info' \| 'warning'` | — |
| title | 主标题 | `string` | — |
| subTitle | 副标题 | `string` | — |
| extra | 操作区 | `SubModulesOpt` | — |
