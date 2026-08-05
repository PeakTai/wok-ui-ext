import { DivModule, Spacer, HBox } from 'wok-ui'
import { Switch } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new Switch({ label: 'Wi-Fi' }),
          new Switch({ label: 'Bluetooth', checked: true })
        ] })
    )
  }
}
