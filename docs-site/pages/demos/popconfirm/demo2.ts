import { HBox } from 'wok-ui'
import { Button, Popconfirm, showInfo } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Popconfirm({
        children: new Button({ text: 'Delete' }),
        title: 'Confirm delete?',
        description: 'This cannot be undone',
        onConfirm: () => showInfo('deleted')
      })
    ]})
  }
}
