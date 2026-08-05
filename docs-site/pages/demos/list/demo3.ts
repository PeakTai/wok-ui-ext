import { DivModule } from 'wok-ui'
import { List } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.addChild(new List({
      items: [],
      emptyText: 'No data found'
    }))
  }
}
