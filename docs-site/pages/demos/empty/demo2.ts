import { DivModule } from 'wok-ui'
import { Empty } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new Empty({ text: 'Empty', noBorder: true }))
  }
}
