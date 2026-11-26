---
title: 垫片
order: 13
category: 通用
icon: fa-arrows-alt-v
description: 语义化的间距垫片，直接 new 创建，无需参数。
---

# 垫片

垫片用于在元素之间撑开固定间距。wok-ui 自带的 `Spacer` / `HSpacer` 仅提供少量档位，本库按全局间距 token 提供一套语义化垫片，直接 `new` 创建，无需传参。

## 垂直垫片

用于上下方向的分隔，撑开高度。

| 类 | 适用场景 |
|----|----------|
| `SpacerTiny` | 图标与文字、角标等需要紧贴的相邻元素 |
| `SpacerTight` | 按钮组、行内元素之间 |
| `SpacerCompact` | 同一组内的块级元素、列表项之间 |
| `SpacerBase` | 默认内容区、卡片内元素之间 |
| `SpacerRelaxed` | 表单组、区块之间 |
| `SpacerSpacious` | 页面级区块分隔 |

```ts
new SpacerCompact()
```

<br>

```demo @docs/pages/demos/spacer/demo1.ts
```

<br>

## 水平垫片

用于左右方向的分隔，撑开宽度，适用于行内元素或 flex 行布局。

| 类 | 适用场景 |
|----|----------|
| `HSpacerTiny` | 图标与文字、角标等需要紧贴的相邻元素 |
| `HSpacerTight` | 按钮组、行内元素之间 |
| `HSpacerCompact` | 同一组内的块级元素、列表项之间 |
| `HSpacerBase` | 默认内容区、卡片内元素之间 |
| `HSpacerRelaxed` | 表单组、区块之间 |
| `HSpacerSpacious` | 页面级区块分隔 |

```ts
new HSpacerTight()
```

<br>

```demo @docs/pages/demos/spacer/demo2.ts
```

<br>

## 与间距 token 的关系

所有垫片的尺寸均取自全局间距变量 `--gap-*`。间距是固定的设计基准，不随主题变化，也不能通过 `applyTheme()` / `setTheme()` 修改；若确需整体调整，只能在样式入口覆盖这些变量。具体变量见「主题设置」的间距小节。

若要在 JS/TS 侧给 `HBox` / `VBox` 等容器组件的 `gap` 参数传值，可使用 `tokens` 常量，取值与 `--gap-*` 一致，详见「主题设置」的 [JS/TS 访问](/zh-CN/themes.html) 小节。
