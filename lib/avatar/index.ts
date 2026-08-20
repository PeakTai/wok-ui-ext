import { DivModule } from 'wok-ui'
import './style.less'
import { IconUser } from '../icons'

export class Avatar extends DivModule {
  constructor(opts: { size?: 'sm' | 'lg' | number; src?: string; title?: string }) {
    super('wok-ui-ext-avatar')
    if (opts.title) {
      this.el.title = opts.title
    }
    if (opts.size === 'sm' || opts.size === 'lg') {
      this.el.classList.add(`wok-ui-ext-avatar-${opts.size}`)
    } else if (typeof opts.size === 'number') {
      this.el.style.width = `${opts.size}px`
      this.el.style.height = `${opts.size}px`
      this.el.style.fontSize = `${opts.size / 2}px`
    }
    if (opts.src) {
      this.addChild({
        tag: 'img',
        attrs: {
          src: opts.src
        }
      })
    } else {
      this.addChild(new IconUser())
    }
  }
}
