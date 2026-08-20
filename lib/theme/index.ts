import { setColor } from 'wok-ui'
import THEMES from './themes'
import type { ThemeName, ThemeConfig } from './types'

export type { ThemeName, ThemeConfig }

const ALL_THEMES: ThemeName[] = ['default', 'dark', 'orange', 'purple', 'green', 'red']

let currentTheme: ThemeName = 'default'

/** 获取所有主题名称 */
export function getAllThemes(): ThemeName[] {
  return [...ALL_THEMES]
}

/** 获取指定主题的完整配置，不传 name 则返回当前主题 */
export function getTheme(name?: ThemeName): ThemeConfig {
  return THEMES[name ?? currentTheme]
}

/** 自定义主题配置，合并到指定主题中。若修改的是当前主题，自动重新应用 */
export function setTheme(name: ThemeName, config: Partial<ThemeConfig>): void {
  Object.assign(THEMES[name], config)
  if (name === currentTheme) {
    applyTheme(name)
  }
}

/**
 * 应用主题
 * 1. 通过 setColor 更新 wok-ui 框架组件的颜色
 * 2. 通过 style.setProperty 更新 lib CSS 变量
 */
export function applyTheme(name: ThemeName): void {
  currentTheme = name

  const config = THEMES[name]

  // 更新 wok-ui 框架颜色
  setColor({
    primary: config.primary,
    success: config.success,
    danger: config.danger,
    warning: config.warning,
    border: config.border,
    text: config.text,
    textSecondary: config.textSecondary,
    outline: config.outline
  })

  // 更新所有 CSS 变量
  const { style } = document.documentElement

  /* 主色 */
  style.setProperty('--color-primary-dark', config.primaryDark)
  style.setProperty('--color-primary-light', config.primaryLight)
  style.setProperty('--color-primary-soft', config.primarySoft)

  /* 功能色 */
  style.setProperty('--color-success-light', config.successLight)
  style.setProperty('--color-warning-light', config.warningLight)
  style.setProperty('--color-danger-light', config.dangerLight)
  style.setProperty('--color-info', config.primary)
  style.setProperty('--color-info-light', config.primaryLight)

  /* 文字颜色 */
  style.setProperty('--text-primary', config.text)
  style.setProperty('--text-secondary', config.textSecondary)
  style.setProperty('--text-tertiary', config.textTertiary)
  style.setProperty('--text-muted', config.textMuted)
  style.setProperty('--text-placeholder', config.textPlaceholder)
  style.setProperty('--text-disabled', config.textDisabled)

  /* 边框颜色 */
  style.setProperty('--border-light', config.borderLight)
  style.setProperty('--border-medium', config.borderMedium)
  style.setProperty('--border-dark', config.borderDark)

  /* 背景色 */
  style.setProperty('--bg-body', config.bgBody)
  style.setProperty('--bg-content', config.bgContent)
  style.setProperty('--bg-card', config.bgCard)
  style.setProperty('--bg-sidebar', config.bgSidebar)
  style.setProperty('--bg-hover', config.bgHover)
  style.setProperty('--bg-active', config.bgActive)

  /* 阴影 */
  style.setProperty('--shadow-sm', config.shadowSm)
  style.setProperty('--shadow-md', config.shadowMd)
  style.setProperty('--shadow-lg', config.shadowLg)
  style.setProperty('--shadow-primary', config.shadowPrimary)
  style.setProperty('--shadow-danger', config.shadowDanger)

  /* 圆角 */
  style.setProperty('--radius-sm', config.radiusSm)
  style.setProperty('--radius-md', config.radiusMd)
  style.setProperty('--radius-lg', config.radiusLg)
  style.setProperty('--radius-xl', config.radiusXl)
  style.setProperty('--radius-full', config.radiusFull)
  style.setProperty('--radius-circle', config.radiusCircle)

  /* 字体 */
  style.setProperty('--font-family', config.fontFamily)
  style.setProperty('--font-size-title-large', config.fontSizeTitleLarge)
  style.setProperty('--font-size-title', config.fontSizeTitle)
  style.setProperty('--font-size-body', config.fontSizeBody)
  style.setProperty('--font-size-small', config.fontSizeSmall)
  style.setProperty('--font-size-xs', config.fontSizeXs)
  style.setProperty('--font-weight-normal', config.fontWeightNormal)
  style.setProperty('--font-weight-medium', config.fontWeightMedium)
  style.setProperty('--font-weight-semibold', config.fontWeightSemibold)

  /* 过渡 */
  style.setProperty('--transition-speed', config.transitionSpeed)
}
