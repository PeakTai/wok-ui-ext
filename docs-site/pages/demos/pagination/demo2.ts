import { DivModule } from 'wok-ui'
import { Pagination } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new Pagination({
      total: 100,
      pz: 10,
      pn: 1,
      simple: true,
      onChange: (pn, pz) => console.log('page', pn)
    }))
  }
}
