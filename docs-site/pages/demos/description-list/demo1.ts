import { DivModule } from 'wok-ui'
import { DescriptionList, BodyText } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new DescriptionList({
      items: [
        { label: 'Name', content: 'John Doe' },
        { label: 'Age', content: '30' },
        { label: 'Email', content: 'john@example.com' },
        { label: 'Phone', content: '+1 234 567 890' },
        { label: 'Address', content: '123 Main St, New York' },
        { label: 'Role', content: 'Developer' }
      ],
      cols: 3,
      gap: 24
    }))
  }
}
