import { DivModule } from 'wok-ui'
import { DescriptionList } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  constructor() {
    super()
    this.addChild(new DescriptionList({
      items: [
        { label: 'Name', content: 'John Doe' },
        { label: 'Age', content: '30' },
        { label: 'Email', content: 'john@example.com' },
        { label: 'Role', content: 'Developer' }
      ],
      cols: 2,
      layout: 'horizontal',
      labelWidth: 160
    }))
  }
}
