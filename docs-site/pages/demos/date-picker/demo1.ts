import { Spacer, HBox, Text, DivModule } from 'wok-ui'
import { DatePicker, formatDate } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  private readonly text = new Text('→ undefined')

  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DatePicker({
            onChange: date => {
              this.text.setText(`→ ${date ? formatDate(date) : 'undefined'}`)
            }
          }),
          this.text
        ] })
    )
  }
}
