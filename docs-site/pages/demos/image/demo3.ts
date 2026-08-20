import { HBox } from 'wok-ui'
import { Image } from 'wok-ui-ext'

export default class Demo3 extends HBox {
  constructor() {
    super({
      gap: 16,
      wrap: true,
      children: [
        new Image({ src: 'https://picsum.photos/400/300?fit=fill', width: 200, height: 150, fit: 'fill' }),
        new Image({ src: 'https://picsum.photos/400/300?fit=contain', width: 200, height: 150, fit: 'contain' }),
        new Image({ src: 'https://picsum.photos/400/300?fit=cover', width: 200, height: 150, fit: 'cover' }),
        new Image({ src: 'https://picsum.photos/400/300?fit=none', width: 200, height: 150, fit: 'none' }),
        new Image({ src: 'https://picsum.photos/400/300?fit=scale-down', width: 200, height: 150, fit: 'scale-down' })
      ]
    })
  }
}
