import { DivModule } from 'wok-ui'
import { DescriptionList } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    // 标签在上 + 带边框
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
      bordered: true
    }))
    this.addChild({ tag: 'div', style: { height: '24px' } })
    // 标签在左 + 带边框 + 独占一行
    this.addChild(new DescriptionList({
      items: [
        { label: 'Name', content: 'John Doe' },
        { label: 'Age', content: '30' },
        { label: 'Email', content: 'john@example.com' },
        { label: 'Address', content: '123 Main St, New York', exclusiveRow: true },
        { label: 'Role', content: 'Developer' },
        { label: 'Status', content: 'Active' }
      ],
      cols: 3,
      layout: 'horizontal',
      bordered: true
    }))
  }
}
