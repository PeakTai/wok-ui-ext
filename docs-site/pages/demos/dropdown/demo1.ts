import { DivModule } from 'wok-ui'
import { Button, Dropdown, showInfo } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Dropdown({
      children: new Button({ text: 'Click me', type: 'primary' }),
      items: [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' }
      ],
      onSelect: index => showInfo(`Option ${index + 1} selected`)
    }))
  }
}
