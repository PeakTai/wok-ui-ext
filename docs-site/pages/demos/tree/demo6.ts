import { DivModule, HBox, Button, Text, Spacer } from 'wok-ui'
import { Tree, TreeNodeData } from 'wok-ui-ext'

export default class Demo6 extends DivModule {
  private tree?: Tree<TreeNodeData>
  private selectedId = ''
  private tip = new Text({ text: 'Select a node first, then operate on it' })

  constructor() {
    super()
    const data: TreeNodeData[] = [
      {
        id: '1',
        title: 'Guangdong',
        unfolded: true,
        children: [{ id: '1-1', title: 'Guangzhou' }]
      },
      {
        id: '2',
        title: 'Zhejiang',
        unfolded: true,
        children: [{ id: '2-1', title: 'Hangzhou' }]
      }
    ]
    this.tree = new Tree<TreeNodeData>({
      data,
      onSelectChange: nodes => {
        this.selectedId = nodes[0]?.id ?? ''
      }
    })
    this.addChild(this.tree)
    this.addChild(new Spacer('sm'))
    this.addChild(
      new HBox({
        gap: 8,
        children: [
          new Button({
            text: 'Add Root',
            onClick: () => this.tree?.addNode({ id: `n-${Date.now()}`, title: 'New Node' })
          }),
          new Button({
            text: 'Add Child',
            onClick: () => {
              if (!this.selectedId) {
                this.tip.setText('Please select a node first')
                return
              }
              this.tree?.addNode({ id: `n-${Date.now()}`, title: 'New Child' }, this.selectedId)
            }
          }),
          new Button({
            text: 'Rename',
            onClick: () => {
              if (!this.selectedId) {
                this.tip.setText('Please select a node first')
                return
              }
              this.tree?.updateNode({ id: this.selectedId, title: 'Renamed Node' })
            }
          }),
          new Button({
            text: 'Delete',
            onClick: () => {
              if (!this.selectedId) {
                this.tip.setText('Please select a node first')
                return
              }
              this.tree?.deleteNode(this.selectedId)
              this.selectedId = ''
            }
          })
        ]
      })
    )
    this.addChild(this.tip)
  }
}
