import { Module } from 'wok-ui'
import { IconInput, resolveIcon } from '../icons'
import './style.less'

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
   * @param opts.text 按钮文本
   */
  constructor(opts: {
    size?: 'small' | 'default' | 'large'
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'default' | 'secondary' | 'dashed' | 'ghost'
    icon?: IconInput
    text: string
    disabled?: boolean
    formType?: 'submit' | 'reset'
    onClick?: (evt: MouseEvent) => void
    block?: boolean
  }) {
    const el = document.createElement('button')
    super(el)
    this.el.classList.add('wok-ui-ext-btn')
    if (opts.block) {
      this.el.classList.add('wok-ui-ext-block')
    }
    if (opts.size) {
      this.el.classList.add(`wok-ui-ext-${opts.size}`)
    }
    if (opts.type) {
      this.el.classList.add(`wok-ui-ext-${opts.type}`)
    }
    if (opts.icon) {
      this.addChild(resolveIcon(opts.icon))
    }
    this.addChild(opts.text)
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
