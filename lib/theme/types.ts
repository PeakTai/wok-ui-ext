/**
 * 主题名称
 */
export type ThemeName = 'default' | 'dark' | 'orange' | 'purple' | 'green' | 'red'

/**
 * 主题配置
 * 包含颜色、圆角、字体、过渡等所有主题 token
 */
export interface ThemeConfig {
  /* ===== wok-ui setColor 子集 ===== */
  primary: string
  success: string
  danger: string
  warning: string
  border: string
  text: string
  textSecondary: string
  outline: string

  /* ===== lib 扩展颜色 ===== */
  primaryDark: string
  primaryLight: string
  primarySoft: string
  successLight: string
  warningLight: string
  dangerLight: string
  textTertiary: string
  textMuted: string
  textPlaceholder: string
  textDisabled: string
  borderLight: string
  borderMedium: string
  borderDark: string
  bgBody: string
  bgContent: string
  bgCard: string
  bgSidebar: string
  bgHover: string
  bgActive: string
  shadowSm: string
  shadowMd: string
  shadowLg: string
  shadowPrimary: string
  shadowDanger: string

  /* ===== 圆角 ===== */
  radiusSm: string
  radiusMd: string
  radiusLg: string
  radiusXl: string
  radiusFull: string
  radiusCircle: string

  /* ===== 字体 ===== */
  fontFamily: string
  fontSizeTitleLarge: string
  fontSizeTitle: string
  fontSizeBody: string
  fontSizeSmall: string
  fontSizeXs: string
  fontWeightNormal: string
  fontWeightMedium: string
  fontWeightSemibold: string

  /* ===== 过渡 ===== */
  transitionSpeed: string
}
