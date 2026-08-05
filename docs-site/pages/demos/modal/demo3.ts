import { Button, showConfirm, showSuccess, showWarning } from 'wok-ui-ext'

export default class Demo3 extends Button {
  constructor() {
    super({
      text: 'Confirm',
      type: 'danger',
      onClick: () => showConfirm('Are you sure?').then(r => {
        if (r) showSuccess('Confirmed')
        else showWarning('Cancelled')
      })
    })
  }
}
