import { HBox } from 'wok-ui'
import { Badge, IconBell, IconInbox, IconUser } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 40, children: [
      new Badge({ count: 5, children: new IconBell() }),
      new Badge({ count: 99, children: new IconInbox() }),
      new Badge({ count: 100, children: new IconUser() }),
      new Badge({ dot: true, children: new IconBell() })
    ] })
  }
}
