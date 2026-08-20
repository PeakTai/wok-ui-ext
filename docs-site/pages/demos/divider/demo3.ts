import { VBox } from 'wok-ui'
import { Divider } from 'wok-ui-ext'

export default class Demo3 extends VBox {
  constructor() {
    super({
      gap: 12,
      children: [
        'Section one',
        new Divider({ dashed: true }),
        new Divider({ text: 'DASHED', dashed: true }),
        'Section two'
      ]
    })
  }
}
