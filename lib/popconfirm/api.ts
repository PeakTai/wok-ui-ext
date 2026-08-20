import { SubModulesOpt } from 'wok-ui'
import { Button } from '../button'
import { getWokUiExtI18n } from '../i18n'
import { showPopover, attachPopover, PopoverPlacement, ShowPopoverOptions, AttachPopoverOptions } from '../popover'
import './style.less'

export type { PopoverPlacement } from '../popover'

export interface ShowPopconfirmOptions {
  /** 定位目标元素 */
  target: HTMLElement
  /** 确认提示文字 */
  title: string
  /** 详细描述 */
  description?: string
  /** 确认按钮文字，默认「确定」 */
  confirmText?: string
  /** 取消按钮文字，默认「取消」 */
  cancelText?: string
  /** 确认按钮类型，默认 primary */
  confirmType?: 'primary' | 'danger'
  /** 弹出位置，默认 top */
  placement?: PopoverPlacement
  /** 宽度（px），默认 260 */
  width?: number
  /** 确认回调 */
  onConfirm: () => void
  /** 取消回调 */
  onCancel?: () => void
}

export interface AttachPopconfirmOptions extends ShowPopconfirmOptions {}

/**
 * 显示气泡确认框。
 * @param opts 配置选项
 * @returns 关闭控制器 { close }
 */
export function showPopconfirm(opts: ShowPopconfirmOptions): { close: () => void } {
  const i18n = getWokUiExtI18n()
  let confirmed = false

  const content: SubModulesOpt = add => {
    add({
      tag: 'div',
      classNames: 'wok-ui-ext-popconfirm-title',
      children: opts.title
    })
    if (opts.description) {
      add({
        tag: 'div',
        classNames: 'wok-ui-ext-popconfirm-desc',
        children: opts.description
      })
    }
    add({
      classNames: 'wok-ui-ext-popconfirm-btns',
      children: [
        new Button({
          text: opts.cancelText || i18n.buildMsg('modal-cancel'),
          size: 'small',
          type: 'default',
          onClick: () => {
            close()
            opts.onCancel?.()
          }
        }),
        new Button({
          text: opts.confirmText || i18n.buildMsg('modal-confirm'),
          size: 'small',
          type: opts.confirmType || 'primary',
          onClick: () => {
            confirmed = true
            close()
            opts.onConfirm()
          }
        })
      ]
    })
  }

  const { close } = showPopover({
    target: opts.target,
    content,
    placement: opts.placement || 'top',
    width: opts.width || 260,
    onClose: () => {
      if (!confirmed) {
        opts.onCancel?.()
      }
    }
  })

  return { close }
}

/**
 * 给目标元素绑定点击触发气泡确认框。
 * @param opts 配置选项
 * @returns 解绑控制器 { destroy }
 */
export function attachPopconfirm(opts: AttachPopconfirmOptions): { destroy: () => void } {
  const clickHandler = () => showPopconfirm(opts)
  opts.target.addEventListener('click', clickHandler)
  return {
    destroy: () => {
      opts.target.removeEventListener('click', clickHandler)
    }
  }
}
