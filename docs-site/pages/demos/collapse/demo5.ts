import { DivModule } from 'wok-ui'
import { Collapse } from 'wok-ui-ext'

export default class Demo5 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Collapse({
        items: [
          { title: 'Normal Panel', content: 'This panel works as usual', defaultOpen: true },
          { title: 'Disabled Panel', content: 'Content is hidden', disabled: true }
        ]
      })
    )
  }
}
