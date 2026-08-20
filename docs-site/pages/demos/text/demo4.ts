import { VBox, Spacer } from 'wok-ui'
import { BodyText, SecondaryText, TertiaryText } from 'wok-ui-ext'

export default class Demo4 extends VBox {
  constructor() {
    super({ children: [
      new BodyText('Body text'),
      new Spacer('sm'),
      new SecondaryText('Secondary text'),
      new Spacer('sm'),
      new TertiaryText('Tertiary text')
    ] })
  }
}
