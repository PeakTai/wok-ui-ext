---
title: 主题设置
order: 3
category: 快速开始
icon: fa-palette
description: 使用 wok-ui-ext 内置的几套主题，满足品牌视觉需求。
---

# 主题设置

wok-ui-ext 内置了 6 套主题，默认科技蓝配色。

## 主题名称

| 名称 | 标识 | 说明 |
|------|------|------|
| 科技蓝 | `default` | 默认主题，科技感蓝色调 |
| 深邃夜空 | `dark` | 暗色主题，深色背景适合夜间使用 |
| 活力橙 | `orange` | 橙色主题，温暖活力 |
| 神秘紫 | `purple` | 紫色主题，优雅神秘 |
| 森林绿 | `green` | 绿色主题，自然清新 |
| 烈焰红 | `red` | 红色主题，热情醒目 |

## API

### 切换主题

```ts
import { applyTheme } from 'wok-ui-ext'

applyTheme('orange')
```

### 获取主题列表

```ts
import { getAllThemes } from 'wok-ui-ext'

const themes = getAllThemes()
// themes: ['default', 'dark', 'orange', 'purple', 'green', 'red']
```

### 获取主题配置

不传 `name` 时返回当前主题的完整配置：

```ts
import { getTheme } from 'wok-ui-ext'

// 获取指定主题
const config = getTheme('default')

// 不传 name 则返回当前主题
const current = getTheme()
```

`ThemeConfig` 包含 wok-ui 框架颜色（`primary`、`success`、`danger`、`warning`、`border`、`text`、`textSecondary`、`outline`）、扩展颜色（如 `primaryDark`、`bgBody`、`shadowSm` 等）以及圆角、字体、过渡等所有主题 token。

### 自定义主题配置

通过 `setTheme` 可以覆盖指定主题的配置，传入需要修改的字段即可：

```ts
import { setTheme } from 'wok-ui-ext'

// 修改默认主题的主色
setTheme('default', {
  primary: '#ff0000',
  primaryDark: '#cc0000',
  primaryLight: '#ffeeee',
  bgBody: '#fff5f5'
})
```

如果修改的是当前主题，颜色会立即生效。也可以修改非当前主题后，再调用 `applyTheme()` 切换过去。

## CSS 变量

所有主题变量（包括 wok-ui 框架内置的）都以 CSS 自定义属性的形式作用于文档根元素，切换主题时变量值自动更新。

### wok-ui 框架变量

由 `setColor()` 和 `setSize()` 设置，组件使用。

**颜色 — `--color-*`**

| 变量 | 对应属性 | 说明 |
|------|----------|------|
| `--color-primary` | `primary` | 主题主色 |
| `--color-success` | `success` | 成功色 |
| `--color-danger` | `danger` | 危险色 |
| `--color-warning` | `warning` | 警告色 |
| `--color-border` | `border` | 边框色 |
| `--color-text` | `text` | 文字颜色 |
| `--color-text-secondary` | `textSecondary` | 次级文字颜色 |
| `--color-outline` | `outline` | 轮廓描边色（焦点样式） |

**尺寸 — `--size-*`**

| 变量 | 对应属性 | 默认值 |
|------|----------|--------|
| `--size-text` | `text` | 16px |
| `--size-text-sm` | `textSm` | 14px |
| `--size-text-lg` | `textLg` | 20px |
| `--size-text-xl` | `textXl` | 24px |
| `--size-border-radius` | `borderRadius` | 6px |

### wok-ui-ext 扩展变量

由 `applyTheme()` 设置，供自定义组件使用。

**主色扩展**

| 变量 | 说明 |
|------|------|
| `--color-primary-dark` | 主色深色变体 |
| `--color-primary-light` | 主色浅色背景 |
| `--color-primary-soft` | 主色柔和背景 |

**功能色扩展**

| 变量 | 说明 |
|------|------|
| `--color-success-light` | 成功浅色背景 |
| `--color-warning-light` | 警告浅色背景 |
| `--color-danger-light` | 危险浅色背景 |
| `--color-info` | 信息色（同主色） |
| `--color-info-light` | 信息浅色背景 |

**文字颜色**

| 变量 | 说明 |
|------|------|
| `--text-primary` | 主要文字 |
| `--text-secondary` | 次要文字 |
| `--text-tertiary` | 辅助文字 |
| `--text-muted` | 弱化文字 |
| `--text-placeholder` | 占位文字 |
| `--text-disabled` | 禁用文字 |
| `--text-inverse` | 反白文字（深色、主色背景上） |

**边框颜色**

| 变量 | 说明 |
|------|------|
| `--border-light` | 浅色边框 |
| `--border-medium` | 中等边框 |
| `--border-dark` | 深色边框 |

**背景色**

| 变量 | 说明 |
|------|------|
| `--bg-body` | 页面背景 |
| `--bg-content` | 内容区背景 |
| `--bg-card` | 卡片背景 |
| `--bg-sidebar` | 侧栏背景 |
| `--bg-hover` | 悬浮态背景 |
| `--bg-active` | 激活态背景 |
| `--bg-mask` | 遮罩层背景（弹窗、抽屉、加载） |

**阴影**

| 变量 | 说明 |
|------|------|
| `--shadow-sm` | 小阴影 |
| `--shadow-md` | 中阴影 |
| `--shadow-lg` | 大阴影 |
| `--shadow-primary` | 主色阴影 |
| `--shadow-danger` | 危险色阴影 |

**圆角**

| 变量 | 默认值 |
|------|--------|
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 22px |
| `--radius-full` | 40px |
| `--radius-circle` | 50% |

**字体**

| 变量 | 默认值 |
|------|--------|
| `--font-family` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...` |
| `--font-size-title-large` | 20px |
| `--font-size-title` | 18px |
| `--font-size-body` | 16px |
| `--font-size-small` | 14px |
| `--font-size-xs` | 12px |
| `--font-weight-normal` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |

**过渡**

| 变量 | 默认值 |
|------|--------|
| `--transition-speed` | 0.15s |

### 间距（固定基准）

间距相关变量是全局固定的设计基准，在样式入口中预先定义，**不参与主题切换，也不能通过 `applyTheme()` / `setTheme()` 修改**。这样可保证所有组件在不同主题下的间距完全一致。

内边距 — `--padding-*`

| 变量 | 用途 |
|------|------|
| `--padding-xxs` | 极紧凑：小尺寸控件纵向、紧贴元素 |
| `--padding-xs` | 气泡、紧凑浮层、控件纵向 |
| `--padding-sm` | 列表项、标签、紧凑块 |
| `--padding-md` | 卡片、默认内容区、控件横向 |
| `--padding-lg` | 弹窗、抽屉、面板 |
| `--padding-xl` | 大区块 |
| `--padding-xxl` | 页面头部、结果页 |

间距 — `--gap-*`

| 变量 | 用途 |
|------|------|
| `--gap-xxs` | 紧邻元素 |
| `--gap-xs` | 图标与文字、按钮组 |
| `--gap-sm` | 同组块级元素 |
| `--gap-md` | 页签、加载组 |
| `--gap-lg` | 区块、表单组 |
| `--gap-xl` | 页面/区块级 |

需要直接撑开间距时，可使用 [垫片](/zh-CN/spacer.html) 组件，其尺寸即取自上述 `--gap-*` 变量。

### 行高（固定基准）

行高变量与间距变量一样，在样式入口中预先定义，**不参与主题切换，也不能通过 `applyTheme()` / `setTheme()` 修改**，保证不同主题下的文字行距一致。

| 变量 | 值 | 用途 |
|------|-----|------|
| `--line-height-sm` | 1.4 | 紧凑短文本：气泡、标题、小字 |
| `--line-height-md` | 1.5 | 默认正文 + 控件 |
| `--line-height-lg` | 1.6 | 多行段落：alert、面板、强调信息 |

### 使用示例

```less
// 自定义组件样式
.my-custom-card {
  background: var(--bg-card);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--bg-hover);
  }

  .title {
    font-size: var(--font-size-title);
    font-weight: var(--font-weight-semibold);
  }

  .desc {
    font-size: var(--font-size-small);
    color: var(--text-tertiary);
  }
}
```

切换主题时，所有变量值会自动跟随主题变化，无需额外处理。
