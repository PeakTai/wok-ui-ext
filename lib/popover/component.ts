import { DivModule, SubModulesOpt } from 'wok-ui'
import { attachPopover, PopoverPlacement, ShowPopoverOptions } from './api'

interface LegacyPopoverOptions {
  trigger: HTMLElement | { el: HTMLElement }
  content: SubModulesOpt
  placement?: PopoverPlacement
  width?: number
  onClose?: () => void
}

/**
 * 气泡卡片组件
 *
 * 可以作为容器使用：children 是触发元素，content 是浮层内容。
 * 也兼容旧版 trigger 参数。
 *
 * @example
 * ```ts
 * new Popover({
 *   children: new Button({ text: 'Click me' }),
 *   placement: 'bottom',
 *   content: new MyPanel()
 * })
 * ```
 */
export class Popover extends DivModule {
  private binding?: { destroy: () => void }

  constructor(
    opts:
      | {
          children: SubModulesOpt
          content: SubModulesOpt
          placement?: PopoverPlacement
          width?: number
          onClose?: () => void
        }
      | LegacyPopoverOptions
  ) {
    super('wok-ui-ext-popover-trigger')

    const content = opts.content
    const placement = opts.placement || 'bottom'
    const width = opts.width
    const onClose = opts.onClose

    if ('trigger' in opts) {
      const target = 'el' in opts.trigger ? opts.trigger.el : opts.trigger
      this.binding = attachPopover({
        target,
        content,
        placement,
        width,
        onClose
      })
    } else {
      this.addChild(opts.children)
      this.binding = attachPopover({
        target: this.el,
        content,
        placement,
        width,
        onClose
      })
    }
  }

  destroy(): void {
    this.binding?.destroy()
    this.binding = undefined
    super.destroy()
  }
}
