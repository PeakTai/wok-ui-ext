---
title: 树
order: 54
category: 数据展示
icon: fa-tree
description: 树组件，用于展示层级结构数据。
---

# 树

树（Tree）组件，用于展示层级结构数据，支持展开/折叠、节点选中、拖拽排序、操作菜单与自定义标题。

## 基本用法

通过 `data` 传入树形数据，`unfolded` 控制节点默认展开，点击节点名称可选中（默认单选，选中高亮）。

```ts
new Tree({
  data: [
    {
      id: '1',
      title: 'Guangdong',
      unfolded: true,
      children: [
        { id: '1-1', title: 'Guangzhou' },
        { id: '1-2', title: 'Shenzhen' }
      ]
    }
  ]
})
```

<br>

```demo @docs/pages/demos/tree/demo1.ts
```

<br>

## 多选

设置 `maxSelected` 大于 1 时支持多选，达到上限后再选择会弹出提示。`onSelectChange` 回调返回当前选中的节点（含层级信息）。

```ts
new Tree({
  data,
  maxSelected: 3,
  onSelectChange: nodes => {
    console.log(nodes.map(n => n.title).join(' / '))
  }
})
```

<br>

```demo @docs/pages/demos/tree/demo2.ts
```

<br>

## 拖拽排序

开启 `enableMove` 后，按住节点约 300ms 即可拖动，拖到目标节点的上/中/下区域分别表示插入到前方、成为子节点、插入到后方。节点位置变化通过 `onChange` 回调最新数据。

```ts
new Tree({
  data,
  enableMove: true,
  onChange: data => {
    console.log(data)
  }
})
```

<br>

```demo @docs/pages/demos/tree/demo3.ts
```

<br>

## 操作菜单

通过 `buildActions` 为节点配置操作项，悬停节点时右侧显示 `...` 按钮，点击弹出上下文菜单。返回的菜单项结构与上下文菜单一致。

```ts
new Tree({
  data,
  buildActions: (data, level) => [
    {
      label: 'Add child',
      callback: () => tree.addNode({ id: 'n-1', title: 'New node' }, data.id)
    },
    {
      label: 'Delete',
      callback: () => tree.deleteNode(data.id)
    }
  ]
})
```

<br>

```demo @docs/pages/demos/tree/demo4.ts
```

<br>

## 自定义标题

`buildTitleModule` 可以自定义节点标题的渲染内容，返回任意模块。有子节点的节点自带展开/折叠图标，为避免重复，可只给叶子节点添加自定义图标。

```ts
new Tree({
  data,
  buildTitleModule: data =>
    new HBox({
      gap: 6,
      align: 'center',
      children: [
        ...(data.children && data.children.length ? [] : [new IconTag()]),
        data.title
      ]
    })
})
```

<br>

```demo @docs/pages/demos/tree/demo5.ts
```

<br>

## 节点操作

通过组件方法可以对树进行增删改：`addNode` 添加节点（不传 `parentId` 时添加为根节点）、`updateNode` 修改标题、`deleteNode` 删除节点。

```ts
tree.addNode({ id: 'n-1', title: 'New Child' }, selectedId)
tree.updateNode({ id: selectedId, title: 'Renamed' })
tree.deleteNode(selectedId)
```

<br>

```demo @docs/pages/demos/tree/demo6.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `TreeNodeData[]` | — | 树数据 |
| maxSelected | `number` | `1` | 最大可选中数量 |
| maxLevel | `number` | `10` | 最大层级 |
| selectedIds | `string[]` | `[]` | 默认选中的节点 id |
| onSelectChange | `(nodes: Array<T & { level: number }>) => void` | — | 选中变化回调 |
| enableMove | `boolean` | `false` | 启用拖拽排序 |
| moveHook | `(source, target, placement) => Promise<void>` | — | 移动钩子，成功后节点位置才变化 |
| onChange | `(data: T[]) => void` | — | 数据变化回调 |
| buildActions | `(data, level) => ContextMenuItem[]` | — | 节点操作菜单 |
| buildTitleModule | `(data) => ConvertibleModule` | — | 自定义节点标题 |

## 类型

节点数据 `TreeNodeData`：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | `string` | 节点唯一标识 |
| title | `string` | 节点名称 |
| children | `TreeNodeData[]` | 子节点 |
| unfolded | `boolean` | 是否默认展开 |
| unmoveable | `'self' \| 'all-descendants'` | 不可拖动：仅自身或全部后代 |
| unselectable | `boolean` | 不可选中 |

## 方法

| 方法 | 说明 |
|------|------|
| addNode(data, parentId?) | 添加节点，`parentId` 为空时添加为根节点 |
| deleteNode(id) | 删除节点 |
| updateNode({ id, title }) | 更新节点标题 |
| unselectNode(id) | 取消选中节点 |
| moveNode(sourceId, targetId, placement) | 移动节点到目标位置 |
| getNode(id) | 获取节点信息 |
| getParentNode(id) | 获取父节点信息 |
