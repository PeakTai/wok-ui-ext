import { Spacer, HBox, FullRenderingModule } from 'wok-ui'
import { DatePicker, DateRangePicker } from 'wok-ui-ext'

export default class Demo7 extends FullRenderingModule {
  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    const today = new Date()
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DatePicker({ value: today }),
          new DateRangePicker({
            value: [new Date(today.getFullYear(), today.getMonth(), 1), today]
          }),
          // A same-day range is a valid complete range
          new DateRangePicker({ value: [today, today] })
        ] })
    )
  }
}
