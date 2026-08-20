import { DivModule } from 'wok-ui'
import { TreeNodeData } from '.'

/**
 * 拖动图标
 */
export class DraggingImg extends DivModule {
  /**
   *
   * @param title 标题
   */
  constructor(title: TreeNodeData['title']) {
    super('wok-ui-ext-tree-node-dragging-img')
    if (typeof title === 'string') {
      this.el.innerText = title
    } else {
      this.addChild(title)
    }
  }

  updateCoord(x: number, y: number) {
    this.el.style.top = y + 'px'
    this.el.style.left = x + 'px'
  }
}
