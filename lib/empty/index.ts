import { DivModule } from 'wok-ui'
import { getWokUiExtI18n } from '../i18n'
import { IconInbox } from '../icons'
import './style.less'

/**
 * 空状态组件
 */
export class Empty extends DivModule {
  constructor(opts: { text?: string; noBorder?: boolean }) {
    super('wok-ui-ext-empty-state')
    if (opts.noBorder) {
      this.el.classList.add('no-border')
    }
    this.addChild(new IconInbox(), 30, {
      tag: 'p',
      className: 'desc',
      innerText: opts.text || getWokUiExtI18n().buildMsg('empty-text')
    })
  }
}
