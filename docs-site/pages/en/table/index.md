---
title: Table
order: 51
category: Data Display
icon: fa-table
description: Table component, used for data list display.
---

# Table

Table is used for data list display.

## Basic Usage

Pass `TableColumn` column configurations via `cols`; `content` receives the current row data and row index, and returns the cell content.

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

## Custom Rendering

`content` can return any module to implement custom cell content such as buttons and tags.

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

## Fixed Header

When there is a large amount of data, enable `fixedHeader` so the header stays fixed while the table scrolls internally. The table height is controlled by `height` (default 300px when not specified), and content scrolls vertically when it exceeds the height.

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

## Empty State

An empty state description is shown when the data list is empty, customizable via `emptyDesc`.

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

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| list | `T[]` | — | Data list |
| cols | `TableColumn<T>[] \| ((add) => void)` | — | Column configuration |
| fixedHeader | `boolean` | `false` | Fixed header |
| height | `number \| string` | — | Table height, scrolls internally when exceeded; defaults to 300px for fixed headers when not specified |
| caption | `string` | — | Table title |
| emptyDesc | `string` | — | Empty state description |

## Types

`TableColumn` is a class constructed via `new TableColumn({...})`:

```ts
interface TableColumnSetting<T> {
  name: string | (() => SubModulesOpt)
  fixed?: boolean
  width?: number
  content: (data: T, rowIdx: number) => SubModulesOpt
}
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| name | `string \| (() => SubModulesOpt)` | — | Column name |
| fixed | `boolean` | `false` | Whether to fix the column |
| width | `number` | `80` | Column width |
| content | `(data: T, rowIdx: number) => SubModulesOpt` | — | Cell content |
