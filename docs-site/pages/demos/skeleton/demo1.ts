import { DivModule } from 'wok-ui'
import { Skeleton } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Skeleton({ rows: 3 }))
  }
}
