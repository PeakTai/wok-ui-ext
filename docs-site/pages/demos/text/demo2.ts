import { VBox, Spacer } from 'wok-ui'
import { BodyText } from 'wok-ui-ext'

export default class Demo2 extends VBox {
  constructor() {
    super({ children: [
      new BodyText({ text: 'Left Aligned', align: 'left' }),
      new Spacer('sm'),
      new BodyText({ text: 'Center Aligned', align: 'center' }),
      new Spacer('sm'),
      new BodyText({ text: 'Right Aligned', align: 'right' })
    ] })
  }
}
