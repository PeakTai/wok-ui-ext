import { DivModule } from 'wok-ui'
import { showContextMenu, showInfo, IconEdit, IconFolderOpen, IconLock } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.el.style.padding = '40px'
    this.el.style.border = '2px dashed #ccc'
    this.el.style.borderRadius = '8px'
    this.el.style.textAlign = 'center'
    this.el.style.cursor = 'pointer'
    this.el.innerText = 'Click here to open context menu with icons'
    this.el.addEventListener('click', e => {
      showContextMenu({
        menu: [
          { label: 'Edit', icon: new IconEdit(), callback: () => showInfo('Edit clicked') },
          { label: 'Open', icon: new IconFolderOpen(), callback: () => showInfo('Open clicked') },
          { label: 'Lock', icon: new IconLock(), callback: () => showInfo('Lock clicked') }
        ],
        evt: e
      })
    })
  }
}
