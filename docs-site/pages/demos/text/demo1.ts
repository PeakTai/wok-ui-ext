import { VBox, Spacer } from 'wok-ui'
import { TitleLarge, Title, Subtitle } from 'wok-ui-ext'

export default class Demo1 extends VBox {
  constructor() {
    super({ children: [
      new TitleLarge('Large Title'),
      new Spacer('sm'),
      new Title('Standard Title'),
      new Spacer('sm'),
      new Subtitle('Subtitle')
    ] })
  }
}
