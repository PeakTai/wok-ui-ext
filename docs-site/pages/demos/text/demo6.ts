import { VBox, Spacer } from 'wok-ui'
import { MutedText, DisabledText, StrongText } from 'wok-ui-ext'

export default class Demo6 extends VBox {
  constructor() {
    super({ children: [
      new MutedText('Muted text'),
      new Spacer('sm'),
      new DisabledText('Disabled text'),
      new Spacer('sm'),
      new StrongText('Strong text')
    ] })
  }
}
