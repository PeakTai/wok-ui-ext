import { HBox, Spacer } from 'wok-ui'
import { Badge } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Badge({ text: '1' }),
      new Badge({ text: '99+' }),
      new Badge({ text: 'New', type: 'success' }),
      new Badge({ text: 'Warning', type: 'warning' })
    ] })
  }
}
