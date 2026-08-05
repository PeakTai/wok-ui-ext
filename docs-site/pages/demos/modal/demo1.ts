import { Button, showModal } from 'wok-ui-ext'

export default class Demo1 extends Button {
  constructor() {
    super({
      text: 'Open Modal',
      type: 'primary',
      onClick: () => showModal({
        title: 'Modal Title',
        body: 'This is modal content',
        buttons: { confirm: 'OK' },
        onConfirm: () => console.log('confirmed')
      })
    })
  }
}
