import { SubModulesOpt } from 'wok-ui'
import { FloatingLayer, FloatingPlacement } from '../floating-layer'
import './style.less'

/** 弹出位置，与 FloatingLayer 的定位方向一致 */
export type PopoverPlacement = FloatingPlacement

export interface ShowPopoverOptions {
  /** 定位目标元素 */
  target: HTMLElement
  /** 弹出内容 */
  content: SubModulesOpt
  /** 弹出位置，默认 bottom */
  placement?: PopoverPlacement
  /** 宽度（px） */
  width?: number
  /** 关闭回调 */
  onClose?: () => void
}

export interface AttachPopoverOptions extends ShowPopoverOptions {}

/** 当前打开的气泡卡片，全局同时只存在一个 */
let activePopover: PopoverLayer | null = null

/**
 * 气泡卡片浮层。挂载到 body，由 FloatingLayer 提供定位、滚动跟随、自动关闭。
 */
class PopoverLayer extends FloatingLayer {
  private readonly content: SubModulesOpt

  constructor(opts: {
    target: HTMLElement
    placement: PopoverPlacement
    content: SubModulesOpt
    width?: number
    onClose?: () => void
  }) {
    super({ target: opts.target, placement: opts.placement, offset: 10, onClose: opts.onClose })
    this.el.classList.add('wok-ui-ext-popover')
    this.el.dataset.placement = opts.placement
    if (opts.width) {
      this.el.style.width = `${opts.width}px`
    }
    this.content = opts.content
  }

  protected buildContent(): void {
    this.addChild(this.content)
  }

  override destroy(): void {
    if (activePopover === this) {
      activePopover = null
    }
    super.destroy()
  }
}

/**
 * 显示气泡卡片浮层，挂载到 body。
 * 点击浮层外部或按 Esc 关闭，目标元素滚动/窗口变化时自动跟随。
 * @param opts 配置选项
 * @returns 关闭控制器 { close }
 */
export function showPopover(opts: ShowPopoverOptions): { close: () => void } {
  // 先关闭已有的
  activePopover?.destroy()

  const layer = new PopoverLayer({
    target: opts.target,
    placement: opts.placement || 'bottom',
    content: opts.content,
    width: opts.width,
    onClose: opts.onClose
  })
  activePopover = layer
  layer.mount(document.body)

  return { close: () => layer.destroy() }
}

/**
 * 给目标元素绑定点击触发气泡卡片。
 * @param opts 配置选项
 * @returns 解绑控制器 { destroy }
 */
export function attachPopover(opts: AttachPopoverOptions): { destroy: () => void } {
  const clickHandler = () => showPopover(opts)
  opts.target.addEventListener('click', clickHandler)
  return {
    destroy: () => {
      opts.target.removeEventListener('click', clickHandler)
    }
  }
}
