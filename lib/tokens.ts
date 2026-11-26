/**
 * 设计 Token（间距部分）
 *
 * 与 `lib/global.less` 中 `:root` 的 CSS 变量一一对应，供 JS/TS 侧使用。
 * 典型场景：给 HBox / VBox / Grid 等容器组件的 `gap` 参数传值。
 *
 * ⚠️ 修改本文件时，请同步更新 `lib/global.less` 中同名 CSS 变量，保持两侧一致。
 *
 * @example
 * ```ts
 * new HBox({ gap: tokens.gap.md })
 * new VBox({ gap: tokens.gap.sm })
 * someDiv.style.padding = `${tokens.padding.lg}px`
 * ```
 */
export const tokens = {
  /** 内边距档位，单位 px */
  padding: {
    /** 极紧凑：小尺寸控件的纵向、紧贴元素 */
    xxs: 4,
    /** 气泡、紧凑浮层、控件纵向 */
    xs: 8,
    /** 列表项、标签、紧凑块、大尺寸控件纵向 */
    sm: 12,
    /** 卡片、默认内容区、控件横向 */
    md: 16,
    /** 弹窗、抽屉、面板 */
    lg: 24,
    /** 大区块 */
    xl: 32,
    /** 页面头部、结果页 */
    xxl: 48
  },
  /** 元素间距档位，单位 px */
  gap: {
    /** 紧邻元素 */
    xxs: 4,
    /** 图标与文字、按钮组 */
    xs: 8,
    /** 同组块级元素 */
    sm: 12,
    /** 页签、加载组 */
    md: 16,
    /** 区块、表单组 */
    lg: 24,
    /** 页面/区块级 */
    xl: 32
  }
} as const

/** 内边距档位名称 */
export type PaddingSize = keyof typeof tokens.padding
/** 元素间距档位名称 */
export type GapSize = keyof typeof tokens.gap
