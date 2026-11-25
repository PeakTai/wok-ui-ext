import { Spacer, HBox, FullRenderingModule } from 'wok-ui'
import { DatePicker, DateRangePicker, showToast } from 'wok-ui-ext'

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
              showToast({ type: 'info', text: `已选日期: ${date ?? '清空'}` })
            }
          }),
          new DateRangePicker({
            onChange: range => {
              showToast({ type: 'info', text: `已选范围: ${range?.[0] ?? '...'} ~ ${range?.[1] ?? '...'}` })
            }
          })
        ] })
    )
  }
}