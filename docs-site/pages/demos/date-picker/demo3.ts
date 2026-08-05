import { Spacer, HBox, FullRenderingModule } from 'wok-ui'
import { DatePicker, DateRangePicker } from 'wok-ui-ext'

export default class Demo3 extends FullRenderingModule {
  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DatePicker({ disabled: true, placeholder: 'Disabled DatePicker' }),
          new DateRangePicker({ disabled: true })
        ] })
    )
  }
}