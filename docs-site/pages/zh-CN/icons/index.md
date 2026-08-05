---
title: 图标
order: 12
category: 通用
icon: fa-icons
description: 图标类型与内置图标说明。
---

# 图标

组件库中的图标统一通过 `IconInput` 类型接收，并经由 `resolveIcon` 函数解析为可挂载的模块。

## 图标类型

```ts
export type IconInput = SvgIcon | RemoteSvgIcon | string
```

`IconInput` 支持以下三种形式：

| 类型 | 说明 | 示例 |
|------|------|------|
| `SvgIcon` | wok-ui 内置的 SVG 图标实例 | `new IconEdit()` |
| `RemoteSvgIcon` | 通过远程 SVG URL 加载的图标实例 | `new RemoteSvgIcon('/assets/icon.svg')` |
| `string` | CSS 类名字符串、内联 SVG 标记或图片地址 | `'fa fa-user'`、`'<svg>...</svg>'`、`'/assets/icon.png'` |

## resolveIcon

```ts
export function resolveIcon(icon: IconInput): ConvertibleModule
```

`resolveIcon` 负责将 `IconInput` 解析为组件可以挂载的对象，规则如下：

- `SvgIcon` / `RemoteSvgIcon` 实例：直接返回
- 以 `<svg` 开头的字符串：包装为 `SvgIcon` 实例
- 以 `http://`、`https://`、`/`、`data:` 开头的字符串：渲染为 `<img>` 元素
- 其他字符串：渲染为 `<i class="xxx">` 元素

```ts
import { resolveIcon, IconEdit } from 'wok-ui-ext'

// 内置图标
resolveIcon(new IconEdit())

// 远程 SVG
resolveIcon(new RemoteSvgIcon('https://example.com/icon.svg'))

// CSS 类名
resolveIcon('fa fa-user')

// 内联 SVG
resolveIcon('<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>')
```

## 内置图标

组件库提供以下可直接实例化的图标类：

| 图标类 | 说明 |
|--------|------|
| `IconTimes` | 关闭 / 叉号 |
| `IconSearch` | 搜索 |
| `IconChevronLeft` | 向左折叠箭头 |
| `IconChevronRight` | 向右折叠箭头 |
| `IconChevronDown` | 向下折叠箭头 |
| `IconInfoCircle` | 信息提示 |
| `IconCheckCircle` | 成功 / 勾选 |
| `IconExclamationCircle` | 错误提示 |
| `IconExclamationTriangle` | 警告提示 |
| `IconTimesCircle` | 失败 / 关闭 |
| `IconQuestionCircle` | 帮助 / 问号 |
| `IconEdit` | 编辑 |
| `IconTag` | 标签 |
| `IconEllipsisH` | 水平省略号 |
| `IconUser` | 用户 |
| `IconFolderOpen` | 打开的文件夹 |
| `IconInbox` | 收件箱（空状态） |
| `IconFolder` | 文件夹 |
| `IconLock` | 锁定 |
| `IconAngleRight` | 向右尖角 |
| `IconCloudUpload` | 云上传 |
| `IconImage` | 图片 |
| `IconCircleNotch` | 加载圆圈 |

## 使用建议

推荐在接收图标的组件中传入 `IconInput`，例如：

```ts
new Button({ text: 'Edit', icon: new IconEdit() })
new Dropdown({
  items: [
    { text: 'Edit', icon: new IconEdit() }
  ]
})
```

> **注意**：必须每次都使用 `new` 创建新的图标实例，切勿复用同一个实例。wok-ui 不允许同一个 `Module` 实例被多次挂载，否则会抛出异常。
