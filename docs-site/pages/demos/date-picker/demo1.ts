import { Spacer, HBox, Text, FullRenderingModule } from 'wok-ui'
import { DatePicker } from 'wok-ui-ext'

export default class Demo1 extends FullRenderingModule {
  private value?: Date

  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DatePicker({
            onChange: date => {
              this.value = date
              this.render()
            }
          }),
          new Text(`→ ${this.value ? this.value.toISOString().split('T')[0] : 'undefined'}`)
        ] })
    )
  }
}