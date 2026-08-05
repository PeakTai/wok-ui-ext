import { Result, Button } from 'wok-ui-ext'
import { VBox, DivModule } from 'wok-ui'

export default class Demo extends DivModule {
  constructor() {
    super()
    this.addChild(
      new VBox({
        children: [
          new Result({
            status: 'success',
            title: 'Payment successful',
            subTitle:
              'Your order has been placed. You will receive a confirmation email shortly.',
            extra: new Button({ text: 'View order', type: 'primary' })
          }),
          new Result({
            status: 'error',
            title: 'Payment failed',
            subTitle: 'Please check your card details and try again.',
            extra: new Button({ text: 'Retry', type: 'primary' })
          }),
          new Result({
            status: 'info',
            title: 'New update available',
            subTitle: 'Version 2.0 is ready to install.',
            extra: new Button({ text: 'Update now', type: 'primary' })
          }),
          new Result({
            status: 'warning',
            title: 'Subscription expiring',
            subTitle: 'Your plan will renew in 3 days.',
            extra: new Button({ text: 'Manage', type: 'primary' })
          })
        ]
      })
    )
  }
}
