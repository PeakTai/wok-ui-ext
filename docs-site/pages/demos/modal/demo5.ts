import { Button, showModal } from 'wok-ui-ext'
import { HBox } from 'wok-ui'

export default class Demo5 extends Button {
  constructor() {
    super({
      text: 'Custom Footer',
      type: 'primary',
      onClick: () => {
        showModal({
          title: 'Save changes?',
          body: 'You have unsaved changes. What would you like to do?',
          footer: new HBox({
            gap: 12,
            children: [
              new Button({ text: 'Save', type: 'primary', onClick: () => console.log('saved') }),
              new Button({ text: 'Discard', type: 'warning', onClick: () => console.log('discarded') }),
              new Button({ text: 'Cancel', onClick: () => console.log('cancelled') })
            ]
          })
        })
      }
    })
  }
}
