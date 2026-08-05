import { DivModule, Text } from 'wok-ui'
import { Tree, TreeNodeData } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    const result = new Text({ text: 'Top level order: Guangdong / Zhejiang / Fujian' })
    const data: TreeNodeData[] = [
      {
        id: '1',
        title: 'Guangdong',
        unfolded: true,
        children: [
          { id: '1-1', title: 'Guangzhou' },
          { id: '1-2', title: 'Shenzhen' }
        ]
      },
      {
        id: '2',
        title: 'Zhejiang',
        unfolded: true,
        children: [
          { id: '2-1', title: 'Hangzhou' },
          { id: '2-2', title: 'Ningbo' }
        ]
      },
      {
        id: '3',
        title: 'Fujian',
        unfolded: true,
        children: [{ id: '3-1', title: 'Fuzhou' }]
      }
    ]
    this.addChild(
      new Tree({
        data,
        enableMove: true,
        onChange: data => {
          result.setText(`Top level order: ${data.map(n => n.title).join(' / ')}`)
        }
      })
    )
    this.addChild(result)
  }
}
