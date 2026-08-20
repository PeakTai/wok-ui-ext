import { DivModule } from 'wok-ui'
import { Segmented, showInfo } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Segmented({
      items: ['All', 'Active', 'Disabled'],
      activeValue: 'All',
      onChange: value => showInfo(`Selected "${value}"`)
    }))
  }
}
