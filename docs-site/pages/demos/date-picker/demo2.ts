import { Spacer, HBox, Text, DivModule } from 'wok-ui'
import { DateRangePicker, formatDate } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  private readonly text = new Text('→ undefined')

  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new HBox({ gap: 16, align: 'center', children: [
          new DateRangePicker({
            onChange: range => {
              this.text.setText(
                range ? `→ ${formatDate(range[0])} ~ ${formatDate(range[1])}` : '→ undefined'
              )
            }
          }),
          this.text
        ] })
    )
  }
}
