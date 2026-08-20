import { DivModule, Text } from 'wok-ui'
import { Tree, TreeNodeData } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    const result = new Text({ text: 'Selected: ' })
    const data: TreeNodeData[] = [
      {
        id: '1',
        title: 'Frontend',
        unfolded: true,
        children: [
          { id: '1-1', title: 'Vue' },
          { id: '1-2', title: 'React' },
          { id: '1-3', title: 'Angular' }
        ]
      },
      {
        id: '2',
        title: 'Backend',
        unfolded: true,
        children: [
          { id: '2-1', title: 'Node.js' },
          { id: '2-2', title: 'Java' },
          { id: '2-3', title: 'Go' }
        ]
      }
    ]
    this.addChild(
      new Tree({
        data,
        maxSelected: 3,
        onSelectChange: nodes => {
          result.setText(`Selected: ${nodes.map(n => n.title).join(' / ')}`)
        }
      })
    )
    this.addChild(result)
  }
}
