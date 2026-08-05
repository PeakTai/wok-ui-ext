import { DivModule } from 'wok-ui'
import { IconInput, resolveIcon } from '../icons'
import './style.less'

export type BadgeType = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export class Badge extends DivModule {
  constructor(opts: {
    text: string
    type?: BadgeType
    icon?: IconInput
    onClick?: (evt: MouseEvent) => void
  }) {
    super('wok-ui-ext-badge')
    if (opts.type) {
      this.el.classList.add(`wok-ui-ext-badge-${opts.type}`)
    }
    if (opts.icon) {
      this.addChild(resolveIcon(opts.icon))
    }
    this.addChild(opts.icon ? ` ${opts.text}` : opts.text)
    if (opts.onClick) {
      this.el.addEventListener('click', opts.onClick)
    }
  }
}
