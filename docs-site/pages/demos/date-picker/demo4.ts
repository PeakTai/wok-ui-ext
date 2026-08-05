import { Spacer, HBox, FullRenderingModule } from 'wok-ui'
import { DatePicker } from 'wok-ui-ext'

export default class Demo4 extends FullRenderingModule {
  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)

    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DatePicker({
            min: minDate,
            max: maxDate,
            placeholder: 'Last 7 days to next 7 days'
          })
        ] })
    )
  }
}