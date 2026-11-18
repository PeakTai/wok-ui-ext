import { DivModule } from 'wok-ui'
import { Tabs } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Tabs({
        items: [
          { key: 'a', label: 'Enabled', content: 'Enabled content' },
          { key: 'b', label: 'Disabled', content: 'Hidden content', disabled: true }
        ]
      })
    )
  }
}
