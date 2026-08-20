import { DivModule } from 'wok-ui'
import { Collapse } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Collapse({
        accordion: true,
        items: [
          { title: 'Panel A', content: 'Only one panel can be open at a time', defaultOpen: true },
          { title: 'Panel B', content: 'Opening this will close Panel A' },
          { title: 'Panel C', content: 'Opening this will close the others' }
        ]
      })
    )
  }
}
