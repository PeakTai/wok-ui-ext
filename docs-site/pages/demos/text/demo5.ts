import { VBox, Spacer } from 'wok-ui'
import { SmallText, TinyText } from 'wok-ui-ext'

export default class Demo5 extends VBox {
  constructor() {
    super({ children: [
      new SmallText('Small text'),
      new Spacer('sm'),
      new TinyText('Tiny text')
    ] })
  }
}
