import {
  animate,
  ANIMATION_PROVISION,
  Animation,
  ConvertibleModule,
  DivModule,
  RemoteSvgIcon,
  SubModulesOpt,
  SvgIcon
} from 'wok-ui'
import { Button } from '../button'
import { getWokUiExtI18n } from '../i18n'
import { IconTimes } from '../icons'
/**
 * 模态框选项
 */
export interface ModalOptions {
  /**
   * 标题，无标题不出现头部.
   */
  title?: SubModulesOpt
  /**
   * 标题图标，无图标不出现图标.
   */
  titleIcon?: SvgIcon | RemoteSvgIcon
  /**
   * 是否出现关闭按钮.只在有标题的情况下有效,如果设置为true会在右上角出现关闭图标.默认为 true.
   */
  closeBtn?: boolean
  /**
   * 主体部分.
   */
  body: SubModulesOpt
  /**
   * 使用 body 部分替换掉整个内容，且容器不再附加背景、圆角等外观样式，
   * 外观完全由 body 自定义.
   */
  replaceByBody?: boolean
  /**
   * 追加到模态框容器上的自定义 class，可用于覆盖默认样式.
   */
  className?: string
  /**
   * 宽度，默认 500px.
   */
  width?: number
  /**
   * 关闭回调.
   */
  onClose?: () => void
  /**
   * 确认回调，点击确认按钮后触发
   */
  onConfirm?: () => void
  /**
   * 自定义脚部，优先级高于按钮.
   */
  footer?: ConvertibleModule
  /**
   * 按钮设置，可选，可设置显示按钮或自定义按钮文字，有设置才会显示出来。
   * 当值是 Button[] 类型时，可自定义多个按钮，需要注意按钮是从右往左排列的。
   * 当值是 { confirm?: boolean | string, cancel?: boolean | string } 类型时，
   * 会显示确认按钮和取消按钮，按钮文字可自定义，当值为 true 时，按钮文字为默认值。
   * 确认按钮为主要按钮，取消按钮为次要按钮。
   */
  buttons?:
    | {
        confirm?: boolean | string
        cancel?: boolean | string
      }
    | Button[]
  /**
   * 模态框完全显示回调，在模态框入场动画完成后触发
   * @returns
   */
  onShown?: () => void
}

/**
 * 弹窗组件
 */
export class Modal extends DivModule {
  private docChangeListener?: () => void
  private keydownListener?: (e: KeyboardEvent) => void

  constructor(private readonly opts: ModalOptions) {
    super('wok-ui-ext-modal-overlay')
    const i18n = getWokUiExtI18n()
    document.body.classList.add('modal-open')
    const containerClassNames = ['wok-ui-ext-modal-container', ANIMATION_PROVISION]
    if (opts.replaceByBody) {
      containerClassNames.push('wok-ui-ext-modal-replace-body')
    }
    if (opts.className) {
      containerClassNames.push(opts.className)
    }
    this.addChild({
      classNames: containerClassNames,
      preHandle(el) {
        if (typeof opts.width === 'number' && opts.width > 0) {
          el.style.width = `${opts.width}px`
        }
      },
      children: add => {
        if (opts.replaceByBody) {
          add(opts.body)
          return
        }
        // 头部
        if (opts.title) {
          const title = opts.title
          add({
            classNames: 'wok-ui-ext-modal-header',
            children: add => {
              // 标题
              add({
                tag: 'h3',
                children: add => {
                  if (opts.titleIcon) {
                    add(opts.titleIcon, ' ')
                  }
                  add(title)
                }
              })
              // 关闭按钮
              if (opts.closeBtn !== false) {
                add({
                  tag: 'button',
                  classNames: 'wok-ui-ext-modal-close',
                  attrs: {
                    'aria-label': i18n.buildMsg('modal-close')
                  },
                  children: new IconTimes(),
                  onClick: () => {
                    this.destroy()
                    opts.onClose?.()
                  }
                })
              }
            }
          })
        }
        // body
        add({
          classNames: 'wok-ui-ext-modal-body',
          children: opts.body
        })
        // footer
        if (opts.footer) {
          add({
            classNames: 'wok-ui-ext-modal-footer',
            children: opts.footer
          })
          return
        }
        if (!opts.buttons) {
          return
        }
        const buttons = opts.buttons
        if (
          (Array.isArray(buttons) && buttons.length) ||
          (!Array.isArray(buttons) && (buttons.confirm || buttons.cancel))
        ) {
          add({
            classNames: 'wok-ui-ext-modal-footer',
            children: add => {
              if (Array.isArray(buttons)) {
                add(...buttons)
                return
              }
              // 确定和取消
              if (buttons.cancel) {
                add(
                  new Button({
                    type: 'secondary',
                    text: buttons.cancel === true ? i18n.buildMsg('modal-cancel') : buttons.cancel,
                    onClick: () => {
                      this.destroy()
                      opts.onClose?.()
                    }
                  })
                )
              }
              if (buttons.confirm) {
                add(
                  new Button({
                    type: 'primary',
                    text:
                      buttons.confirm === true ? i18n.buildMsg('modal-confirm') : buttons.confirm,
                    onClick: () => opts.onConfirm?.()
                  })
                )
              }
            }
          })
        }
      }
    })
    // 监听文档变化，当路由变化时自动关闭
    this.docChangeListener = () => this.destroy()
    window.addEventListener('popstate', this.docChangeListener, { once: true })
    // Esc 键关闭
    this.keydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const btns = opts.buttons
        const hasCancelBtn = !Array.isArray(btns) && btns && btns.cancel
        if (hasCancelBtn) {
          // 有取消按钮 → 触发取消行为（showConfirm 的取消回调）
          opts.onClose?.()
          this.destroy()
        } else if (!Array.isArray(btns) && btns && btns.confirm) {
          // 只有确认按钮 → 触发确认行为（showAlert 的确认回调）
          opts.onConfirm?.()
          this.destroy()
        } else {
          // 无按钮或自定义按钮数组 → 直接关闭
          this.destroy()
        }
      }
    }
    document.addEventListener('keydown', this.keydownListener)
  }

  mount(parentEl: Element): void {
    parentEl.appendChild(this.el)
    const container = this.el.querySelector('.wok-ui-ext-modal-container') as HTMLElement
    if (container) {
      animate({
        el: container,
        animation: Animation.SCALE_UP,
        duration: 200
      }).then(() => {
        this.opts.onShown?.()
      })
    }
  }

  private destroyed = false

  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    const container = this.el.querySelector('.wok-ui-ext-modal-container') as HTMLElement
    const doDestroy = () => {
      // 先清理事件监听，再销毁 DOM
      if (this.docChangeListener) {
        document.removeEventListener('popstate', this.docChangeListener)
      }
      if (this.keydownListener) {
        document.removeEventListener('keydown', this.keydownListener)
      }
      if (!document.querySelector('.wok-ui-ext-modal-overlay')) {
        document.body.classList.remove('modal-open')
      }
      super.destroy()
    }
    if (container) {
      animate({
        el: container,
        animation: Animation.SCALE_UP,
        reverse: true,
        duration: 200
      }).then(() => {
        doDestroy()
      })
    } else {
      doDestroy()
    }
  }
}
