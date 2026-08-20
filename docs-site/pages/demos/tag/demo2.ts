import { HBox, VBox } from 'wok-ui'
import { Tag, IconEdit } from 'wok-ui-ext'

export default class Demo2 extends VBox {
  constructor() {
    super({ gap: 12, children: [
      new HBox({ gap: 12, wrap: true, children: [
        new Tag({ text: '描边标签', plain: true }),
        new Tag({ text: '描边成功', type: 'success', plain: true }),
        new Tag({ text: '描边危险', type: 'danger', plain: true })
      ] }),
      new HBox({ gap: 12, children: [
        new Tag({ text: '小标签', size: 'small' }),
        new Tag({ text: '默认标签' }),
        new Tag({ text: '大标签', size: 'large' })
      ] }),
      new HBox({ gap: 12, children: [
        new Tag({ text: '带图标', icon: new IconEdit() }),
        new Tag({ text: '方形标签', round: false })
      ] })
    ] })
  }
}
