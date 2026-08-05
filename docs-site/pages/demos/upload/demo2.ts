import { DivModule, Spacer, VBox } from 'wok-ui'
import { Uploader } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new VBox({ gap: 16, children: [
        new Uploader({
          disabled: true,
          hint: 'Only available after saving'
        })
      ] })
    )
  }
}
