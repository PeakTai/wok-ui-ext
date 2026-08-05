---
title: 折叠面板
order: 43
category: 数据展示
icon: fa-chevron-down
description: 折叠面板用于将内容分组收纳，节省页面空间。
---

# 折叠面板

折叠面板用于将内容分组收纳，用户可展开/折叠查看详细内容，有效节省页面空间。

## 基础用法

默认支持多个面板独立展开/折叠，互不影响。

```ts
new Collapse({
  items: [
    { title: 'Panel 1', content: 'Content 1', defaultOpen: true },
    { title: 'Panel 2', content: 'Content 2' },
    { title: 'Panel 3', content: 'Content 3' }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo1.ts
```

<br>

## 手风琴模式

设置 `accordion: true`，同一时间只展开一个面板。

```ts
new Collapse({
  accordion: true,
  items: [
    { title: 'Panel A', content: 'Only one can be open', defaultOpen: true },
    { title: 'Panel B', content: 'Opening this will close Panel A' }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo2.ts
```

<br>

## 可全部折叠

手风琴模式时，配合 `collapsible: true`，点击已展开的面板可将其关闭。

```ts
new Collapse({
  accordion: true,
  collapsible: true,
  items: [
    { title: 'Panel X', content: 'Click again to collapse', defaultOpen: true },
    { title: 'Panel Y', content: 'All panels can be fully collapsed' }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo3.ts
```

<br>

## 无边框模式

设置 `ghost: true` 移除边框和背景，适用于嵌入在已有容器中的场景。

```ts
new Collapse({
  ghost: true,
  items: [
    { title: 'Panel 1', content: 'Content 1', defaultOpen: true }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo4.ts
```

<br>

## 禁用面板

面板支持 `disabled` 属性，禁用后不可点击展开。

```ts
new Collapse({
  items: [
    { title: 'Normal', content: 'Works as usual' },
    { title: 'Disabled', content: 'Cannot be opened', disabled: true }
  ]
})
```

<br>

```demo @docs/pages/demos/collapse/demo5.ts
```

<br>

## 参数

### Collapse

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `PanelOptions[]` | — | 面板列表 |
| accordion | `boolean` | `false` | 是否手风琴模式（只展开一个） |
| collapsible | `boolean` | `false` | 手风琴模式时，点击已展开的面板可关闭 |
| ghost | `boolean` | `false` | 无边框模式 |
| onChange | `(activePanels: Panel[]) => void` | — | 展开/折叠回调，参数为当前展开的面板 |

### PanelOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string \| SubModulesOpt` | — | 面板标题 |
| content | `SubModulesOpt` | — | 面板内容 |
| defaultOpen | `boolean` | `false` | 默认展开 |
| disabled | `boolean` | `false` | 禁用 |
