import { VBox, Spacer } from 'wok-ui'
import { Progress } from 'wok-ui-ext'

export default class Demo2 extends VBox {
  constructor() {
    super({ children: [
      new Progress({ progress: 100, color: 'success', showProgress: true }),
      new Spacer(),
      new Progress({ progress: 80, color: 'warning', showProgress: true }),
      new Spacer(),
      new Progress({ progress: 40, color: 'danger', showProgress: true })
    ] })
  }
}
