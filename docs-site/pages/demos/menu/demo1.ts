import { DivModule } from 'wok-ui'
import { Menu, showInfo } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.el.style.width = '240px'
    this.addChild(new Menu({
      items: [
        { key: 'dashboard', label: 'Dashboard' },
        {
          key: 'system', label: 'System',
          children: [
            { key: 'basic', label: 'Basic Settings' },
            { key: 'security', label: 'Security Settings' }
          ]
        },
        { key: 'about', label: 'About' }
      ],
      selectedKey: 'dashboard',
      onClick: key => showInfo(`Menu clicked: ${key}`)
    }))
  }
}
