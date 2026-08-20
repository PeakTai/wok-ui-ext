import { HBox } from 'wok-ui'
import { Button, showDrawer } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Button({
        text: 'Open Drawer',
        type: 'primary',
        onClick: () => showDrawer({ title: 'Drawer Title', body: 'Drawer content here' })
      }),
      new Button({
        text: 'Left Drawer',
        type: 'default',
        onClick: () => showDrawer({ title: 'Left Drawer', body: 'Content', placement: 'left' })
      })
    ] })
  }
}
