---
title: Getting Started
order: 2
category: Quick Start
icon: fa-rocket
description: Installation and quick start
---

# Getting Started

Welcome to wok-ui-ext, a tech-blue enterprise-grade high-frequency component library.

## Installation

You need to install wok-ui in your project first. If it is not installed, please install it first.

```bash
npm install wok-ui --save
```

Install wok-ui-ext.

```bash
npm install wok-ui-ext --save
```

### AI Skill Installation (Optional)

wok-ui provides AI skills that help AI coding assistants better understand and use wok-ui components. For details, see [wok-ui AI Skill Installation](https://peaktai.github.io/wok-ui/en/quick-start.html).

```bash
npx skills add peaktai/wok-ui --all
```

Users in China can use the Gitee mirror if GitHub is slow to access.

```bash
npx skills add https://gitee.com/tai/wok-ui.git --all
```

## Initialization

In a wok-ui project, using wok-ui-ext does not change the workflow; you just need to add global styles, internationalization and theme initialization.

```ts
// Import global styles (recommended to import explicitly to avoid tree-shaking)
import 'wok-ui/dist/style.css' // wok-ui base styles
import 'wok-ui-ext/dist/global.css' // wok-ui-ext global styles
import { initWokUiExtI18n, applyTheme } from 'wok-ui-ext'

// Call initWokUiExtI18n to initialize wok-ui-ext internationalization
await initWokUiExtI18n('zh-CN')
// No need to call the original wok-ui language setting API: await getI18n().setLang('zh-CN')
// Apply the theme; default is tech blue. Options: 'dark', 'orange', 'purple', 'green', 'red'
await applyTheme('default')
```

If your project has a theme switching feature, you need to call the `applyTheme` function when switching themes. For details, please refer to [Themes](/en/themes.html).
