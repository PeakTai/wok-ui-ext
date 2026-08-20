import { HBox } from 'wok-ui'
import { Button, showSuccess, showError, showWarning, showInfo } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Button({ text: 'Success', type: 'success', onClick: () => showSuccess('Operation successful') }),
      new Button({ text: 'Error', type: 'danger', onClick: () => showError('Something went wrong') }),
      new Button({ text: 'Warning', type: 'warning', onClick: () => showWarning('Please check your input') }),
      new Button({ text: 'Info', type: 'primary', onClick: () => showInfo('Here is some information') })
    ] })
  }
}
