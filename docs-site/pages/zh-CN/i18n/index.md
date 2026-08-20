---
title: 国际化
order: 4
category: 快速开始
icon: fa-language
description: 多语言支持，轻松切换应用语言。
---

# 国际化

wok-ui-ext 自带了8 种语言的支持，并且也为 wok-ui 扩展了这些语言，要求不高，直接使用即可，不需要额外配置。

## 初始化语言

```ts
import { initWokUiExtI18n } from 'wok-ui-ext'

// 调用 initWokUiExtI18n 初始化 wok-ui-ext 的 i18n 实例，并切换到指定语言
// wok-ui 也会一同被设置 8 种语言
await initWokUiExtI18n('zh-CN')
```

内置 8 种语言：

| 语言标签 | 名称 | 说明 |
|---------|------|------|
| `zh-CN` | 简体中文 | 中文（中国大陆） |
| `en-US` | English | 英语（美国），默认语言 |
| `zh-TW` | 繁體中文 | 中文（台湾/香港/澳门） |
| `ja-JP` | 日本語 | 日语 |
| `ko-KR` | 한국어 | 韩语 |
| `fr-FR` | Français | 法语 |
| `de-DE` | Deutsch | 德语 |
| `es-ES` | Español | 西班牙语 |

## 扩展新语言

如果项目需要其它语言，需要扩展语言支持。

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