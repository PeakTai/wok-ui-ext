import { HBox } from 'wok-ui'
import { Button, Tooltip } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Tooltip({ content: new Button({ text: 'Hover me (top)' }), text: 'Tooltip on top' }),
      new Tooltip({ content: new Button({ text: 'Hover me (bottom)' }), text: 'Tooltip on bottom', placement: 'bottom' })
    ] })
  }
}
