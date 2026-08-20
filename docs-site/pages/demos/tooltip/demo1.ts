import { DivModule } from 'wok-ui'
import { Button, Tooltip } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Tooltip({
      children: new Button({ text: 'Hover me' }),
      content: 'Tooltip content'
    }))
  }
}
