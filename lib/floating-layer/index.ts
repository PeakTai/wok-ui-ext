import { DivModule, FullRenderingModule } from 'wok-ui'
import './style.less'

export type FloatingPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'

export interface FloatingLayerOptions {
  /**
   * 定位锚点元素。与 anchor 二选一：基于元素定位时传入，
   * 支持滚动跟随、目标移除自动销毁。
   */
  target?: HTMLElement
  /**
   * 定位锚点坐标（视口坐标）。与 target 二选一：适用于光标定位等
   * 没有固定锚点元素的场景（如右键菜单），此时以该点为零尺寸锚点定位。
   */
  anchor?: { x: number; y: number }
  /** 弹出位置，默认 bottom */
  placement?: FloatingPlacement
  /** 与锚点的间距（px），默认 6 */
  offset?: number
  /** 视口空间不足时自动翻转方向，默认 true */
  autoFlip?: boolean
  /**
   * 页面滚动时的行为，默认 'follow'。
   * - 'follow': 跟随锚点重新定位（target 模式适用）
   * - 'destroy': 直接销毁浮层（菜单等瞬态浮层适用）
   */
  scrollBehavior?: 'follow' | 'destroy'
  /** 关闭回调，浮层销毁时触发（外部点击/Esc/目标移除/手动 destroy 均会触发） */
  onClose?: () => void
}

function isScrollable(el: HTMLElement): boolean {
  const style = getComputedStyle(el)
  return /(auto|scroll|overlay)/.test(style.overflowX + style.overflowY)
}

/**
 * 沿祖先链向上查找所有可滚动容器（用于滚动跟随）。
 * window 由调用方单独监听。
 */
function getScrollParents(el: HTMLElement): HTMLElement[] {
  const parents: HTMLElement[] = []
  let node = el.parentElement
  while (node) {
    if (isScrollable(node)) {
      parents.push(node)
    }
    node = node.parentElement
  }
  return parents
}

function calcPosition(
  placement: FloatingPlacement,
  trigger: DOMRect,
  pw: number,
  ph: number,
  spacing: number
): { top: number; left: number } {
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
    case 'leftTop':
      return {
        top: trigger.top,
        left: trigger.left - pw - spacing
      }
    case 'leftBottom':
      return {
        top: trigger.bottom - ph,
        left: trigger.left - pw - spacing
      }
    case 'right':
      return {
        top: trigger.top + trigger.height / 2 - ph / 2,
        left: trigger.right + spacing
      }
    case 'rightTop':
      return {
        top: trigger.top,
        left: trigger.right + spacing
      }
    case 'rightBottom':
      return {
        top: trigger.bottom - ph,
        left: trigger.right + spacing
      }
  }
}

/**
 * 返回指定方向翻转后的对向方向（bottom ↔ top、left ↔ right），
 * 用于视口空间不足时的自动翻转。
 */
function flipPlacement(p: FloatingPlacement): FloatingPlacement {
  switch (p) {
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    case 'topLeft':
      return 'bottomLeft'
    case 'topRight':
      return 'bottomRight'
    case 'bottomLeft':
      return 'topLeft'
    case 'bottomRight':
      return 'topRight'
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'leftTop':
      return 'rightTop'
    case 'leftBottom':
      return 'rightBottom'
    case 'rightTop':
      return 'leftTop'
    case 'rightBottom':
      return 'leftBottom'
  }
}

/**
 * 通用浮层基类。
 *
 * 将自身挂载到 body 后即显示，核心能力：
 * - 基于目标元素定位（fixed + 视口坐标），支持 8 个方向
 * - 视口空间不足时自动翻转方向（bottom ↔ top、left ↔ right）
 * - 滚动跟随：目标元素的可滚动祖先 + window 滚动时自动重新定位
 * - 自动销毁：点击浮层外部、按 Esc、目标元素被移除时调用 destroy()
 * - destroy() 内统一解除所有事件绑定
 *
 * 内容默认空白，子类通过覆写 buildContent() 添加内容。
 * 注意：不要在构造或 mount 之外直接 addChild 添加内容，统一在 buildContent() 中构建，
 * 因为 buildContent() 在 mount() 时执行，此时子类字段已完成初始化。
 *
 * 用法：
 * ```ts
 * class MyLayer extends FloatingLayer {
 *   protected buildContent(): void {
 *     this.addChild('hello')
 *   }
 * }
 * new MyLayer({ target: btn.el }).mount(document.body)
 * ```
 */
export abstract class FloatingLayer extends DivModule {
  private readonly target?: HTMLElement
  private readonly anchor?: { x: number; y: number }
  private readonly placement: FloatingPlacement
  private readonly offset: number
  private readonly autoFlip: boolean
  private readonly scrollBehavior: 'follow' | 'destroy'
  private readonly onClose?: () => void

  private __contentBuilt = false
  private __layerDestroyed = false
  private __scrollParents: HTMLElement[] = []
  private readonly __boundScrollHandler = () => this.__handleScroll()
  private readonly __boundOutsideHandler = (e: MouseEvent) => this.__handleOutsideClick(e)
  private readonly __boundKeydownHandler = (e: KeyboardEvent) => this.__handleKeydown(e)

  constructor(opts: FloatingLayerOptions) {
    super('wok-ui-ext-floating-layer')
    this.target = opts.target
    this.anchor = opts.anchor
    this.placement = opts.placement ?? 'bottom'
    this.offset = opts.offset ?? 6
    this.autoFlip = opts.autoFlip ?? true
    this.scrollBehavior = opts.scrollBehavior ?? 'follow'
    this.onClose = opts.onClose
  }

  override mount(parentEl: Element): void {
    super.mount(parentEl)
    if (!this.__contentBuilt) {
      this.__contentBuilt = true
      this.buildContent()
    }
    this.__setupListeners()
    // 内容刚挂载，等待浏览器完成布局后再定位
    requestAnimationFrame(() => {
      if (!this.__layerDestroyed && this.el.isConnected) {
        this.reposition()
      }
    })
  }

  /**
   * 构建浮层内容，默认空白，子类覆写。
   */
  protected abstract buildContent(): void

  /**
   * 重新计算浮层位置。滚动/窗口变化时自动调用，子类内容变化后也可主动调用。
   */
  protected reposition(): void {
    if (
      this.__layerDestroyed ||
      !this.el.isConnected ||
      (this.target && !this.target.isConnected)
    ) {
      this.destroy()
      return
    }
    const rect = this.getAnchorRect()
    // 锚点完全滚出视口（不可见）时销毁浮层，避免其被 clamp 在视口边缘常驻
    if (
      rect.bottom < 0 ||
      rect.top > window.innerHeight ||
      rect.right < 0 ||
      rect.left > window.innerWidth
    ) {
      this.destroy()
      return
    }
    const placement = this.__resolvePlacement()
    const pw = this.el.offsetWidth
    const ph = this.el.offsetHeight
    const pos = calcPosition(placement, rect, pw, ph, this.offset)
    const { top, left } = this.__clampToViewport(pos, pw, ph)
    this.el.style.top = `${top}px`
    this.el.style.left = `${left}px`
  }

  /**
   * 获取定位锚点矩形。target 模式返回元素矩形，anchor 模式返回零尺寸矩形。
   */
  private getAnchorRect(): DOMRect {
    if (this.target) {
      return this.target.getBoundingClientRect()
    }
    const a = this.anchor!
    return {
      left: a.x,
      top: a.y,
      right: a.x,
      bottom: a.y,
      width: 0,
      height: 0
    } as DOMRect
  }

  /**
   * 判断一个节点是否属于"浮层内部区域"，用于外部点击判定。
   * 子类可覆写以扩展内部区域（如上下文菜单的子菜单）。
   */
  protected containsTarget(target: Node): boolean {
    if (this.el.contains(target)) return true
    if (this.target && this.target.contains(target)) return true
    return false
  }

  override destroy(): void {
    if (this.__layerDestroyed) return
    this.__layerDestroyed = true
    this.__cleanupListeners()
    this.onClose?.()
    super.destroy()
  }

  // ─── 事件监听 ──────────────────────────────────────

  private __setupListeners(): void {
    // anchor 模式没有锚点元素，无滚动跟随的祖先容器
    if (this.target) {
      this.__scrollParents = getScrollParents(this.target)
      for (const parent of this.__scrollParents) {
        parent.addEventListener('scroll', this.__boundScrollHandler)
      }
    }
    window.addEventListener('scroll', this.__boundScrollHandler)
    window.addEventListener('resize', this.__boundScrollHandler)
    document.addEventListener('mousedown', this.__boundOutsideHandler)
    document.addEventListener('keydown', this.__boundKeydownHandler)
  }

  private __cleanupListeners(): void {
    for (const parent of this.__scrollParents) {
      parent.removeEventListener('scroll', this.__boundScrollHandler)
    }
    this.__scrollParents = []
    window.removeEventListener('scroll', this.__boundScrollHandler)
    window.removeEventListener('resize', this.__boundScrollHandler)
    document.removeEventListener('mousedown', this.__boundOutsideHandler)
    document.removeEventListener('keydown', this.__boundKeydownHandler)
  }

  private __handleScroll(): void {
    if (this.__layerDestroyed) return
    if (this.scrollBehavior === 'destroy') {
      this.destroy()
    } else {
      this.reposition()
    }
  }

  private __handleOutsideClick(e: MouseEvent): void {
    const target = e.target as Node | null
    // 触发点击的元素可能因重新渲染已被移除（如点击浮层/目标自身导致的 DOM 重建），
    // 此时冒泡到 document 的事件不应被当作"点击外部"处理
    if (!target || !target.isConnected) return
    if (this.containsTarget(target)) return
    this.destroy()
  }

  private __handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.destroy()
    }
  }

  // ─── 定位计算 ──────────────────────────────────────

  /**
   * 根据锚点周边可用空间决定实际方向：主方向放不下时翻转，例如 bottom 放不下翻到 top。
   * 对向空间同样不足时保持原方向，由 clamp 做最后兜底。
   */
  private __resolvePlacement(): FloatingPlacement {
    if (!this.autoFlip) return this.placement
    const rect = this.getAnchorRect()
    const pw = this.el.offsetWidth
    const ph = this.el.offsetHeight
    const margin = 8
    const p = this.placement

    const isVertical = p.startsWith('top') || p.startsWith('bottom')
    if (isVertical) {
      const spaceMain = p.startsWith('bottom') ? window.innerHeight - rect.bottom : rect.top
      const spaceOpposite = p.startsWith('bottom') ? rect.top : window.innerHeight - rect.bottom
      const need = ph + this.offset + margin
      if (spaceMain < need && spaceOpposite > need) {
        return flipPlacement(p)
      }
    } else {
      const spaceMain = p.startsWith('right') ? window.innerWidth - rect.right : rect.left
      const spaceOpposite = p.startsWith('right') ? rect.left : window.innerWidth - rect.right
      const need = pw + this.offset + margin
      if (spaceMain < need && spaceOpposite > need) {
        return flipPlacement(p)
      }
    }
    return p
  }

  /**
   * 将浮层坐标限制在视口内（保留 8px 边距），防止浮层超出视口被截断。
   * 自动翻转方向后仍可能因目标位置极端（如紧贴视口边缘）而溢出，这里做最后兜底。
   * @param pos 计算出的坐标
   * @param pw 浮层宽度
   * @param ph 浮层高度
   */
  private __clampToViewport(
    pos: { top: number; left: number },
    pw: number,
    ph: number
  ): { top: number; left: number } {
    const margin = 8
    let { top, left } = pos
    if (left < margin) left = margin
    else if (left + pw > window.innerWidth - margin) left = window.innerWidth - pw - margin
    if (top < margin) top = margin
    else if (top + ph > window.innerHeight - margin) top = window.innerHeight - ph - margin
    return { top, left }
  }
}
