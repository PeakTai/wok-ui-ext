import { HBox } from 'wok-ui'
import { Avatar } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 16, children: [
      new Avatar({}),
      new Avatar({ src: '/imgs/avatar.jpg' })
    ] })
  }
}
