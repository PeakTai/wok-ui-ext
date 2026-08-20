import { DivModule, HBox } from 'wok-ui'
import { Tree, TreeNodeData, IconTag } from 'wok-ui-ext'

interface NodeData extends TreeNodeData {
  type?: 'folder' | 'file'
}

export default class Demo5 extends DivModule {
  constructor() {
    super()
    const data: NodeData[] = [
      {
        id: '1',
        type: 'folder',
        title: 'src',
        unfolded: true,
        children: [
          { id: '1-1', type: 'file', title: 'index.ts' },
          { id: '1-2', type: 'file', title: 'app.ts' }
        ]
      },
      {
        id: '2',
        type: 'folder',
        title: 'lib',
        unfolded: true,
        children: [{ id: '2-1', type: 'file', title: 'module.ts' }]
      }
    ]
    this.addChild(
      new Tree<NodeData>({
        data,
        buildTitleModule: data =>
          new HBox({
            gap: 6,
            align: 'center',
            // 只有叶子节点添加图标，避免与展开/折叠图标重复
            children: [
              ...(data.children && data.children.length ? [] : [new IconTag()]),
              data.title
            ]
          })
      })
    )
  }
}
