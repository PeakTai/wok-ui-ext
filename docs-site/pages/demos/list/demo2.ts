import { DivModule } from 'wok-ui'
import { List } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new List({
      items: ['Item 1', 'Item 2', 'Item 3'],
      bordered: false
    }))
  }
}
