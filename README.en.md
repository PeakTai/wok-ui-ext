# wok-ui-ext

[中文](README.md) | English

The extension component library of wok-ui, providing an enterprise-level high-frequency component library with a **tech-blue style + multi-theme** design.

Based on the wok-ui framework, wok-ui-ext comes with 6 built-in themes (Tech Blue, Deep Night, Vitality Orange, Mystery Purple, Forest Green, Flame Red) and extends 40+ commonly used components, ready to use out of the box — more suitable for enterprise projects.

## Features

- **Multi-theme**: 6 built-in themes, switch with one line of code, all component styles follow automatically
- **Common Components**: form, table, modal, drawer, date picker, upload, tree, steps, timeline and 40+ high-frequency components
- **Customizable**: deep theme customization via CSS variables and `setTheme` to meet brand visual needs
- **Internationalization**: built-in multi-language support (Chinese, English, etc.), freely extensible

## Getting Started

### Installation

The project is based on wok-ui, please install it first:

```bash
npm install wok-ui --save
```

Then install wok-ui-ext:

```bash
npm install wok-ui-ext --save
```

### Initialization

Using wok-ui-ext does not change the original wok-ui project flow; you only need to add internationalization and theme initialization:

```ts
import { initWokUiExtI18n, applyTheme } from 'wok-ui-ext'

// Initialize wok-ui-ext internationalization (the language is applied automatically, no need to call wok-ui's setLang)
await initWokUiExtI18n('zh-CN')

// Apply theme, default is tech blue, optional: 'dark' | 'orange' | 'purple' | 'green' | 'red'
applyTheme('default')
```

### Switching Themes

```ts
import { applyTheme } from 'wok-ui-ext'

applyTheme('orange')   // switch to vitality orange
applyTheme('dark')     // switch to deep night
```

## Documentation

For complete component docs, examples and theme customization, see the [docs site](https://peaktai.github.io/wok-ui-ext/) or run it locally:

```bash
npm run dev:docs
```

## Component List

Form, table, button, tag, card, collapse, drawer, modal, popconfirm, dropdown, date picker, timeline, steps, progress, pagination, search box, tree, upload, image preview, skeleton, empty state, result page, text, icon, descriptions, divider, avatar, badge, breadcrumb, menu, switch, segmented, list, tooltip, loading and more — 40+ components.

## Contributing

This project is **personally maintained** by the author. For reasons of effort and design consistency, **Pull Requests are not accepted**.

If you have bug reports or good suggestions, feel free to contact the author via email at peaktai@qq.com.

## License

[ISC](LICENSE)
