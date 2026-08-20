import { HBox } from 'wok-ui'
import { Button, Popconfirm, showInfo, PopoverPlacement } from 'wok-ui-ext'

export default class Demo4 extends HBox {
  constructor() {
    const placements: PopoverPlacement[] = ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'right']
    super({ gap: 12, wrap: true, children: placements.map(p =>
      new Popconfirm({
        children: new Button({ text: p, size: 'small' }),
        title: 'Confirm?',
        placement: p,
        onConfirm: () => showInfo(p)
      })
    )})
  }
}
