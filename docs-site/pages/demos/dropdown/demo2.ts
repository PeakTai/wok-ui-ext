import { DivModule } from 'wok-ui'
import { Button, Dropdown, showInfo, IconEdit, IconFolderOpen, IconLock } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new Dropdown({
      children: new Button({ text: 'Click me', type: 'primary' }),
      items: [
        { text: 'Edit', icon: () => new IconEdit() },
        { text: 'Open', icon: () => new IconFolderOpen() },
        { text: 'Lock', icon: () => new IconLock() }
      ],
      onSelect: index => showInfo(`Option ${index + 1} selected`)
    }))
  }
}
