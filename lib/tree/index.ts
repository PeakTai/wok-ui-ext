import { ConvertibleModule, FullRenderingModule } from 'wok-ui'
import { ShowContextMenuOpts } from '../context-menu'
import { getWokUiExtI18n } from '../i18n'
import { hideLoading, showLoading } from '../loading'
import { showWarning } from '../toast'
import { DraggingImg } from './dragging-img'
import { Node } from './node'
import './style.less'

/**
 * 树节点数据
 */
export interface TreeNodeData {
  /**
   * id，唯一标识
   */
  id: string
  /**
   * 节点名称
   */
  title: string
  /**
   * 子节点信息
   */
  children?: this[]
  // 后续支持异步加载子节点
  // children?: TreeNodeData[]|(()=>Promise<TreeNodeData[]>)
  /**
   * 是否展开
   */
  unfolded?: boolean
  /**
   * 不可移动的，设置为 true 的节点不能被拖动调整顺序
   * self 仅仅对当前节点有效
   * all-descendants 所有的后代节点都不能移动
   */
  unmoveable?: 'self' | 'all-descendants'
  /**
   * 不能被选择的，默认可以被选择
   */
  unselectable?: boolean
}

export /**
 * 移动位置
 */
type MovePlacement = 'before' | 'after' | 'in'
type DragTarget<T extends TreeNodeData> = {
  node: Node<T>
  placement: MovePlacement
}

/**
 * 树
 */
export class Tree<T extends TreeNodeData> extends FullRenderingModule {
  /**
   * 已选id列表
   */
  private selectedIds: string[] = []
  /**
   * 事件处理器
   */
  private eventHandler: {
    dragOver?: (ev: MouseEvent | TouchEvent) => void
    dragEnd?: (ev: MouseEvent | TouchEvent) => void
  } = {}

  /**
   * 拖动的目标
   */
  private dragTarget?: DragTarget<T>
  /**
   * 拖动图标
   */
  private draggingImg?: DraggingImg
  /**
   * 数据
   */
  private data: T[]

  constructor(
    private opts: {
      /**
       * 数据
       */
      data: T[]
      /**
       * 最大可选中数量，默认为 1，节点被选中后会有高亮显示，并且触发回调 onSelect
       */
      maxSelected?: number
      /**
       * 最大层级，默认 10
       */
      maxLevel?: number
      /**
       * 节点选中变化回调，每当选中节点发生变化时触发
       * @param nodes 选中的节点的数据，带有层级信息
       * @returns
       */
      onSelectChange?: (nodes: Array<T & { level: number }>) => void
      /**
       * 默认已选节点的 id 列表
       */
      selectedIds?: string[]
      /**
       * 启动移动功能，启动后支持拖动节点来改变节点的位置
       */
      enableMove?: boolean
      /**
       * 移动钩子，当钩子调用成功，节点的位置才会发生变化
       * @param sourceNode 被移动的节点
       * @param targetNode 目标节点
       * @param placement 相对目标节点的位置
       * @returns
       */
      moveHook?: (sourceNode: T, targetNode: T, placement: MovePlacement) => Promise<void>
      /**
       * 变化回调，每当数据发生变化时触发
       * @param data 最新数据
       * @returns
       */
      onChange?: (data: T[]) => void
      /**
       * 构造节点的操作项，如果未定义，或返回的空数组，都不会显示出菜单项
       */
      buildActions?: (data: T, level: number) => ShowContextMenuOpts['menu']
      /**
       * 构造节点的标题模块，默认显示 title 属性文本
       * @returns
       */
      buildTitleModule?: (data: T) => ConvertibleModule
    }
  ) {
    super(document.createElement('ul'))
    this.el.classList.add('wok-ui-ext-tree')
    this.data = [...opts.data]
    this.selectedIds = opts.selectedIds ? [...opts.selectedIds] : []
    this.render()
  }

  protected buildContent(): void {
    // 创建根节点
    this.data.forEach((item, idx) =>
      this.addChild(
        new Node({
          level: 1,
          buildTitleModule: this.opts.buildTitleModule,
          maxLevel: this.opts.maxLevel && this.opts.maxLevel > 0 ? this.opts.maxLevel : 10,
          data: item,
          hasNextSibling: idx < this.data.length - 1,
          isLast: idx === this.data.length - 1,
          enableMove: this.opts.enableMove,
          selectedIds: this.selectedIds,
          onDragStart: (node, coord) => this.handleDragStart(node, coord),
          selectHook: id => this.handleSelect(id),
          unSelectHook: id => {
            const idx = this.selectedIds.indexOf(id)
            if (idx !== -1) {
              this.selectedIds.splice(idx, 1)
              this.triggerSelectChange()
            }
            return true
          },
          // 折叠与否也会触发数据变化，折叠标识是数据的一部分
          onFold: () => this.triggerChange(),
          onUnfold: () => this.triggerChange(),
          buildActions: this.opts.buildActions
        })
      )
    )
  }

  private triggerChange() {
    if (this.opts.onChange) {
      this.opts.onChange(this.data)
    }
  }

  private triggerSelectChange() {
    if (this.opts.onSelectChange) {
      const res = this.find<Node<T>>(m => m instanceof Node)
        .filter(n => this.selectedIds.includes(n.data.id))
        .map(n => Object.assign({}, n.data, { level: n.level }))
      this.opts.onSelectChange(res)
    }
  }

  private handleSelect(id: string): boolean {
    const maxSelected =
      typeof this.opts.maxSelected === 'number' && this.opts.maxSelected > 0
        ? this.opts.maxSelected
        : 1
    if (maxSelected === 1) {
      this.find<Node<T>>(m => m instanceof Node).forEach(node => {
        if (node.data.id !== id) {
          node.unSelect()
        }
      })
      // 不要改变 selectedIds 的引用，节点和这里共用一个对象
      this.selectedIds.splice(0, this.selectedIds.length)
      this.selectedIds.push(id)
      this.triggerSelectChange()
      return true
    }
    if (this.selectedIds.length >= maxSelected) {
      showWarning(getWokUiExtI18n().buildMsg('tree-max-selected', `${maxSelected}`))
      return false
    }
    if (!this.selectedIds.includes(id)) {
      this.selectedIds.push(id)
      this.triggerSelectChange()
    }
    return true
  }
  /**
   * 对节点取消选择
   * @param id 节点数据的 id
   * @returns
   */
  unselectNode(id: string) {
    if (!this.selectedIds.length) {
      return
    }
    const idx = this.selectedIds.indexOf(id)
    if (idx === -1) {
      return
    }
    this.selectedIds.splice(idx, 1)
    this.find<Node<T>>(m => m instanceof Node && m.data.id === id).forEach(node => node.unSelect())
    this.triggerSelectChange()
  }

  /**
   * 处理拖动开始事件，生成拖动图标
   * @param sourceNode  被拖动的原始节点
   * @param coord  事件坐标
   */
  private handleDragStart(sourceNode: Node<T>, coord: { x: number; y: number }) {
    // 更改状态，添加拖动图标
    this.el.classList.add('wok-ui-ext-dragging')
    if (!this.draggingImg) {
      this.draggingImg = new DraggingImg(sourceNode.data.title)
      this.draggingImg.updateCoord(coord.x, coord.y)
      this.addChild(this.draggingImg)
    }
    // 构建事件处理
    this.eventHandler.dragEnd = ev => {
      ev.preventDefault()
      if (ev.type === 'mouseout') {
        if (ev.target !== document.body) {
          return
        }
      }
      this.el.classList.remove('wok-ui-ext-dragging')
      if (this.draggingImg) {
        this.draggingImg.destroy()
        this.draggingImg = undefined
      }
      Promise.resolve()
        .then(async () => {
          // 目标
          if (!this.dragTarget) {
            return
          }
          showLoading()
          try {
            if (this.opts.moveHook) {
              await this.opts.moveHook(
                sourceNode.data,
                this.dragTarget.node.data,
                this.dragTarget.placement
              )
            }
          } finally {
            hideLoading()
          }
          // 调整成功，更改元素位置
          this.moveNode(sourceNode.data.id, this.dragTarget.node.data.id, this.dragTarget.placement)
        })
        .catch(showWarning)
        .finally(() => {
          this.dragTarget = undefined
          this.unbindEvents()
        })
    }
    document.body.addEventListener('mouseup', this.eventHandler.dragEnd)
    document.body.addEventListener('mouseout', this.eventHandler.dragEnd)
    document.body.addEventListener('touchend', this.eventHandler.dragEnd)
    document.body.addEventListener('touchcancel', this.eventHandler.dragEnd)
    // 获取当前可见的节点，在拖动过程中节点的可见性不会改变
    // 只让可见的节点在拖动过程中发生变化，进行响应，节省开销
    // 如果轮询所有节点，节点一多就会卡顿
    const visiblesNodes = this.getVisibleNodes()

    // 为了兼容，改由容器来处理悬浮的事件，判定指针或触控点是否被条目包含
    // 移动端的 touchemove 无法通过 touch-action 来跳过层级在前的元素
    // 总是被层级在前的元素触发，所以无法让 item 自己完成处理再反馈给上层
    this.eventHandler.dragOver = ev => {
      // 非拖动中，不处理
      if (!this.el.classList.contains('wok-ui-ext-dragging')) {
        return
      }
      const clientX = ev instanceof TouchEvent ? ev.touches[0].clientX : ev.clientX
      const clientY = ev instanceof TouchEvent ? ev.touches[0].clientY : ev.clientY
      if (this.draggingImg) {
        this.draggingImg.updateCoord(clientX, clientY)
      }
      this.dragTarget = undefined
      visiblesNodes.forEach(node => {
        const res = node.handleDragOverAndReact(sourceNode.data, clientX, clientY)
        if (res) {
          this.dragTarget = {
            node: node,
            placement: res
          }
        }
      })
    }
    document.body.addEventListener('mousemove', this.eventHandler.dragOver)
    document.body.addEventListener('touchmove', this.eventHandler.dragOver)
  }
  /**
   * 获取所有当前可见的节点
   */
  private getVisibleNodes() {
    const res: Node<T>[] = []
    const rootNodes = this.getChildren()
      .filter(m => m instanceof Node)
      .map(m => m as Node<T>)
    function getDescendantVisibleNodes(node: Node<T>) {
      const res: Node<T>[] = []
      if (node.data.unfolded) {
        for (const subNode of node.getSubNodes()) {
          res.push(subNode)
          res.push(...getDescendantVisibleNodes(subNode))
        }
      }
      return res
    }
    for (const node of rootNodes) {
      res.push(node)
      res.push(...getDescendantVisibleNodes(node))
    }
    return res
  }

  /**
   * 移动节点
   * @param sourceNodeId
   * @param targetNodeId
   * @param placement
   */
  moveNode(sourceNodeId: string, targetNodeId: string, placement: MovePlacement) {
    const sourceNode = this.getNodeModule(sourceNodeId)
    const targetNode = this.getNodeModule(targetNodeId)
    if (!sourceNode || !targetNode) {
      return
    }
    this.internalDeleteNode(sourceNodeId)
    if (placement === 'in') {
      targetNode.addSubNode(sourceNode.data)
      this.triggerChange()
      return
    }
    const targetParent = targetNode.getParentNode()
    if (targetParent) {
      if (!targetParent.data.children) {
        return
      }
      const { children } = targetParent.data
      const idx = children.findIndex(c => c.id === targetNodeId)
      switch (placement) {
        case 'before':
          targetParent.insertSubNode(sourceNode.data, idx)
          break
        case 'after':
          targetParent.insertSubNode(sourceNode.data, idx + 1)
          break
      }
    } else {
      const idx = this.data.findIndex(da => da.id === targetNodeId)
      switch (placement) {
        case 'before':
          this.data.splice(idx, 0, sourceNode.data)
          this.render()
          break
        case 'after':
          this.data.splice(idx + 1, 0, sourceNode.data)
          this.render()
          break
      }
    }
    this.triggerChange()
  }
  /**
   * 删除一个节点
   * @param id
   */
  deleteNode(id: string) {
    const res = this.internalDeleteNode(id)
    if (!res) {
      return
    }
    // 如果已选有包含，则触发回调
    const sIdx = this.selectedIds.indexOf(id)
    if (sIdx !== -1) {
      this.selectedIds.splice(sIdx, 1)
      this.triggerSelectChange()
    }
  }
  /**
   * 内部的删除方法，仅删除节点数据，不触发任何行为
   */
  private internalDeleteNode(id: string): boolean {
    // 找到节点，然后销毁，同步树中的数据
    const node = this.getNodeModule(id)
    if (!node) {
      return false
    }
    const parent = node.getParentNode()
    if (parent) {
      parent.removeSubNode(node.data.id)
      return true
    } else {
      const idx = this.data.findIndex(da => da.id === id)
      if (idx !== -1) {
        this.data.splice(idx, 1)
        this.triggerChange()
        this.render()
        return true
      }
      return false
    }
  }
  /**
   * 更新节点
   * @param data
   */
  updateNode(data: { id: string; title: TreeNodeData['title'] }) {
    const nodeModule = this.getNodeModule(data.id)
    if (nodeModule) {
      nodeModule.updateTitle(data.title)
      this.triggerChange()
    }
  }
  /**
   * 添加一个节点
   */
  addNode(data: T, parentId?: string) {
    if (!parentId) {
      this.data.push(data)
      this.render()
      this.triggerChange()
      return
    }
    const parent = this.getNodeModule(parentId)
    if (parent) {
      parent.addSubNode(data)
      this.triggerChange()
    }
  }

  private getNodeModule(id: string) {
    return this.findFirst<Node<T>>(m => m instanceof Node && m.data.id === id)
  }
  /**
   * 获取节点信息
   * @param id 节点id
   */
  getNode(id: string) {
    const node = this.getNodeModule(id)
    if (node) {
      return { ...node.data }
    }
    return undefined
  }
  /**
   * 获取一个节点的父节点信息，如果找不到节点，或者节点是根节点不存在父节点，则返回 undefined
   * @param id
   */
  getParentNode(id: string) {
    const node = this.getNodeModule(id)
    if (node) {
      const p = node.getParentNode()
      if (p) {
        return { ...p.data }
      }
    }
    return undefined
  }
  /**
   * 解绑事件
   */
  private unbindEvents() {
    if (this.eventHandler.dragEnd) {
      document.body.removeEventListener('mouseup', this.eventHandler.dragEnd)
      document.body.removeEventListener('mouseover', this.eventHandler.dragEnd)
      document.body.removeEventListener('touchend', this.eventHandler.dragEnd)
      document.body.removeEventListener('touchcancel', this.eventHandler.dragEnd)
      this.eventHandler.dragEnd = undefined
    }
    if (this.eventHandler.dragOver) {
      this.el.removeEventListener('mousemove', this.eventHandler.dragOver)
      this.el.removeEventListener('touchmove', this.eventHandler.dragOver)
    }
  }

  destroy(): void {
    this.unbindEvents()
    super.destroy()
  }
}
