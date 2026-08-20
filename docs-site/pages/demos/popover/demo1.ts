import { HBox } from 'wok-ui'
import { Button, Popover } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Popover({
        children: new Button({ text: 'Click me', type: 'primary' }),
        content: 'Popover content here'
      })
    ]})
  }
}
