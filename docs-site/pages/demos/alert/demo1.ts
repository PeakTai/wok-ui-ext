import { VBox, Spacer } from 'wok-ui'
import { Alert } from 'wok-ui-ext'

export default class Demo1 extends VBox {
  constructor() {
    super({ children: [
      new Alert({ type: 'info', content: 'This is an info alert' }),
      new Spacer(),
      new Alert({ type: 'success', content: 'This is a success alert' }),
      new Spacer(),
      new Alert({ type: 'warning', content: 'This is a warning alert' }),
      new Spacer(),
      new Alert({ type: 'danger', content: 'This is a danger alert' })
    ] })
  }
}
