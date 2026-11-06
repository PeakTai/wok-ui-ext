---
title: 快速开始
order: 2
category: 快速开始
icon: fa-rocket
description: 安装和快速上手
---

# 快速开始

欢迎使用 wok-ui-ext，科技蓝风格的企业级高频组件库。

## 安装

项目中需要先安装 wok-ui，如果没有安装请先安装。

```bash
npm install wok-ui --save
```

安装 wok-ui-ext。

```bash
npm install wok-ui-ext --save
```

### AI 技能安装（可选）

wok-ui 提供了 AI 技能，安装后可以让 AI 编程助手更好地理解和使用 wok-ui 组件。详情请参考 [wok-ui AI 技能安装](https://peaktai.github.io/wok-ui/zh-CN/quick-start.html)。

```bash
npx skills add peaktai/wok-ui --all
```

国内用户访问 GitHub 速度慢，可以使用 Gitee 仓库地址来安装。

```bash
npx skills add https://gitee.com/tai/wok-ui.git --all
```

## 程序初始化

在 wok-ui 项目，使用 wok-ui-ext ，流程不需要变化，需要增加全局样式、国际化和主题的初始化。

```ts
// 引入全局样式（建议显式引入，避免打包器 tree-shaking 将其剔除）
import 'wok-ui/dist/style.css' // wok-ui 基础样式
import 'wok-ui-ext/dist/global.css' // wok-ui-ext 全局样式
import { initWokUiExtI18n, applyTheme } from 'wok-ui-ext'

// 调用 initWokUiExtI18n 初始化 wok-ui-ext 国际化
await initWokUiExtI18n('zh-CN')
// 不需要再调用原 wok-ui 的语言设置 api：await getI18n().setLang('zh-CN')
// 应用主题，默认是科技蓝配色，可选：'dark', 'orange', 'purple', 'green', 'red'
await applyTheme('default')
```

如果项目中有切换主题的功能，需要在切换主题时调用 applyTheme 函数，详细请参考 [主题定制](/zh-CN/themes.html)。