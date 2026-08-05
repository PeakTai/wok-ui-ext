import { DivModule } from 'wok-ui'
import { Pagination } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Pagination({
      total: 100,
      pz: 10,
      pn: 1,
      onChange: (pn, pz) => console.log('page', pn, 'size', pz)
    }))
  }
}
