import { HBox } from 'wok-ui'
import { Image } from 'wok-ui-ext'

export default class Demo4 extends HBox {
  constructor() {
    super({
      gap: 16,
      children: [
        new Image({
          src: 'https://invalid.example.com/missing.jpg',
          width: 200,
          height: 150,
          fallbackSrc: 'https://picsum.photos/200/150?fallback'
        }),
        new Image({
          src: 'https://invalid.example.com/missing2.jpg',
          width: 200,
          height: 150
        })
      ]
    })
  }
}
