import { BodyText } from 'wok-ui-ext'
import { showSuccess } from 'wok-ui-ext'

export default class Demo3 extends BodyText {
  constructor() {
    super({
      text: 'Click me',
      onClick: () => showSuccess('Text clicked')
    })
  }
}
