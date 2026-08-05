import { HBox } from 'wok-ui'
import { Badge } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Badge({ text: 'Success', type: 'success' }),
      new Badge({ text: 'Warning', type: 'warning' }),
      new Badge({ text: 'Danger', type: 'danger' }),
      new Badge({ text: 'Info', type: 'info' }),
      new Badge({ text: 'Neutral', type: 'neutral' })
    ] })
  }
}
