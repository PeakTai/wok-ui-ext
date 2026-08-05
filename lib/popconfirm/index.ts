import { SubModulesOpt } from 'wok-ui'
import { Button } from '../button'
import { Popover, PopoverOptions } from '../popover'
import { getWokUiExtI18n } from '../i18n'
import './style.less'

export interface PopconfirmOptions {
  /** 触发元素 */
  trigger: HTMLElement | { el: HTMLElement }
  /** 确认提示文字 */
  title: string
  /** 详细描述（可选） */
  description?: string
  /** 确认按钮文字，默认「确定」 */
  confirmText?: string
  /** 取消按钮文字，默认「取消」 */
  cancelText?: string
  /** 确认按钮类型，默认 primary */
  confirmType?: 'primary' | 'danger'
  /** 确认回调 */
  onConfirm: () => void
  /** 取消回调 */
  onCancel?: () => void
}

/**
 * 气泡确认框
 *
 * @example
 * ```ts
 * new Popconfirm({
 *   trigger: deleteBtn,
 *   title: '确定删除吗？',
 *   description: '删除后不可恢复',
 *   confirmType: 'danger',
 *   onConfirm: () => deleteUser(id),
 * })
 * ```
 */
export class Popconfirm extends Popover {
  private confirmed = false

  constructor(opts: PopconfirmOptions) {
    const i18n = getWokUiExtI18n()
    const refs: { hide?: () => void; confirm?: () => void } = {}

    // 构建确认内容（纯 add 回调，不直接调用 addChild）
    const content: SubModulesOpt = {
      classNames: 'wok-ui-ext-popconfirm-body',
      children: add => {
        // 标题
        add({
          tag: 'div',
          classNames: 'wok-ui-ext-popconfirm-title',
          children: opts.title
        })
        // 描述
        if (opts.description) {
          add({
            tag: 'div',
            classNames: 'wok-ui-ext-popconfirm-desc',
            children: opts.description
          })
        }
        // 按钮组
        add({
          classNames: 'wok-ui-ext-popconfirm-btns',
          children: add2 => {
            add2(
              new Button({
                text: opts.cancelText || i18n.buildMsg('modal-cancel'),
                size: 'small',
                type: 'default',
                onClick: () => {
                  refs.hide?.()
                  opts.onCancel?.()
                }
              })
            )
            add2(
              new Button({
                text: opts.confirmText || i18n.buildMsg('modal-confirm'),
                size: 'small',
                type: opts.confirmType || 'primary',
                onClick: () => {
                  refs.confirm?.()
                  refs.hide?.()
                  opts.onConfirm()
                }
              })
            )
          }
        })
      }
    }

    const popoverOpts: PopoverOptions = {
      trigger: opts.trigger,
      content,
      placement: 'top',
      width: 260,
      onClose: () => {
        if (!this.confirmed) opts.onCancel?.()
      }
    }
    super(popoverOpts)

    // super() 之后挂载 refs
    refs.hide = () => this.hide()
    refs.confirm = () => {
      this.confirmed = true
    }
  }
}
