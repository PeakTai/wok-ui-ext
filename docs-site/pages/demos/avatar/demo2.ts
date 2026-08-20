import { HBox } from 'wok-ui'
import { Avatar } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({ gap: 16, children: [
      new Avatar({ size: 'sm' }),
      new Avatar({}),
      new Avatar({ size: 'lg' }),
      new Avatar({ size: 64, src: '/imgs/avatar.jpg' })
    ] })
  }
}
