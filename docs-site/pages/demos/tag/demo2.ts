import { HBox } from 'wok-ui'
import { Tag, IconEdit } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    const icon = new IconEdit()
    super({ gap: 12, children: [
      new Tag({ text: 'Custom Icon', icon })
    ] })
  }
}
