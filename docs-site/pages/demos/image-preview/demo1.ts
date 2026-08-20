import { HBox } from 'wok-ui'
import { Button, previewImage } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Button({
        text: 'Preview Single Image',
        type: 'primary',
        onClick: () => previewImage({ src: 'https://picsum.photos/800/600', alt: 'Random image' })
      }),
      new Button({
        text: 'Preview Multiple',
        type: 'default',
        onClick: () => previewImage([
          { src: 'https://picsum.photos/800/600?1', alt: 'Image 1' },
          { src: 'https://picsum.photos/800/600?2', alt: 'Image 2' },
          { src: 'https://picsum.photos/800/600?3', alt: 'Image 3' }
        ])
      })
    ] })
  }
}
