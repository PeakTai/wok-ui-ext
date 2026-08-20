import { HBox } from 'wok-ui'
import { Button, Tooltip } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Tooltip({ children: new Button({ text: 'Hover top' }), content: 'Tooltip on top' }),
      new Tooltip({ children: new Button({ text: 'Hover bottom' }), content: 'Tooltip on bottom', placement: 'bottom' }),
      new Tooltip({ children: new Button({ text: 'Hover left' }), content: 'Tooltip on left', placement: 'left' }),
      new Tooltip({ children: new Button({ text: 'Hover right' }), content: 'Tooltip on right', placement: 'right' })
    ] })
  }
}
