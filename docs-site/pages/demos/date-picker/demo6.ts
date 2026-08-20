import { Spacer, HBox, FullRenderingModule } from 'wok-ui'
import { DatePicker, DateRangePicker } from 'wok-ui-ext'

export default class Demo6 extends FullRenderingModule {
  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DatePicker({
            placeholder: 'Single Date',
            onChange: date => {
              console.log('Single date selected:', date)
            }
          }),
          new DateRangePicker({
            onChange: range => {
              console.log('Range selected:', range)
            }
          })
        ] })
    )
  }
}