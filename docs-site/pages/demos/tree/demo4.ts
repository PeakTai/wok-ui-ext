import { DivModule } from 'wok-ui'
import { Tree, TreeNodeData } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  private tree?: Tree<TreeNodeData>

  constructor() {
    super()
    const data: TreeNodeData[] = [
      {
        id: '1',
        title: 'Documents',
        unfolded: true,
        children: [
          { id: '1-1', title: 'Resume.pdf' },
          { id: '1-2', title: 'Report.docx' }
        ]
      },
      {
        id: '2',
        title: 'Images',
        unfolded: true,
        children: [
          { id: '2-1', title: 'Photo1.png' },
          { id: '2-2', title: 'Photo2.png' }
        ]
      }
    ]
    this.tree = new Tree<TreeNodeData>({
      data,
      buildActions: (data, level) => [
        {
          label: 'Add child',
          callback: () => {
            this.tree?.addNode({ id: `n-${Date.now()}`, title: 'New node' }, data.id)
          }
        },
        {
          label: 'Delete',
          callback: () => this.tree?.deleteNode(data.id)
        }
      ]
    })
    this.addChild(this.tree)
  }
}
