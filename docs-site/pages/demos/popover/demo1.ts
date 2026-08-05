import { HBox } from 'wok-ui'
import { Button, Popover } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    const btn1 = new Button({ text: 'Click me', type: 'primary' })
    new Popover({ trigger: btn1, content: 'Popover content here' })
    super({ gap: 12, children: [btn1] })
  }
}
