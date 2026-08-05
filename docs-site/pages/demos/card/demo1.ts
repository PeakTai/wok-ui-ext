import { DivModule } from 'wok-ui'
import { Card, BodyText } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Card({
      content: new BodyText('This is card content body text')
    }))
  }
}
