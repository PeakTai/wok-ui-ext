---
title: 描述列表
order: 44
category: 数据展示
icon: fa-list-alt
description: 描述列表组件，用于只读详情展示。
---

# 描述列表

描述列表（DescriptionList）用于只读详情展示。

## 基本用法

```ts
new DescriptionList({
  items: [
    { label: 'Name', content: 'John Doe' },
    { label: 'Age', content: '30' },
    { label: 'Email', content: 'john@example.com' }
  ]
})
```

<br>

```demo @docs/pages/demos/description-list/demo1.ts
```

<br>

## 自定义列数

通过 `cols` 参数控制列数，默认 `3`；`gap` 控制条目间距（px），默认 `24`：

```ts
new DescriptionList({
  items: [...],
  cols: 2,
  gap: 16
})
```

<br>

## 独占一行

通过 `exclusiveRow: true` 让条目占满整行，适用于长内容展示：

```ts
new DescriptionList({
  items: [
    { label: 'Title', content: 'Long description text', exclusiveRow: true },
    { label: 'Name', content: 'John' }
  ]
})
```

<br>

## 标题在左

通过 `layout: 'horizontal'` 让标题显示在内容左侧，标题列默认宽度 120px，可通过 `labelWidth` 自定义：

```ts
new DescriptionList({
  items: [...],
  cols: 2,
  layout: 'horizontal',
  labelWidth: 160
})
```

<br>

```demo @docs/pages/demos/description-list/demo2.ts
```

<br>

## 自定义标题宽度

标题列宽度仅在 `horizontal` 布局下生效，单位为像素（px），不设置时默认为 `120`：

```ts
new DescriptionList({
  items: [...],
  cols: 2,
  layout: 'horizontal',
  labelWidth: 160
})
```

<br>

```demo @docs/pages/demos/description-list/demo4.ts
```

<br>

## 带边框

通过 `bordered: true` 开启表格样式，此时间距固定为 0，可同时搭配 `layout` 使用：

```ts
new DescriptionList({
  items: [...],
  cols: 3,
  bordered: true
})
```

<br>

```demo @docs/pages/demos/description-list/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `DescriptionItem[] \| ((add) => void)` | — | 描述项数组或回调函数 |
| cols | `number` | `3` | 列数 |
| gap | `number` | `24` | 间距（px），`bordered` 模式下固定为 0 |
| layout | `'vertical' \| 'horizontal'` | `'vertical'` | 布局方式，vertical 标题在内容上方，horizontal 标题在内容左侧 |
| labelWidth | `number` | `120` | 标题列宽度（px），仅 `horizontal` 布局生效 |
| bordered | `boolean` | `false` | 是否带边框，开启后为表格样式 |

## 类型

描述项由 `DescriptionItem` 接口定义：

```ts
interface DescriptionItem {
  label: SubModulesOpt
  content: SubModulesOpt
  exclusiveRow?: boolean
}
```

| 属性 | 类型 | 说明 |
|------|------|------|
| label | `SubModulesOpt` | 条目标题 |
| content | `SubModulesOpt` | 条目内容 |
| exclusiveRow | `boolean` | 是否独占一行，默认 `false`，设为 `true` 时该条目占满整行 |

> `SubModulesOpt` 表示子模块内容，可以是字符串、DOM 元素或 wok-ui 模块。

当 `items` 传入回调函数时，通过 `add` 方法追加描述项：

```ts
new DescriptionList({
  items: add => {
    add(
      { label: 'Name', content: 'John Doe' },
      { label: 'Age', content: '30' }
    )
  }
})
```
