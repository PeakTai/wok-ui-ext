import { DivModule, SubModulesOpt } from 'wok-ui'
import './style.less'
/**
 * 提示框组件
 * <div class="tooltip-container">
 *  鼠标悬停我
 * <span class="tooltip-text">科技蓝提示</span>
 * </div>
 */
export class Tooltip extends DivModule {
  /**
   * 提示框组件
   * @param opts
   * @param opts.content 提示框内容
   * @param opts.text 提示框文本
   * @param opts.placement 提示框位置
   */
  constructor(opts: {
    content: SubModulesOpt
    text: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }) {
    super('wok-ui-ext-tooltip-container')
    this.addChild(opts.content)
    this.addChild({
      classNames: ['wok-ui-ext-tooltip-text', opts.placement || 'top'],
      children: opts.text
    })
  }
}