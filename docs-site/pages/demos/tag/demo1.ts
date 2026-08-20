import { HBox } from 'wok-ui'
import { Tag } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Tag({ text: '默认标签' }),
      new Tag({ text: '主要标签', type: 'primary' }),
      new Tag({ text: '成功标签', type: 'success' }),
      new Tag({ text: '警告标签', type: 'warning' }),
      new Tag({ text: '危险标签', type: 'danger' }),
      new Tag({ text: '信息标签', type: 'info' })
    ] })
  }
}
