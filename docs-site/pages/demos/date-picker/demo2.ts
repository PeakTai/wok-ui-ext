import { Spacer, HBox, Text, FullRenderingModule } from 'wok-ui'
import { DateRangePicker } from 'wok-ui-ext'

export default class Demo2 extends FullRenderingModule {
  private value?: [Date, Date]

  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DateRangePicker({
            onChange: range => {
              this.value = range
              this.render()
            }
          }),
          new Text(`→ ${this.value ? `${this.value[0].toISOString().split('T')[0]} ~ ${this.value[1].toISOString().split('T')[0]}` : 'undefined'}`)
        ] })
    )
  }
}