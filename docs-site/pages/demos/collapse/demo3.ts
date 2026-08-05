import { DivModule } from 'wok-ui'
import { Collapse } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Collapse({
        accordion: true,
        collapsible: true,
        items: [
          { title: 'Panel X', content: 'Click again to collapse', defaultOpen: true },
          { title: 'Panel Y', content: 'All panels can be fully collapsed' }
        ]
      })
    )
  }
}
