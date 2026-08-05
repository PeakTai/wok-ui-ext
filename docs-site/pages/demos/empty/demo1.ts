import { DivModule } from 'wok-ui'
import { Empty } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Empty({ text: 'No data found' }))
  }
}
