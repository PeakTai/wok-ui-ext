import { Spacer, HBox, Text, DivModule } from 'wok-ui'
import { DateTimePicker, formatDateTime } from 'wok-ui-ext'

export default class Demo8 extends DivModule {
  private readonly text = new Text('→ undefined')

  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DateTimePicker({
            defaultTime: { hour: 9, minute: 0 },
            onChange: date => {
              this.text.setText(`→ ${date ? formatDateTime(date) : 'undefined'}`)
            }
          }),
          this.text
        ] })
    )
  }
}
