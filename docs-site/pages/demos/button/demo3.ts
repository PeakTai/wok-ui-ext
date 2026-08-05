import { HBox } from 'wok-ui'
import { Button } from 'wok-ui-ext'

export default class Demo3 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Button({ text: 'Primary', type: 'primary', disabled: true }),
      new Button({ text: 'Default', type: 'default', disabled: true }),
      new Button({ text: 'Danger', type: 'danger', disabled: true })
    ] })
  }
}
