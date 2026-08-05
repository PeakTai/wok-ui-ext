import { DivModule } from 'wok-ui'
import { showContextMenu, showInfo } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.el.style.padding = '40px'
    this.el.style.border = '2px dashed #ccc'
    this.el.style.borderRadius = '8px'
    this.el.style.textAlign = 'center'
    this.el.style.cursor = 'pointer'
    this.el.innerText = 'Click here to open context menu'
    this.el.addEventListener('click', e => {
      showContextMenu({
        menu: [
          { label: 'Cut', callback: () => showInfo('Cut clicked') },
          { label: 'Copy', callback: () => showInfo('Copy clicked') },
          { label: 'Paste', callback: () => showInfo('Paste clicked') }
        ],
        evt: e
      })
    })
  }
}
