# wok-ui-ext

中文 | [English](README.en.md)

wok-ui 的扩展组件库，提供一套**科技蓝风格 + 多主题**的企业级高频组件库。

在 wok-ui 框架基础上，wok-ui-ext 内置了 6 套主题（科技蓝、深邃夜空、活力橙、神秘紫、森林绿、烈焰红），并扩展了 40+ 常用组件，开箱即用，更适合企业级项目开发。

## 特性

- **多主题**：内置 6 套主题，一行代码切换，所有组件样式自动跟随
- **覆盖常用组件**：表单、表格、弹窗、抽屉、日期选择、上传、树、步骤条、时间线等 40+ 高频组件
- **可定制**：支持通过 CSS 变量和 `setTheme` 深度定制主题，满足品牌视觉需求
- **国际化**：内置中文、英文等多语言支持，可自由扩展

## 快速上手

### 安装

项目需要基于 wok-ui，请先安装：

```bash
npm install wok-ui --save
```

再安装 wok-ui-ext：

```bash
npm install wok-ui-ext --save
```

### 初始化

使用 wok-ui-ext 无需改变原有 wok-ui 项目的流程，只需增加国际化和主题的初始化：

```ts
import { initWokUiExtI18n, applyTheme } from 'wok-ui-ext'

// 初始化 wok-ui-ext 国际化（会自动应用语言，无需再调用 wok-ui 的 setLang）
await initWokUiExtI18n('zh-CN')

// 应用主题，默认是科技蓝，可选：'dark' | 'orange' | 'purple' | 'green' | 'red'
applyTheme('default')
```

### 切换主题

```ts
import { applyTheme } from 'wok-ui-ext'

applyTheme('orange')   // 切换为活力橙
applyTheme('dark')     // 切换为深邃夜空
```

## 文档

完整组件文档、示例与主题定制说明，请查看 [文档站](https://peaktai.github.io/wok-ui-ext/) 或在本地运行：

```bash
npm run dev:docs
```

## 组件列表

表单、表格、按钮、标签、卡片、折叠面板、抽屉、弹窗、气泡确认框、下拉菜单、日期选择、时间线、步骤条、进度条、分页、搜索框、树、上传、图片预览、骨架屏、空状态、结果页、文字、图标、描述列表、分割线、头像、徽标、面包屑、菜单、开关、分段器、列表、提示、加载等 40+ 组件。

## 参与贡献

本项目由作者**个人维护**，出于精力与设计一致性考虑，**不接受 Pull Request**。

如果你有 Bug 反馈或好的建议，欢迎发送邮件至 peaktai@qq.com 联系作者。

## License

[ISC](LICENSE)
