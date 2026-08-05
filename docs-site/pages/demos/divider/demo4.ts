import { DivModule, HSpacer } from 'wok-ui'
import { Divider } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  constructor() {
    super()
    this.addChild({
      children: [
        'Left',
        new HSpacer('sm'),
        new Divider({ direction: 'vertical' }),
        new HSpacer('sm'),
        'Center',
        new HSpacer('sm'),
        new Divider({ direction: 'vertical', dashed: true }),
        new HSpacer('sm'),
        'Right'
      ]
    })
  }
}
