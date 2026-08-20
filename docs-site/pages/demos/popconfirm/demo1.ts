import { HBox } from 'wok-ui'
import { Button, Popconfirm, showInfo } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Popconfirm({
        children: new Button({ text: 'Delete', type: 'danger' }),
        title: 'Confirm delete?',
        confirmType: 'danger',
        onConfirm: () => showInfo('deleted')
      })
    ]})
  }
}
