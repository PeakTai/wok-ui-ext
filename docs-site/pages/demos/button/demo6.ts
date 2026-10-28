import { HBox } from 'wok-ui'
import { Button, IconSearch, IconEdit, IconTimes, IconBell } from 'wok-ui-ext'

export default class Demo6 extends HBox {
  constructor() {
    super({
      gap: 12,
      wrap: true,
      align: 'center',
      children: [
        new Button({ icon: new IconSearch(), ariaLabel: 'Search' }),
        new Button({ icon: new IconEdit(), type: 'primary', ariaLabel: 'Edit' }),
        new Button({ icon: new IconTimes(), type: 'danger', ariaLabel: 'Close' }),
        new Button({ icon: new IconBell(), type: 'ghost', ariaLabel: 'Notification' }),
        new Button({ icon: new IconSearch(), size: 'small', ariaLabel: 'Search' }),
        new Button({ icon: new IconSearch(), size: 'large', ariaLabel: 'Search' })
      ]
    })
  }
}
