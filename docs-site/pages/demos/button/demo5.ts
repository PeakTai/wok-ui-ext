import { Button, showSuccess } from 'wok-ui-ext'

export default class Demo5 extends Button {
  constructor() {
    super({
      text: 'Click me',
      type: 'primary',
      onClick: () => showSuccess('Operation successful')
    })
  }
}
