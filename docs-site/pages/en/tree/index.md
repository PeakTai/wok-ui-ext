---
title: Tree
order: 54
category: Data Display
icon: fa-tree
description: Tree component for displaying hierarchical data.
---

# Tree

The Tree component is used to display hierarchical data, supporting expand/collapse, node selection, drag-and-drop sorting, action menus and custom titles.

## Basic Usage

Pass tree data via `data`, and `unfolded` controls whether nodes are expanded by default. Clicking a node name selects it (single selection by default; the selected node is highlighted).

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

## Multiple Selection

Setting `maxSelected` to a value greater than 1 enables multiple selection; selecting again after reaching the limit shows a prompt. The `onSelectChange` callback returns the currently selected nodes (including hierarchy information).

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

## Drag-and-Drop Sorting

With `enableMove` enabled, holding a node for about 300ms allows dragging. Dropping onto the top/middle/bottom areas of a target node inserts before it, makes it a child node, or inserts after it respectively. Node position changes are reported through the `onChange` callback with the latest data.

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

## Action Menu

Configure action items for nodes via `buildActions`; hovering a node shows a `...` button on the right, and clicking it pops up a context menu. The returned menu item structure is the same as the context menu.

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

## Custom Title

`buildTitleModule` customizes the rendered content of node titles and can return any module. Nodes with children have their own expand/collapse icon; to avoid duplication, you can add a custom icon only to leaf nodes.

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

## Node Operations

Nodes can be added, updated or deleted through component methods: `addNode` adds a node (added as a root node when `parentId` is not passed), `updateNode` modifies the title, and `deleteNode` removes a node.

```ts
tree.addNode({ id: 'n-1', title: 'New Child' }, selectedId)
tree.updateNode({ id: selectedId, title: 'Renamed' })
tree.deleteNode(selectedId)
```

<br>

```demo @docs/pages/demos/tree/demo6.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| data | `TreeNodeData[]` | — | Tree data |
| maxSelected | `number` | `1` | Maximum number of selectable nodes |
| maxLevel | `number` | `10` | Maximum level |
| selectedIds | `string[]` | `[]` | Default selected node ids |
| onSelectChange | `(nodes: Array<T & { level: number }>) => void` | — | Selection change callback |
| enableMove | `boolean` | `false` | Enable drag-and-drop sorting |
| moveHook | `(source, target, placement) => Promise<void>` | — | Move hook; the node position only changes after it succeeds |
| onChange | `(data: T[]) => void` | — | Data change callback |
| buildActions | `(data, level) => ContextMenuItem[]` | — | Node action menu |
| buildTitleModule | `(data) => ConvertibleModule` | — | Custom node title |

## Types

Node data `TreeNodeData`:

| Field | Type | Description |
|------|------|------|
| id | `string` | Unique node identifier |
| title | `string` | Node name |
| children | `TreeNodeData[]` | Child nodes |
| unfolded | `boolean` | Whether expanded by default |
| unmoveable | `'self' \| 'all-descendants'` | Not draggable: only itself or all descendants |
| unselectable | `boolean` | Not selectable |

## Methods

| Method | Description |
|------|------|
| addNode(data, parentId?) | Adds a node; added as a root node when `parentId` is empty |
| deleteNode(id) | Deletes a node |
| updateNode({ id, title }) | Updates the node title |
| unselectNode(id) | Unselects a node |
| moveNode(sourceId, targetId, placement) | Moves a node to the target position |
| getNode(id) | Gets node information |
| getParentNode(id) | Gets the parent node information |
