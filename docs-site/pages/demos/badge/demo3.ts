import { HBox } from 'wok-ui'
import { Badge, IconBell, showInfo } from 'wok-ui-ext'

export default class Demo3 extends HBox {
  constructor() {
    super({ gap: 40, children: [
      new Badge({ count: 5, offset: [2, 2], children: new IconBell() }),
      new Badge({ count: 8, children: new IconBell(), onClick: () => showInfo('点击了徽标') }),
      new Badge({ count: 8, hidden: true, children: new IconBell() })
    ] })
  }
}
