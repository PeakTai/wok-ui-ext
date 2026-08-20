import { DivModule } from 'wok-ui'
import { Button, Dropdown, showInfo } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.el.style.display = 'flex'
    this.el.style.justifyContent = 'flex-end'
    this.addChild(new Dropdown({
      align: 'right',
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
