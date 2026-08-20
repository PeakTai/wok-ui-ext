import { HBox, VBox } from 'wok-ui'
import { Tag, showInfo, showSuccess } from 'wok-ui-ext'

export default class Demo3 extends VBox {
  constructor() {
    super({ gap: 12, children: [
      new HBox({ gap: 12, children: [
        new Tag({
          text: '可选中标签',
          checkable: true,
          onChange: selected => showInfo(`选中状态：${selected}`)
        }),
        new Tag({
          text: '默认选中',
          checkable: true,
          selected: true,
          onChange: selected => showInfo(`选中状态：${selected}`)
        }),
        new Tag({ text: '禁用标签', checkable: true, disabled: true })
      ] }),
      new HBox({ gap: 12, children: [
        new Tag({
          text: '可关闭标签',
          closable: true,
          onClose: () => showInfo('标签已关闭')
        }),
        new Tag({
          text: '可关闭成功',
          type: 'success',
          closable: true,
          onClose: () => showSuccess('关闭成功')
        }),
        new Tag({
          text: '关闭回调',
          type: 'primary',
          closable: true,
          onClose: () => showSuccess('触发 onClose 回调')
        })
      ] })
    ] })
  }
}
