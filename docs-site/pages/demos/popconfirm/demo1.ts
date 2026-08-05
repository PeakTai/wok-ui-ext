import { Button, Popconfirm } from 'wok-ui-ext'

export default class Demo1 extends Button {
  constructor() {
    const btn = new Button({ text: 'Delete', type: 'danger' })
    new Popconfirm({
      trigger: btn,
      title: 'Confirm delete?',
      confirmType: 'danger',
      onConfirm: () => console.log('deleted')
    })
    super({ text: 'Delete', type: 'danger' })
  }
}
