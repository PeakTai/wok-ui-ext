import { DivModule } from 'wok-ui'
import { Collapse } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Collapse({
        items: [
          { title: 'Panel 1', content: 'Content of panel 1', defaultOpen: true },
          { title: 'Panel 2', content: 'Content of panel 2' },
          { title: 'Panel 3', content: 'Content of panel 3' }
        ]
      })
    )
  }
}
