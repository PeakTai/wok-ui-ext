import { VBox, Spacer } from 'wok-ui'
import { Alert } from 'wok-ui-ext'

export default class Demo3 extends VBox {
  constructor() {
    super({ children: [
      new Alert({ type: 'info', content: 'Click the X button to close', closeable: true }),
      new Spacer(),
      new Alert({ type: 'success', content: 'Closeable success alert', closeable: true }),
      new Spacer(),
      new Alert({ type: 'warning', content: 'Closeable warning alert', closeable: true }),
      new Spacer(),
      new Alert({ type: 'danger', content: 'Closeable danger alert', closeable: true })
    ] })
  }
}
