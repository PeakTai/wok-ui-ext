import { Module } from 'wok-ui'
import { IconInput, resolveIcon } from '../icons'
import './style.less'

/** 按钮的公共参数（不含 icon / text） */
type ButtonBaseOpts = {
  size?: 'small' | 'default' | 'large'
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default' | 'secondary' | 'dashed' | 'ghost'
  ariaLabel?: string
  classNames?: string[]
  attrs?: Record<string, string>
  disabled?: boolean
  formType?: 'submit' | 'reset'
  onClick?: (evt: MouseEvent) => void
  block?: boolean
}

/**
 * 按钮参数。
 * icon 与 text 至少需要传一个：
 * - 只传 icon：纯图标按钮
 * - 只传 text：文本按钮
 * - 都传：图标 + 文本按钮
 */
export type ButtonOpts = ButtonBaseOpts &
  ({ icon: IconInput; text?: string } | { icon?: IconInput; text: string })

/**
 * 按钮
 */
export class Button extends Module {
  /**
   * 按钮组件
   * @param opts
   * @param opts.size 按钮大小
   * @param opts.type 按钮类型：
   * primary 主要按钮，作用是触发主要操作；
   * success 成功按钮，作用是表示成功操作；
   * warning 警告按钮，作用是表示警告操作；
   * danger 危险按钮，作用是表示危险操作；
   * default 默认按钮，作用是表示普通操作；
   * secondary 次要按钮，作用是表示次要操作。
   * @param opts.disabled 是否禁用
   * @param opts.formType 表单类型
   * @param opts.icon 按钮图标
   * @param opts.text 按钮文本，不传且传入了 icon 时为纯图标按钮
   * @param opts.ariaLabel 无障碍标签，纯图标按钮推荐传入
   * @param opts.classNames 附加到按钮元素的自定义 class
   * @param opts.attrs 附加到按钮元素的自定义属性（如 aria-*、data-*）
   */
  constructor(opts: ButtonOpts) {
    const el = document.createElement('button')
    super(el)
    this.el.classList.add('wok-ui-ext-btn')
    const iconOnly = !!opts.icon && !opts.text
    if (iconOnly) {
      this.el.classList.add('wok-ui-ext-icon-only')
    }
    if (opts.block) {
      this.el.classList.add('wok-ui-ext-block')
    }
    if (opts.size) {
      this.el.classList.add(`wok-ui-ext-${opts.size}`)
    }
    if (opts.type) {
      this.el.classList.add(`wok-ui-ext-${opts.type}`)
    }
    if (opts.classNames) {
      this.el.classList.add(...opts.classNames)
    }
    if (opts.icon) {
      this.addChild(resolveIcon(opts.icon))
    }
    if (opts.text) {
      this.addChild(opts.text)
    }
    if (opts.ariaLabel) {
      this.el.setAttribute('aria-label', opts.ariaLabel)
    }
    if (opts.attrs) {
      for (const [key, value] of Object.entries(opts.attrs)) {
        this.el.setAttribute(key, value)
      }
    }
    if (opts.onClick) {
      this.el.addEventListener('click', opts.onClick)
    }
    if (opts.formType === 'submit') {
      el.type = 'submit'
    } else if (opts.formType === 'reset') {
      el.type = 'reset'
    } else {
      el.type = 'button'
    }
    if (opts.disabled) {
      el.disabled = true
    }
  }
}
