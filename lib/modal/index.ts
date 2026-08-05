import { getWokUiExtI18n } from '../i18n'
import { IconExclamationCircle, IconQuestionCircle } from '../icons'
import { Modal, ModalOptions } from './modal'
import './style.less'

export * from './modal'

// 模态框句柄
export interface ModalHandle {
  close: () => void
}

/**
 * 显示模态框
 * @param opts 模态框选项
 * @returns 模态框句柄
 */
export function showModal(opts: ModalOptions): ModalHandle {
  const modal = new Modal(opts)
  modal.mount(document.body)
  return {
    close: () => {
      modal.destroy()
    }
  }
}
export function showAlert(msg: string): Promise<void>
export function showAlert(opts: { msg: string; onConfirm?: () => void }): void
/**
 * 显示警告模态框
 * @param msg 警告内容
 */
export function showAlert(
  opts:
    | {
        msg: string
        onConfirm?: () => void
      }
    | string
): void | Promise<void> {
  if (typeof opts === 'string') {
    const msg = opts
    return new Promise<void>(resolve => {
      showAlert({
        msg,
        onConfirm: () => {
          resolve()
        }
      })
    })
  }
  const i18n = getWokUiExtI18n()
  const modal = showModal({
    title: i18n.buildMsg('alert-warning'),
    titleIcon: new IconExclamationCircle(),
    closeBtn: false,
    body: opts.msg,
    buttons: {
      confirm: i18n.buildMsg('alert-ok')
    },
    onConfirm: () => {
      modal.close()
      opts.onConfirm?.()
    }
  })
}

export function showConfirm(msg: string): Promise<boolean>
export function showConfirm(opts: {
  msg: string
  onConfirm?: () => void
  onCancel?: () => void
}): void

export function showConfirm(
  opts:
    | {
        msg: string
        onConfirm?: () => void
        onCancel?: () => void
      }
    | string
): Promise<boolean> | void {
  if (typeof opts === 'string') {
    return new Promise<boolean>((resolve, reject) => {
      showConfirm({
        msg: opts,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      })
    })
  }
  const i18n = getWokUiExtI18n()
  const modal = showModal({
    title: i18n.buildMsg('modal-confirm'),
    titleIcon: new IconQuestionCircle(),
    closeBtn: false,
    body: opts.msg,
    buttons: {
      confirm: i18n.buildMsg('modal-confirm'),
      cancel: i18n.buildMsg('modal-cancel')
    },
    onConfirm: () => {
      modal.close()
      opts.onConfirm?.()
    },
    onClose: () => {
      opts.onCancel?.()
    }
  })
}
