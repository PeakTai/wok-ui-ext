import { DivModule, Spacer, VBox } from 'wok-ui'
import { Uploader } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new VBox({ gap: 16, children: [
        new Uploader({
          showOnly: true,
          hint: 'Upload is handled by the parent component'
        })
      ] })
    )
  }
}
