import { DivModule } from 'wok-ui'
import { Collapse } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Collapse({
        ghost: true,
        items: [
          { title: 'Panel 1', content: 'Ghost mode without border', defaultOpen: true },
          { title: 'Panel 2', content: 'Content of panel 2' }
        ]
      })
    )
  }
}
