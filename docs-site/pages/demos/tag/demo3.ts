import { HBox } from 'wok-ui'
import { Tag } from 'wok-ui-ext'

export default class Demo3 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Tag({
        text: 'Editable',
        onEdit: () => console.log('edit'),
        onDelete: () => console.log('delete'),
        onMenu: (e) => console.log('menu', e)
      })
    ] })
  }
}
