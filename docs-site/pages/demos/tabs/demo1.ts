import { DivModule } from 'wok-ui'
import { Tabs } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Tabs({
        items: [
          { key: 'overview', label: 'Overview', content: 'Overview content' },
          { key: 'detail', label: 'Detail', content: 'Detail content' },
          { key: 'settings', label: 'Settings', content: 'Settings content' }
        ]
      })
    )
  }
}
