import { DivModule, HBox } from 'wok-ui'
import { Button, Tabs } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  constructor() {
    super()
    const tabs = new Tabs({
      items: [
        { key: 'a', label: 'Tab A', content: () => 'Content A (rendered on first activation)' },
        { key: 'b', label: 'Tab B', content: () => 'Content B (rendered on first activation)' }
      ]
    })
    this.addChild(
      new HBox({
        gap: 12,
        children: [
          new Button({ text: 'Activate A', onClick: () => tabs.setActiveKey('a') }),
          new Button({ text: 'Activate B', onClick: () => tabs.setActiveKey('b') })
        ]
      }),
      tabs
    )
  }
}
