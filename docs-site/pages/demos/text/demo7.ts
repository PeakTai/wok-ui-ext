import { VBox, Spacer } from 'wok-ui'
import { Title, BodyText, IconInfoCircle, IconCheckCircle } from 'wok-ui-ext'

export default class Demo7 extends VBox {
  constructor() {
    super({ children: [
      new Title({
        text: [new IconInfoCircle(), ' 带图标的标题']
      }),
      new Spacer('sm'),
      new Title({
        text: ['操作成功 ', new IconCheckCircle()]
      }),
      new Spacer('sm'),
      new BodyText({
        text: [new IconInfoCircle(), ' 正文也可以嵌入图标']
      })
    ] })
  }
}
