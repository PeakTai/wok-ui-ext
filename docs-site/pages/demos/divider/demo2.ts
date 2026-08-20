import { VBox } from 'wok-ui'
import { Divider } from 'wok-ui-ext'

export default class Demo2 extends VBox {
  constructor() {
    super({
      gap: 12,
      children: [
        'Section one',
        new Divider({ text: 'TEXT' }),
        'Section two'
      ]
    })
  }
}
