import { DivModule, RemoteSvgIcon, SubModulesOpt, SvgIcon } from 'wok-ui'
import './style.less'
import { IconInfoCircle, IconCheckCircle, IconExclamationCircle, IconTimesCircle, IconTimes } from '../icons'

export class Alert extends DivModule {
  constructor(opts: {
    type: 'info' | 'success' | 'warning' | 'danger'
    title?: string
    content: SubModulesOpt
    closeable?: boolean
  }) {
    super('wok-ui-ext-alert')
    this.el.classList.add(`wok-ui-ext-alert-${opts.type}`)
    let icon: SvgIcon | RemoteSvgIcon = new IconInfoCircle()
    switch (opts.type) {
      case 'success':
        icon = new IconCheckCircle()
        break
      case 'warning':
        icon = new IconExclamationCircle()
        break
      case 'danger':
        icon = new IconTimesCircle()
        break
    }
    this.addChild(
      { classNames: 'wok-ui-ext-alert-icon', children: icon },
      {
        classNames: 'wok-ui-ext-alert-body',
        children: add => {
          if (opts.title) {
            add({
              classNames: 'wok-ui-ext-alert-title',
              innerText: opts.title
            })
          }
          add({
            classNames: 'wok-ui-ext-alert-content',
            children: opts.content
          })
        }
      }
    )
    if (opts.closeable) {
      this.addChild({
        classNames: 'wok-ui-ext-alert-close',
        children: new IconTimes(),
        onClick: () => {
          this.el.classList.add('wok-ui-ext-alert-dismissing')
          setTimeout(() => {
            this.destroy()
          }, 150)
        }
      })
    }
  }
}
