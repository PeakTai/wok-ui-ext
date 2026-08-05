import { Button, showAlert, showSuccess } from 'wok-ui-ext'

export default class Demo2 extends Button {
  constructor() {
    super({
      text: 'Show Alert',
      type: 'warning',
      onClick: () => showAlert('This is an alert message').then(() => showSuccess('Alert closed'))
    })
  }
}
