import { DivModule, SubModulesOpt } from 'wok-ui'
import { getWokUiExtI18n } from '../i18n'
import { IconTimes } from '../icons'
import './style.less'

export interface DrawerOptions {
  /**
   * 从哪个方向滑出，默认 right
   */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * 标题
   */
  title?: string
  /**
   * 宽度（仅 left/right 有效），默认 400px
   */
  width?: number
  /**
   * 主体内容
   */
  body: SubModulesOpt
  /**
   * 用 body 完全替换整个内容面板，
   * 适用于完全自定义内容的场景。设为 true 时 title 不生效。
   */
  replaceByBody?: boolean
  /**
   * 关闭回调
   */
  onClose?: () => void
  /**
   * 入场动画完成后触发
   */
  onShown?: () => void
}

export interface DrawerHandle {
  close: () => void
}

// ─── 内容面板 ──────────────────────────────────────

class Content extends DivModule {
  private called = false
  private animating = false

  constructor(
    private readonly opts: DrawerOptions,
    private readonly onDestroy: () => void
  ) {
    const placement = opts.placement || 'right'
    super('wok-ui-ext-drawer-content')
    this.el.classList.add(placement)

    if (typeof opts.width === 'number' && (placement === 'left' || placement === 'right')) {
      this.el.style.width = `${opts.width}px`
    }

    const i18n = getWokUiExtI18n()

    if (opts.replaceByBody) {
      this.addChild(opts.body)
    } else {
      // 头部
      if (opts.title) {
        this.addChild({
          classNames: 'wok-ui-ext-drawer-header',
          children: add => {
            add({
              tag: 'h3',
              classNames: 'wok-ui-ext-drawer-title',
              children: opts.title
            })
            add({
              tag: 'button',
              classNames: 'wok-ui-ext-drawer-close',
              attrs: {
                'aria-label': i18n.buildMsg('modal-close')
              },
              children: new IconTimes(),
              onClick: () => this.destroy()
            })
          }
        })
      }
      // 主体
      this.addChild({
        classNames: 'wok-ui-ext-drawer-body',
        children: opts.body
      })
    }

    // 入口动画
    this.animateIn(placement)
  }

  private animateIn(placement: string) {
    this.el.style.transition = 'transform 0.25s ease, opacity 0.25s ease'
    // 从对应方向移入
    const offsetMap: Record<string, string> = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      top: 'translateY(-100%)',
      bottom: 'translateY(100%)'
    }
    this.el.style.transform = offsetMap[placement] || offsetMap.right
    this.el.style.opacity = '0'
    // 触发 reflow 后恢复原位
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.el.style.transform = 'translate(0, 0)'
        this.el.style.opacity = '1'
        setTimeout(() => this.opts.onShown?.(), 250)
      })
    })
  }

  private animateOut(): Promise<void> {
    this.animating = true
    return new Promise(resolve => {
      const placement = this.opts.placement || 'right'
      const offsetMap: Record<string, string> = {
        left: 'translateX(-100%)',
        right: 'translateX(100%)',
        top: 'translateY(-100%)',
        bottom: 'translateY(100%)'
      }
      this.el.style.transform = offsetMap[placement] || offsetMap.right
      this.el.style.opacity = '0'
      setTimeout(resolve, 250)
    })
  }

  destroy() {
    if (this.animating) return
    if (this.called) return
    this.called = true
    this.animating = true
    this.animateOut().then(() => {
      super.destroy()
      this.onDestroy()
      this.opts.onClose?.()
    })
  }
}

// ─── 遮罩层 ──────────────────────────────────────────

class Backdrop extends DivModule {
  private contents: Content[] = []
  private escHandler: (e: KeyboardEvent) => void
  destroyed = false

  constructor() {
    super('wok-ui-ext-drawer-backdrop')
    document.body.classList.add('wok-ui-ext-drawer-lock-scroll')
    // 点击遮罩关闭最上层
    this.el.addEventListener('click', () => {
      if (this.contents.length === 0) return
      this.contents[this.contents.length - 1].destroy()
    })
    // Escape 关闭
    this.escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.contents.length > 0) {
        this.contents[this.contents.length - 1].destroy()
      }
    }
    document.addEventListener('keydown', this.escHandler)
  }

  addContent(content: Content) {
    this.contents.push(content)
    this.addChild(content)
  }

  removeContent(content: Content) {
    this.contents = this.contents.filter(c => c !== content)
    if (this.contents.length === 0) {
      this.destroy()
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.escHandler)
    // 清空所有 content
    this.contents.forEach(c => {
      try {
        c.destroy()
      } catch {
        // ignore
      }
    })
    this.contents = []
    document.body.classList.remove('wok-ui-ext-drawer-lock-scroll')
    this.destroyed = true
    super.destroy()
  }
}

// ─── 全局 backdrop ──────────────────────────────────

let backdrop: Backdrop | undefined

function getBackdrop(): Backdrop {
  if (!backdrop || backdrop.destroyed) {
    backdrop = new Backdrop()
    backdrop.mount(document.body)
  }
  return backdrop
}

/**
 * 打开抽屉
 *
 * @example
 * ```ts
 * const drawer = showDrawer({
 *   title: '详情',
 *   body: new MyForm()
 * })
 *
 * // 手动关闭
 * drawer.close()
 * ```
 */
export function showDrawer(opts: DrawerOptions): DrawerHandle {
  const bd = getBackdrop()
  const content = new Content(opts, () => {
    bd.removeContent(content)
  })
  bd.addContent(content)
  return {
    close: () => content.destroy()
  }
}
