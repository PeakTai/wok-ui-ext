import { HBox } from 'wok-ui'
import { Button, Popover, PopoverPlacement } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    const placements: PopoverPlacement[] = ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'right']
    super({ gap: 12, wrap: true, children: placements.map(p =>
      new Popover({
        children: new Button({ text: p, size: 'small' }),
        content: `Popover ${p}`,
        placement: p
      })
    )})
  }
}
