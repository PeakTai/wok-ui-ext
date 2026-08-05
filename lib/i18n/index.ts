import { getI18n, I18n } from 'wok-ui'
import { enUS } from './en-US'
import { WokUiExtI18nMessages } from './messages'
import { zhCN } from './zh-CN'

let wokUiExtI18n: I18n<WokUiExtI18nMessages> | undefined

/**
 * 获取 wok-ui-ext 的 i18n 实例。
 */
export function getWokUiExtI18n(): I18n<WokUiExtI18nMessages> {
  if (wokUiExtI18n) {
    return wokUiExtI18n
  }
  const i18n = getI18n()
  wokUiExtI18n = i18n.extend<WokUiExtI18nMessages>(enUS)
  wokUiExtI18n.setMsgs('zh-CN', zhCN)
  // wok-ui 基础语言扩展（异步加载）
  i18n.setMsgs('zh-TW', () => import('./wok-ui/zh-TW').then(d => d.zhTW))
  i18n.setMsgs('ja-JP', () => import('./wok-ui/ja-JP').then(d => d.jaJP))
  i18n.setMsgs('ko-KR', () => import('./wok-ui/ko-KR').then(d => d.koKR))
  i18n.setMsgs('fr-FR', () => import('./wok-ui/fr-FR').then(d => d.frFR))
  i18n.setMsgs('de-DE', () => import('./wok-ui/de-DE').then(d => d.deDE))
  i18n.setMsgs('es-ES', () => import('./wok-ui/es-ES').then(d => d.esES))
  // wok-ui-ext 语言扩展（异步加载）
  wokUiExtI18n.setMsgs('zh-TW', () => import('./zh-TW').then(d => d.zhTW))
  wokUiExtI18n.setMsgs('ja-JP', () => import('./ja-JP').then(d => d.jaJP))
  wokUiExtI18n.setMsgs('ko-KR', () => import('./ko-KR').then(d => d.koKR))
  wokUiExtI18n.setMsgs('fr-FR', () => import('./fr-FR').then(d => d.frFR))
  wokUiExtI18n.setMsgs('de-DE', () => import('./de-DE').then(d => d.deDE))
  wokUiExtI18n.setMsgs('es-ES', () => import('./es-ES').then(d => d.esES))

  return wokUiExtI18n
}

/**
 * 初始化 wok-ui-ext 的 i18n 实例，并切换到指定语言。
 * @param lang 语言，可选值为 'zh-CN'、'en-US'、'ja-JP'、'ko-KR'、'fr-FR'、'de-DE'、'es-ES' 或 'zh-TW'。
 */
export async function initWokUiExtI18n(lang?: string) {
  getWokUiExtI18n()
  await getI18n().setLang(lang || 'en-US')
}

export * from './messages'
