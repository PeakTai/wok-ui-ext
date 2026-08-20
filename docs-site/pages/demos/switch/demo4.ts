import { DivModule, Spacer, HBox } from 'wok-ui'
import { Switch, showInfo } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new Switch({
            label: 'Toggle me',
            onChange: checked => {
              showInfo(`Switch is now ${checked ? 'ON' : 'OFF'}`)
            }
          })
        ] })
    )
  }
}
