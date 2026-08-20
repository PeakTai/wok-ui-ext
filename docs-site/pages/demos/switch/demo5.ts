import { DivModule, Spacer, HBox, VBox } from 'wok-ui'
import { Switch } from 'wok-ui-ext'

export default class Demo5 extends DivModule {
  constructor() {
    super()
    const progSwitch = new Switch({ label: 'Controlled Switch' })
    this.addChild(
      new Spacer('sm'),
      new VBox({ gap: 8, children: [
          progSwitch,
          new HBox({ gap: 8, children: [
              new Switch({
                label: 'External Control',
                onChange: checked => {
                  progSwitch.setChecked(checked)
                }
              })
            ] })
        ] })
    )
  }
}
