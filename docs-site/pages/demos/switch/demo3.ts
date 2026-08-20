import { DivModule, Spacer, HBox } from 'wok-ui'
import { Switch } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new Switch({ disabled: true }),
          new Switch({ disabled: true, checked: true }),
          new Switch({ label: 'Disabled Switch', disabled: true })
        ] })
    )
  }
}
