import { DivModule } from 'wok-ui'
import { showContextMenu, showInfo } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.el.style.padding = '40px'
    this.el.style.border = '2px dashed #ccc'
    this.el.style.borderRadius = '8px'
    this.el.style.textAlign = 'center'
    this.el.style.cursor = 'pointer'
    this.el.innerText = 'Click here to open context menu with submenu'
    this.el.addEventListener('click', e => {
      showContextMenu({
        menu: [
          { label: 'Cut', callback: () => showInfo('Cut clicked') },
          {
            label: 'More',
            children: [
              { label: 'Option 1', callback: () => showInfo('Option 1 clicked') },
              { label: 'Option 2', callback: () => showInfo('Option 2 clicked') }
            ]
          },
          { label: 'Paste', callback: () => showInfo('Paste clicked') }
        ],
        evt: e
      })
    })
  }
}
