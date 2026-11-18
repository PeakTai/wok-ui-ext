import { DivModule } from 'wok-ui'
import { Tabs, showInfo } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Tabs({
        items: [
          { key: 'a', label: 'Tab A', content: 'Content A' },
          { key: 'b', label: 'Tab B', content: 'Content B' }
        ],
        activeKey: 'b',
        onChange: key => showInfo(`Switched to ${key}`)
      })
    )
  }
}
