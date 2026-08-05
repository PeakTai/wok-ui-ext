import { VBox, Spacer } from 'wok-ui'
import { Progress } from 'wok-ui-ext'

export default class Demo1 extends VBox {
  constructor() {
    super({ children: [
      new Progress({ label: 'Task 1', progress: 75, showProgress: true }),
      new Spacer(),
      new Progress({ label: 'Task 2', progress: 45, showProgress: true, color: 'warning' }),
      new Spacer(),
      new Progress({ label: 'Task 3', progress: 100, showProgress: true, color: 'success' })
    ] })
  }
}
