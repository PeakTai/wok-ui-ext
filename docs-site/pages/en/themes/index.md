---
title: Themes
order: 3
category: Quick Start
icon: fa-palette
description: Use the built-in themes of wok-ui-ext to meet brand visual needs.
---

# Themes

wok-ui-ext comes with 6 built-in themes, with tech-blue as the default color scheme.

## Theme List

| Name | Identifier | Description |
|------|------|------|
| Tech Blue | `default` | Default theme, tech-style blue tone |
| Deep Night Sky | `dark` | Dark theme, dark background suitable for nighttime use |
| Vibrant Orange | `orange` | Orange theme, warm and energetic |
| Mysterious Purple | `purple` | Purple theme, elegant and mysterious |
| Forest Green | `green` | Green theme, natural and fresh |
| Flame Red | `red` | Red theme, passionate and eye-catching |

## API

### Switch Theme

```ts
import { applyTheme } from 'wok-ui-ext'

applyTheme('orange')
```

### Get Theme List

```ts
import { getAllThemes } from 'wok-ui-ext'

const themes = getAllThemes()
// themes: ['default', 'dark', 'orange', 'purple', 'green', 'red']
```

### Get Theme Config

When `name` is not passed, the full configuration of the current theme is returned:

```ts
import { getTheme } from 'wok-ui-ext'

// 获取指定主题
const config = getTheme('default')

// 不传 name 则返回当前主题
const current = getTheme()
```

`ThemeConfig` contains wok-ui framework colors (`primary`, `success`, `danger`, `warning`, `border`, `text`, `textSecondary`, `outline`), extended colors (such as `primaryDark`, `bgBody`, `shadowSm`, etc.), as well as all theme tokens like border radius, fonts, transitions, and more.

### Customize Theme Config

You can override the configuration of a specified theme via `setTheme` by passing in the fields you want to modify:

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

If you modify the current theme, the colors take effect immediately. You can also modify a non-current theme and then call `applyTheme()` to switch to it.

## CSS Variables

All theme variables (including those built into the wok-ui framework) are applied to the document root element as CSS custom properties, and the variable values update automatically when switching themes.

### wok-ui Framework Variables

Set by `setColor()` and `setSize()`, used by components.

**Colors — `--color-*`**

| Variable | Property | Description |
|------|----------|------|
| `--color-primary` | `primary` | Theme primary color |
| `--color-success` | `success` | Success color |
| `--color-danger` | `danger` | Danger color |
| `--color-warning` | `warning` | Warning color |
| `--color-border` | `border` | Border color |
| `--color-text` | `text` | Text color |
| `--color-text-secondary` | `textSecondary` | Secondary text color |
| `--color-outline` | `outline` | Outline stroke color (focus style) |

**Sizes — `--size-*`**

| Variable | Property | Default |
|------|----------|--------|
| `--size-text` | `text` | 16px |
| `--size-text-sm` | `textSm` | 14px |
| `--size-text-lg` | `textLg` | 20px |
| `--size-text-xl` | `textXl` | 24px |
| `--size-border-radius` | `borderRadius` | 6px |

### wok-ui-ext Extended Variables

Set by `applyTheme()`, used by custom components.

**Primary Color Extensions**

| Variable | Description |
|------|------|
| `--color-primary-dark` | Dark variant of the primary color |
| `--color-primary-light` | Light background of the primary color |
| `--color-primary-soft` | Soft background of the primary color |

**Functional Color Extensions**

| Variable | Description |
|------|------|
| `--color-success-light` | Light background for success |
| `--color-warning-light` | Light background for warning |
| `--color-danger-light` | Light background for danger |
| `--color-info` | Info color (same as primary) |
| `--color-info-light` | Light background for info |

**Text Colors**

| Variable | Description |
|------|------|
| `--text-primary` | Primary text |
| `--text-secondary` | Secondary text |
| `--text-tertiary` | Tertiary text |
| `--text-muted` | Muted text |
| `--text-placeholder` | Placeholder text |
| `--text-disabled` | Disabled text |

**Border Colors**

| Variable | Description |
|------|------|
| `--border-light` | Light border |
| `--border-medium` | Medium border |
| `--border-dark` | Dark border |

**Background Colors**

| Variable | Description |
|------|------|
| `--bg-body` | Page background |
| `--bg-content` | Content area background |
| `--bg-card` | Card background |
| `--bg-sidebar` | Sidebar background |
| `--bg-hover` | Hover state background |
| `--bg-active` | Active state background |

**Shadows**

| Variable | Description |
|------|------|
| `--shadow-sm` | Small shadow |
| `--shadow-md` | Medium shadow |
| `--shadow-lg` | Large shadow |
| `--shadow-primary` | Primary shadow |
| `--shadow-danger` | Danger shadow |

**Border Radius**

| Variable | Default |
|------|--------|
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 22px |
| `--radius-full` | 40px |
| `--radius-circle` | 50% |

**Fonts**

| Variable | Default |
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

**Transitions**

| Variable | Default |
|------|--------|
| `--transition-speed` | 0.15s |

### Usage Example

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

When switching themes, all variable values automatically follow the theme change, and no extra handling is needed.
