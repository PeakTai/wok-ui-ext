import { HBox } from 'wok-ui'
import { Button, showPopconfirm, showInfo } from 'wok-ui-ext'

export default class Demo3 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Button({
        text: 'Delete',
        type: 'danger',
        onClick: (e: MouseEvent) => {
          showPopconfirm({
            target: e.target as HTMLElement,
            title: 'Confirm delete?',
            confirmType: 'danger',
            onConfirm: () => showInfo('deleted')
          })
        }
      })
    ]})
  }
}
