import { DivModule, SubModulesOpt } from 'wok-ui'
import { attachTooltip, TooltipBinding, TooltipPlacement } from './api'
import './style.less'

/**
 * 提示框组件
 */
export class Tooltip extends DivModule {
  private binding?: TooltipBinding

  /**
   * 提示框组件，鼠标悬停时显示提示信息。
   * @param opts
   * @param opts.children 触发元素
   * @param opts.content 提示内容
   * @param opts.placement 提示位置，默认 top
   * @param opts.delay 显示延迟，默认 0ms
   * @param opts.leaveDelay 隐藏延迟，默认 0ms
   * @param opts.disabled 是否禁用，默认 false
   */
  constructor(opts: {
    children: SubModulesOpt
    content: SubModulesOpt
    placement?: TooltipPlacement
    delay?: number
    leaveDelay?: number
    disabled?: boolean
  }) {
    super('wok-ui-ext-tooltip-trigger')
    this.addChild(opts.children)
    this.binding = attachTooltip({
      target: this.el,
      content: opts.content,
      placement: opts.placement,
      delay: opts.delay,
      leaveDelay: opts.leaveDelay,
      disabled: opts.disabled
    })
  }

  destroy(): void {
    this.binding?.destroy()
    this.binding = undefined
    super.destroy()
  }
}
