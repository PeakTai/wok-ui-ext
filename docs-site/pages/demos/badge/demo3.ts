import { HBox } from 'wok-ui'
import { Badge, IconBell, IconCheckCircle, IconInfoCircle } from 'wok-ui-ext'

export default class Demo3 extends HBox {
  constructor() {
    super({
      gap: 12,
      wrap: true,
      children: [
        new Badge({ text: 'New', type: 'success', icon: new IconBell() }),
        new Badge({ text: 'Verified', type: 'info', icon: new IconCheckCircle() }),
        new Badge({ text: 'Hint', type: 'neutral', icon: new IconInfoCircle() })
      ]
    })
  }
}
