---
title: Internationalization
order: 4
category: Quick Start
icon: fa-language
description: Multi-language support, easily switch the application language.
---

# Internationalization

wok-ui-ext comes with built-in support for 8 languages, and also extends these languages to wok-ui. If your requirements are modest, you can use it directly without extra configuration.

## Initialize Language

```ts
import { initWokUiExtI18n } from 'wok-ui-ext'

// 调用 initWokUiExtI18n 初始化 wok-ui-ext 的 i18n 实例，并切换到指定语言
// wok-ui 也会一同被设置 8 种语言
await initWokUiExtI18n('zh-CN')
```

8 built-in languages:

| Language Tag | Name | Description |
|---------|------|------|
| `zh-CN` | 简体中文 | Chinese (Mainland China) |
| `en-US` | English | English (United States), default language |
| `zh-TW` | 繁體中文 | Chinese (Taiwan/Hong Kong/Macau) |
| `ja-JP` | 日本語 | Japanese |
| `ko-KR` | 한국어 | Korean |
| `fr-FR` | Français | French |
| `de-DE` | Deutsch | German |
| `es-ES` | Español | Spanish |

## Extend with New Languages

If your project needs other languages, you need to extend language support.

```ts
import {getI18n} from 'wok-ui'
import { getWokUiExtI18n } from 'wok-ui-ext'


// 示例，扩展意大利语，异步加载
// 必须同步设置 wok-ui 和 wok-ui-ext 的语言
getI18n().setMsgs(
  'it-IT', 
  () => fetch('/i18n/wok-ui/it-IT.json').then(res => res.json())
)
// 也可以不使用异步加载：getI18n().setMsgs('it-IT', ItMsgs)
// 详细可以参考 wok-ui 的文档
getWokUiExtI18n().setMsgs(
  'it-IT', 
  () => fetch('/i18n/wok-ui-ext/it-IT.json').then(res => res.json())
)

// 语言都配置完了，最后再切换项目语言
// 英文是默认语言，如果项目默认英文，是不需要这个步骤的
// 切换语言必须要在扩展语言完成之后进行，否则是无效的
await getI18n().setLang('it-IT')
// 无需再调用 initWokUiExtI18n
```
