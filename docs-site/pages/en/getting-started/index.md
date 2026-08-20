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

## Initialization

In a wok-ui project, using wok-ui-ext does not change the workflow; you just need to add internationalization and theme initialization.

```ts
import { initWokUiExtI18n } from 'wok-ui-ext'

// 调用 initWokUiExtI18n 初始化 wok-ui-ext 国际化
await initWokUiExtI18n('zh-CN')
// 不需要再调用原 wok-ui 的语言设置 api：await getI18n().setLang('zh-CN')
// 应用主题，默认是科技蓝配色，可选：'dark', 'orange', 'purple', 'green', 'red'
await applyTheme('default')
```

If your project has a theme switching feature, you need to call the `applyTheme` function when switching themes. For details, please refer to [Themes](/en/themes.html).
