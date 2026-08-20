import { Spacer, HBox, FullRenderingModule } from 'wok-ui'
import { DatePicker } from 'wok-ui-ext'

export default class Demo5 extends FullRenderingModule {
  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    const today = new Date()

    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DatePicker({
            placeholder: 'Weekends & past disabled',
            disabledDate: date => {
              return date.getDay() === 0 || date.getDay() === 6 || date < today
            }
          })
        ] })
    )
  }
}