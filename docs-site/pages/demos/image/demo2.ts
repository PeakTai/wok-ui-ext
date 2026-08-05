import { HBox } from 'wok-ui'
import { Image } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({
      gap: 16,
      children: [
        new Image({ src: 'https://picsum.photos/200/150', width: 200, height: 150 }),
        new Image({ src: 'https://picsum.photos/200/150?2', width: 120, height: 150 }),
        new Image({ src: 'https://picsum.photos/200/150?3', width: 150, height: 100 })
      ]
    })
  }
}
