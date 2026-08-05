import { VBox, Spacer } from 'wok-ui'
import { Alert } from 'wok-ui-ext'

export default class Demo2 extends VBox {
  constructor() {
    super({ children: [
      new Alert({ type: 'info', title: 'Info Title', content: 'This is an info alert with title' }),
      new Spacer(),
      new Alert({ type: 'success', title: 'Success Title', content: 'This is a success alert with title' }),
      new Spacer(),
      new Alert({ type: 'warning', title: 'Warning Title', content: 'This is a warning alert with title' }),
      new Spacer(),
      new Alert({ type: 'danger', title: 'Danger Title', content: 'This is a danger alert with title' })
    ] })
  }
}
