import { HBox } from 'wok-ui'
import { Tag } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 12, wrap: true, children: [
      new Tag({ text: 'Default Tag' }),
      new Tag({ text: 'Active', active: true }),
      new Tag({ text: 'Editable', onEdit: () => console.log('edit') }),
      new Tag({ text: 'Deletable', onDelete: () => console.log('delete') })
    ] })
  }
}
