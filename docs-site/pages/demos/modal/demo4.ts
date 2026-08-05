import { Button, showModal } from 'wok-ui-ext'

export default class Demo4 extends Button {
  constructor() {
    super({
      text: 'Custom Buttons',
      type: 'primary',
      onClick: () => {
        const modal = showModal({
          title: 'Modal Title',
          body: 'Modal content',
          buttons: { confirm: 'Submit', cancel: 'Close' },
          onConfirm: () => {
            modal.close()
          }
        })
      }
    })
  }
}
