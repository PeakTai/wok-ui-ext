import { DivModule, SubModulesOpt } from 'wok-ui'
import './style.less'

export type PopoverPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'right'

export interface PopoverOptions {
  /** 触发元素 */
  trigger: HTMLElement | { el: HTMLElement }
  /** 弹出内容 */
  content: SubModulesOpt
  /** 弹出位置，默认 bottom */
  placement?: PopoverPlacement
  /** 宽度（px） */
  width?: number
  /** 关闭回调 */
  onClose?: () => void
}

/**
 * 气泡卡片
 *
 * 点击触发元素显示浮层，点击浮层外部或按 Esc 关闭。
 *
 * @example
 * ```ts
 * const btn = new Button({ text: '操作' })
 * new Popover({
 *   trigger: btn,
 *   placement: 'bottom',
 *   content: new MyPanel()
 * })
 * ```
 */
export class Popover extends DivModule {
  protected trigger: HTMLElement
  protected visible = false
  private mounted = false
  private clickHandler: () => void
  private outsideHandler: (e: MouseEvent) => void
  private keydownHandler: (e: KeyboardEvent) => void
  private onClose?: () => void

  constructor(opts: PopoverOptions) {
    super('wok-ui-ext-popover')
    this.trigger = 'el' in opts.trigger ? opts.trigger.el : opts.trigger
    this.onClose = opts.onClose

    // 位置标记
    const placement = opts.placement || 'bottom'
    this.el.dataset.placement = placement

    // 宽度
    if (opts.width) {
      this.el.style.width = opts.width + 'px'
    }

    // 内容
    this.addChild(opts.content)

    // 点击触发切换
    this.clickHandler = () => this.toggle()
    this.trigger.addEventListener('click', this.clickHandler)

    // 点击外部关闭
    this.outsideHandler = (e: MouseEvent) => {
      if (!this.visible) return
      const target = e.target as Node
      if (this.el.contains(target)) return
      if (this.trigger.contains(target)) return
      this.hide()
      this.onClose?.()
    }
    document.addEventListener('mousedown', this.outsideHandler)

    // Esc 关闭
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.visible) {
        this.hide()
        this.onClose?.()
      }
    }
    document.addEventListener('keydown', this.keydownHandler)
  }

  /**
   * 显示
   */
  show() {
    if (this.visible) return
    this.visible = true

    if (!this.mounted) {
      this.mount(document.body)
      this.mounted = true
    }

    this.el.style.display = 'block'
    this.position()
  }

  /**
   * 隐藏
   */
  hide() {
    if (!this.visible) return
    this.visible = false
    this.el.style.display = 'none'
  }

  /**
   * 切换显示/隐藏
   */
  toggle() {
    if (this.visible) this.hide()
    else this.show()
  }

  destroy() {
    this.hide()
    this.trigger.removeEventListener('click', this.clickHandler)
    document.removeEventListener('mousedown', this.outsideHandler)
    document.removeEventListener('keydown', this.keydownHandler)
    super.destroy()
  }

  /** 计算位置 */
  private position() {
    const rect = this.trigger.getBoundingClientRect()
    const placement = (this.el.dataset.placement || 'bottom') as PopoverPlacement
    const spacing = 10
    const pw = this.el.offsetWidth
    const ph = this.el.offsetHeight

    // 测量箭头尺寸（通过 CSS 变量或硬编码 8px arrow + 1px border = 9px 偏移）
    const arrowOffset = 0 // 由 CSS arrow 处理视觉间距

    const pos = calcPosition(placement, rect, pw, ph, spacing)

    // 边界修正：不超出视口
    const vw = window.innerWidth
    const vh = window.innerHeight
    let { top, left } = pos

    // 水平超界修正
    if (left < 8) left = 8
    else if (left + pw > vw - 8) left = vw - pw - 8

    // 垂直超界修正
    if (top < 8) top = 8
    else if (top + ph > vh - 8) top = vh - ph - 8

    this.el.style.top = top + 'px'
    this.el.style.left = left + 'px'
  }
}

function calcPosition(
  placement: PopoverPlacement,
  trigger: DOMRect,
  pw: number,
  ph: number,
  spacing: number
) {
  switch (placement) {
    case 'top':
      return {
        top: trigger.top - ph - spacing,
        left: trigger.left + trigger.width / 2 - pw / 2
      }
    case 'topLeft':
      return {
        top: trigger.top - ph - spacing,
        left: trigger.left
      }
    case 'topRight':
      return {
        top: trigger.top - ph - spacing,
        left: trigger.right - pw
      }
    case 'bottom':
      return {
        top: trigger.bottom + spacing,
        left: trigger.left + trigger.width / 2 - pw / 2
      }
    case 'bottomLeft':
      return {
        top: trigger.bottom + spacing,
        left: trigger.left
      }
    case 'bottomRight':
      return {
        top: trigger.bottom + spacing,
        left: trigger.right - pw
      }
    case 'left':
      return {
        top: trigger.top + trigger.height / 2 - ph / 2,
        left: trigger.left - pw - spacing
      }
    case 'right':
      return {
        top: trigger.top + trigger.height / 2 - ph / 2,
        left: trigger.right + spacing
      }
  }
}
