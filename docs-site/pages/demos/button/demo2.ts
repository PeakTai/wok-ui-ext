import { HBox } from 'wok-ui'
import { Button } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({
      gap: 12,
      wrap: true,
      align: 'center',
      children: [
        new Button({ text: 'Small', type: 'primary', size: 'small' }),
        new Button({ text: 'Default', type: 'primary' }),
        new Button({ text: 'Large', type: 'primary', size: 'large' })
      ]
    })
  }
}
