import { DivModule } from 'wok-ui'
import { Image } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Image({ src: 'https://picsum.photos/200/150', alt: 'A random photo' }))
  }
}
