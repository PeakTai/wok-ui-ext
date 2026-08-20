import { SubModulesOpt } from 'wok-ui'
import { FloatingLayer } from '../floating-layer'
import './style.less'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface AttachTooltipOptions {
  /** 要绑定的目标元素 */
  target: HTMLElement
  /** 提示内容 */
  content: SubModulesOpt
  /** 提示位置，默认 top */
  placement?: TooltipPlacement
  /** 显示延迟，默认 0ms */
  delay?: number
  /** 隐藏延迟，默认 0ms */
  leaveDelay?: number
  /** 是否禁用，默认 false */
  disabled?: boolean
}

/**
 * 提示浮层。挂载到 body，由 FloatingLayer 提供定位、滚动跟随、自动关闭。
 */
class TooltipLayer extends FloatingLayer {
  private readonly content: SubModulesOpt

  constructor(opts: {
    target: HTMLElement
    placement: TooltipPlacement
    content: SubModulesOpt
    onClose?: () => void
  }) {
    super({ target: opts.target, placement: opts.placement, offset: 10, onClose: opts.onClose })
    this.el.classList.add('wok-ui-ext-tooltip-layer')
    this.el.classList.add(opts.placement)
    this.content = opts.content
  }

  protected buildContent(): void {
    this.addChild(this.content)
  }
}

export class TooltipBinding {
  private tooltip?: TooltipLayer
  private target: HTMLElement
  private content: SubModulesOpt
  private placement: TooltipPlacement
  private delay: number
  private leaveDelay: number
  private disabled: boolean
  private showTimer?: number
  private hideTimer?: number

  private handleMouseEnter = () => {
    if (this.disabled) return
    this.clearHideTimer()
    this.showTimer = window.setTimeout(() => {
      this.show()
    }, this.delay)
  }

  private handleMouseLeave = () => {
    this.clearShowTimer()
    this.hideTimer = window.setTimeout(() => {
      this.hide()
    }, this.leaveDelay)
  }

  constructor(opts: AttachTooltipOptions) {
    this.target = opts.target
    this.content = opts.content
    this.placement = opts.placement || 'top'
    this.delay = opts.delay ?? 0
    this.leaveDelay = opts.leaveDelay ?? 0
    this.disabled = opts.disabled ?? false

    this.target.addEventListener('mouseenter', this.handleMouseEnter)
    this.target.addEventListener('mouseleave', this.handleMouseLeave)
  }

  private show(): void {
    if (this.tooltip) return
    const layer = new TooltipLayer({
      target: this.target,
      placement: this.placement,
      content: this.content,
      onClose: () => {
        // 浮层可能被外部点击/Esc/目标滚出视口自动销毁，这里同步清理引用
        if (this.tooltip === layer) {
          this.tooltip = undefined
        }
      }
    })
    this.tooltip = layer
    layer.mount(document.body)
  }

  private hide(): void {
    this.tooltip?.destroy()
    this.tooltip = undefined
  }

  private clearShowTimer(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = undefined
    }
  }

  private clearHideTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer)
      this.hideTimer = undefined
    }
  }

  update(opts: Partial<AttachTooltipOptions>): void {
    if (opts.content !== undefined) this.content = opts.content
    if (opts.placement !== undefined) this.placement = opts.placement
    if (opts.delay !== undefined) this.delay = opts.delay
    if (opts.leaveDelay !== undefined) this.leaveDelay = opts.leaveDelay
    if (opts.disabled !== undefined) this.disabled = opts.disabled
  }

  destroy(): void {
    this.clearShowTimer()
    this.clearHideTimer()
    this.target.removeEventListener('mouseenter', this.handleMouseEnter)
    this.target.removeEventListener('mouseleave', this.handleMouseLeave)
    this.hide()
  }
}

/**
 * 给 DOM 元素附加 tooltip。
 * 鼠标进入时创建 tooltip 浮层并挂载到 body，鼠标离开时销毁。
 * @param opts 配置选项
 * @returns 绑定实例，调用 destroy 可解绑
 */
export function attachTooltip(opts: AttachTooltipOptions): TooltipBinding {
  return new TooltipBinding(opts)
}
