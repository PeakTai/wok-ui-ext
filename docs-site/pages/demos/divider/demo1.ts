import { VBox } from 'wok-ui'
import { Divider } from 'wok-ui-ext'

export default class Demo1 extends VBox {
  constructor() {
    super({
      gap: 12,
      children: [
        'Top section content',
        new Divider(),
        'Bottom section content'
      ]
    })
  }
}
