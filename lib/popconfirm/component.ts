import { DivModule, SubModulesOpt } from 'wok-ui'
import { attachPopconfirm, PopoverPlacement, ShowPopconfirmOptions, AttachPopconfirmOptions } from './api'

interface LegacyPopconfirmOptions {
  trigger: HTMLElement | { el: HTMLElement }
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmType?: 'primary' | 'danger'
  onConfirm: () => void
  onCancel?: () => void
}

/**
 * 气泡确认框组件
 *
 * 可以作为容器使用：children 是触发元素。
 * 也兼容旧版 trigger 参数。
 *
 * @example
 * ```ts
 * new Popconfirm({
 *   children: new Button({ text: 'Delete', type: 'danger' }),
 *   title: '确认删除？',
 *   confirmType: 'danger',
 *   onConfirm: () => deleteItem()
 * })
 * ```
 */
export class Popconfirm extends DivModule {
  private binding?: { destroy: () => void }

  constructor(
    opts:
      | {
          children: SubModulesOpt
          title: string
          description?: string
          confirmText?: string
          cancelText?: string
          confirmType?: 'primary' | 'danger'
          placement?: PopoverPlacement
          width?: number
          onConfirm: () => void
          onCancel?: () => void
        }
      | LegacyPopconfirmOptions
  ) {
    super('wok-ui-ext-popconfirm-trigger')

    const options: ShowPopconfirmOptions = {
      target: null as unknown as HTMLElement,
      title: opts.title,
      description: opts.description,
      confirmText: opts.confirmText,
      cancelText: opts.cancelText,
      confirmType: opts.confirmType,
      placement: (opts as { placement?: PopoverPlacement }).placement,
      width: (opts as { width?: number }).width,
      onConfirm: opts.onConfirm,
      onCancel: opts.onCancel
    }

    if ('trigger' in opts) {
      options.target = 'el' in opts.trigger ? opts.trigger.el : opts.trigger
    } else {
      this.addChild(opts.children)
      options.target = this.el
    }

    this.binding = attachPopconfirm(options)
  }

  destroy(): void {
    this.binding?.destroy()
    this.binding = undefined
    super.destroy()
  }
}
