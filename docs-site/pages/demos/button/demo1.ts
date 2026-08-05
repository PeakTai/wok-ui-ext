import { HBox } from 'wok-ui'
import { Button } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Button({ text: 'Default', type: 'default' }),
      new Button({ text: 'Primary', type: 'primary' }),
      new Button({ text: 'Success', type: 'success' }),
      new Button({ text: 'Warning', type: 'warning' }),
      new Button({ text: 'Danger', type: 'danger' }),
      new Button({ text: 'Secondary', type: 'secondary' }),
      new Button({ text: 'Dashed', type: 'dashed' }),
      new Button({ text: 'Ghost', type: 'ghost' })
    ] })
  }
}
