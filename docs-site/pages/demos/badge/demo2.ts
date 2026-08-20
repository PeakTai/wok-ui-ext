import { HBox } from 'wok-ui'
import { Badge } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Badge({ count: 6 }),
      new Badge({ count: 100 }),
      new Badge({ count: 0, showZero: true }),
      new Badge({ count: 3, type: 'primary' }),
      new Badge({ count: 3, type: 'success' }),
      new Badge({ count: 3, type: 'warning' }),
      new Badge({ count: 3, type: 'info' })
    ] })
  }
}
