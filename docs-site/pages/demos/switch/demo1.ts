import { Spacer, HBox, Text, FullRenderingModule } from 'wok-ui'
import { Switch } from 'wok-ui-ext'

export default class Demo1 extends FullRenderingModule {
  private checked1 = false
  private checked2 = true

  constructor() {
    super()
    this.render()
  }

  protected buildContent(): void {
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new Switch({
            checked: this.checked1,
            onChange: checked => {
              this.checked1 = checked
              this.render()
            }
          }),
          new Text(`→ ${this.checked1}`),
          new Switch({
            checked: this.checked2,
            onChange: checked => {
              this.checked2 = checked
              this.render()
            }
          }),
          new Text(`→ ${this.checked2}`)
        ] })
    )
  }
}
