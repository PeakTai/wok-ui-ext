import { DivModule } from 'wok-ui'
import { Tree, TreeNodeData } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    const data: TreeNodeData[] = [
      {
        id: '1',
        title: 'Guangdong',
        unfolded: true,
        children: [
          { id: '1-1', title: 'Guangzhou' },
          {
            id: '1-2',
            title: 'Shenzhen',
            unfolded: true,
            children: [
              { id: '1-2-1', title: 'Nanshan' },
              { id: '1-2-2', title: 'Futian' }
            ]
          },
          { id: '1-3', title: 'Dongguan' }
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
        children: [{ id: '3-1', title: 'Fuzhou' }]
      }
    ]
    this.addChild(new Tree({ data }))
  }
}
