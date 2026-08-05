import { DivModule } from 'wok-ui'
import { Card, BodyText, Title } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new Card({
      header: new Title('Card Header'),
      content: new BodyText('Card body content'),
      footer: 'Card Footer'
    }))
  }
}
