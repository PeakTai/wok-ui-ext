import { HBox } from 'wok-ui'
import { Button, showDrawer } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Button({
        text: 'Right',
        type: 'primary',
        onClick: () => showDrawer({ title: 'Right Drawer', body: 'Content slides from right.', placement: 'right' })
      }),
      new Button({
        text: 'Left',
        type: 'default',
        onClick: () => showDrawer({ title: 'Left Drawer', body: 'Content slides from left.', placement: 'left' })
      }),
      new Button({
        text: 'Top',
        type: 'default',
        onClick: () => showDrawer({ title: 'Top Drawer', body: 'Content slides from top.', placement: 'top' })
      }),
      new Button({
        text: 'Bottom',
        type: 'default',
        onClick: () => showDrawer({ title: 'Bottom Drawer', body: 'Content slides from bottom.', placement: 'bottom' })
      })
    ] })
  }
}
