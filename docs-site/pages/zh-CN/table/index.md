---
title: 表格
order: 51
category: 数据展示
icon: fa-table
description: 表格组件，用于数据列表展示。
---

# 表格

表格（Table）用于数据列表展示。

## 基本用法

通过 `cols` 传入 `TableColumn` 列配置，`content` 接收当前行数据和行索引，返回单元格内容。

```ts
new Table({
  list: users,
  cols: [
    new TableColumn({ name: 'Name', content: user => user.name }),
    new TableColumn({ name: 'Age', content: user => `${user.age}` }),
    new TableColumn({ name: 'Email', content: user => user.email })
  ]
})
```

<br>

```demo @docs/pages/demos/table/demo1.ts
```

<br>

## 自定义渲染

`content` 可以返回任意模块，实现按钮、标签等自定义单元格内容。

```ts
new Table({
  list: users,
  cols: [
    new TableColumn({ name: 'Name', content: user => user.name }),
    new TableColumn({
      name: 'Action',
      content: () => new Button({ text: 'Edit' })
    })
  ]
})
```

<br>

## 固定表头

数据量较多时，可开启 `fixedHeader`，表头在表格内部滚动时保持固定。表格高度通过 `height` 控制（未指定时默认 300px），超出高度后纵向滚动。

```ts
new Table({
  list: users,
  fixedHeader: true,
  height: 300,
  cols: [
    new TableColumn({ name: 'Name', content: user => user.name }),
    new TableColumn({ name: 'Age', content: user => `${user.age}` }),
    new TableColumn({ name: 'Email', content: user => user.email })
  ]
})
```

<br>

```demo @docs/pages/demos/table/demo3.ts
```

<br>

## 空状态

数据列表为空时显示空状态描述，可通过 `emptyDesc` 自定义。

```ts
new Table({
  list: [],
  cols: [new TableColumn({ name: 'Name', content: user => user.name })],
  emptyDesc: 'No data'
})
```

<br>

```demo @docs/pages/demos/table/demo2.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | `T[]` | — | 数据列表 |
| cols | `TableColumn<T>[] \| ((add) => void)` | — | 列配置 |
| fixedHeader | `boolean` | `false` | 固定头部 |
| height | `number \| string` | — | 表格高度，超出后内部滚动；固定表头未指定时默认 300px |
| caption | `string` | — | 表格标题 |
| emptyDesc | `string` | — | 空状态描述 |

## 类型

`TableColumn` 是一个类，通过 `new TableColumn({...})` 构造：

```ts
interface TableColumnSetting<T> {
  name: string | (() => SubModulesOpt)
  fixed?: boolean
  width?: number
  content: (data: T, rowIdx: number) => SubModulesOpt
}
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string \| (() => SubModulesOpt)` | — | 列名称 |
| fixed | `boolean` | `false` | 是否固定列 |
| width | `number` | `80` | 列宽度 |
| content | `(data: T, rowIdx: number) => SubModulesOpt` | — | 单元格内容 |
