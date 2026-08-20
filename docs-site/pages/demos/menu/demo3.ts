import { DivModule } from 'wok-ui'
import { Menu, showInfo, IconUser, IconTag, IconFolder, IconEdit, IconLock } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.el.style.width = '240px'
    this.addChild(new Menu({
      collapsed: true,
      items: [
        { key: 'users', icon: new IconUser(), label: 'Users' },
        { key: 'tags', icon: new IconTag(), label: 'Tags' },
        {
          key: 'system', icon: new IconFolder(), label: 'System',
          children: [
            { key: 'basic', icon: new IconEdit(), label: 'Basic Settings' },
            { key: 'security', icon: new IconLock(), label: 'Security' }
          ]
        }
      ],
      selectedKey: 'users',
      onClick: key => showInfo(`Menu clicked: ${key}`)
    }))
  }
}
