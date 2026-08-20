import { DivModule } from 'wok-ui'
import './style.less'

export interface DividerOpts {
  /**
   * 文字（水平模式时显示在中间）
   */
  text?: string
  /**
   * 水平还是垂直，默认水平
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 虚线
   */
  dashed?: boolean
  /**
   * 自定义文字颜色
   */
  color?: string
}

/**
 * 分割线
 *
 * 水平模式（默认）：带文字或不带文字，用于区块分隔
 * 垂直模式：用于行内元素之间的分隔
 */
export class Divider extends DivModule {
  constructor(opts: DividerOpts = {}) {
    const { direction = 'horizontal', dashed, color, text } = opts
    const classNames = `wok-ui-ext-divider wok-ui-ext-divider-${direction}`
    super(classNames)
    if (dashed) {
      this.el.classList.add('wok-ui-ext-divider-dashed')
    }
    if (text) {
      this.el.classList.add('wok-ui-ext-divider-with-text')
      this.addChild({
        tag: 'span',
        classNames: 'wok-ui-ext-divider-text',
        innerText: text
      })
    }
    if (color) {
      this.el.style.setProperty('--divider-color', color)
    }
  }
}
