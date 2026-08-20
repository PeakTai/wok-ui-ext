import { ConvertibleModule, FullRenderingModule } from 'wok-ui'
import { getWokUiExtI18n } from '../i18n'
import { ShowContextMenuOpts } from '../context-menu'
import { showWarning } from '../toast'
import { NodeInfo } from './node-info'
import { TreeNodeData } from '.'

/**
 * 节点，包含自身信息以及子节点列表
 */
export class Node<T extends TreeNodeData> extends FullRenderingModule {
  private subNodesEl?: HTMLElement
  /**
   * 节点数据，记录基本信息，以及状态信息，随着节点样式的变化一起更新
   */
  readonly data: T
  readonly level: number
  private subNodes: Node<T>[] = []
  private nodeInfo?: NodeInfo<T>

  constructor(
    private opts: {
      /**
       * 父节点，记录父节点信息目的是为了能更快的查找
       */
      parent?: Node<T>
      /**
       * 层级，从 1 开始
       */
      level: number
      /**
       * 最大层级
       */
      maxLevel: number
      /**
       * 是否有下一个兄弟元素
       */
      hasNextSibling: boolean
      /**
       * 是否最后一个
       */
      isLast: boolean
      /**
       * 已经 id 列表
       */
      selectedIds: string[]
      /**
       * 数据
       */
      data: T
      /**
       * 启动移动功能，启动后支持拖动节点来改变节点的位置
       */
      enableMove?: boolean
      /**
       * 开始拖动的监听
       * @param listener
       */
      onDragStart: (node: Node<T>, coord: { x: number; y: number }) => void
      /**
       * 选中钩子函数
       * @returns
       */
      selectHook: (id: string) => boolean
      /**
       * 取消选中钩子
       * @returns
       */
      unSelectHook: (id: string) => boolean
      /**
       * 折叠回调
       * @returns
       */
      onFold: (node: Node<T>) => void
      /**
       * 展开回调
       * @returns
       */
      onUnfold: (node: Node<T>) => void
      /**
       * 构造节点的操作项，如果未定义，或返回的空数组，都不会显示出菜单项
       */
      buildActions?: (data: T, level: number) => ShowContextMenuOpts['menu']
      buildTitleModule?: (data: T) => ConvertibleModule
    }
  ) {
    super(document.createElement('li'))
    this.el.classList.add('wok-ui-ext-tree-node')
    this.data = opts.data
    this.level = opts.level

    // 初始的展开状态
    if (!opts.data.unfolded) {
      // 折叠为默认值，不触发回调
      this.el.classList.add('wok-ui-ext-folded')
    }
    // 初始的已选标识
    if (opts.selectedIds.includes(opts.data.id) && !opts.data.unselectable) {
      this.el.classList.add('wok-ui-ext-selected')
    }
    // 不可选择标识
    if (opts.data.unselectable) {
      this.el.classList.add('wok-ui-ext-unselectable')
    }
    // 不可移动标识，传递到子节点
    if (opts.data.unmoveable) {
      if (opts.data.unmoveable === 'all-descendants') {
        if (opts.data.children) {
          opts.data.children.forEach(child => (child.unmoveable = 'all-descendants'))
        }
      }
    }
    this.render()
  }

  private buildInfo() {
    return new NodeInfo({
      level: this.level,
      isMaxLevel: this.opts.maxLevel <= this.level,
      data: this.data,
      enableDrag: this.opts.enableMove,
      onDragStart: (coord: { x: number; y: number }) => this.opts.onDragStart(this, coord),
      buildActions: () => {
        if (this.opts.buildActions) {
          return this.opts.buildActions(this.data, this.level)
        }
        return []
      },
      buildTitleModule: this.opts.buildTitleModule,
      onClick: () => {
        if (this.data.unselectable === true) {
          return
        }
        if (this.el.classList.contains('wok-ui-ext-selected')) {
          if (this.opts.unSelectHook(this.data.id)) {
            this.el.classList.remove('wok-ui-ext-selected')
          }
        } else {
          if (this.opts.selectHook(this.data.id)) {
            this.el.classList.add('wok-ui-ext-selected')
          }
        }
      },
      onToggleFold: () => {
        // 处理折叠事件
        if (this.data.unfolded) {
          this.fold()
        } else {
          this.unfold()
        }
      }
    })
  }

  private updateInfo() {
    if (this.nodeInfo) {
      const newInfo = this.buildInfo()
      this.nodeInfo.replaceBy(newInfo)
      this.nodeInfo = newInfo
    }
  }

  protected buildContent(): void {
    // 节点内容
    this.addChild((this.nodeInfo = this.buildInfo()))
    // 子级节点
    if (this.opts.data.children && this.opts.data.children.length) {
      const { length } = this.opts.data.children
      this.addChild({
        tag: 'ul',
        classNames: 'wok-ui-ext-sub-nodes',
        preHandle: el => {
          this.subNodesEl = el
        },
        children: (this.subNodes = this.opts.data.children.map(
          (data, idx) =>
            new Node<T>({
              parent: this,
              level: this.opts.level + 1,
              maxLevel: this.opts.maxLevel,
              hasNextSibling: idx < length - 1,
              isLast: idx === length - 1,
              data: data,
              buildTitleModule: this.opts.buildTitleModule,
              enableMove: this.opts.enableMove,
              selectedIds: this.opts.selectedIds,
              onDragStart: this.opts.onDragStart,
              selectHook: this.opts.selectHook,
              unSelectHook: this.opts.unSelectHook,
              onFold: this.opts.onFold,
              onUnfold: this.opts.onUnfold,
              buildActions: this.opts.buildActions
            })
        ))
      })
    } else {
      this.subNodesEl = undefined
    }
  }

  /**
   * 主动取消选中
   */
  unSelect() {
    this.el.classList.remove('wok-ui-ext-selected')
  }

  private fold() {
    if (!this.data.unfolded) {
      return
    }
    this.data.unfolded = false
    this.updateInfo()
    // 给定高度，触发动画
    if (this.subNodesEl) {
      this.subNodesEl.style.height = this.subNodesEl.scrollHeight + 'px'
    }
    // 高度更新完成后，再改样式，才能触发动画
    setTimeout(() => {
      this.el.classList.add('wok-ui-ext-folded')
    }, 0)
    this.opts.onFold(this)
  }

  /**
   * 展开，为了让子节点元素有动画，必须得指定宽度（auto 高度不会产生动画），宽度需要根据子节点的情况进行计算
   */
  private unfold() {
    if (this.data.unfolded) {
      return
    }
    if (!this.subNodesEl) {
      return
    }
    this.data.unfolded = true
    this.updateInfo()
    const subNodesEl = this.subNodesEl
    subNodesEl.style.height = subNodesEl.scrollHeight + 'px'
    this.el.classList.remove('wok-ui-ext-folded')
    // 动画完后后，将高度改为自动
    // 否则子节点再伸展会无法撑开
    setTimeout(() => {
      subNodesEl.style.height = 'auto'
    }, 300)
    this.opts.onUnfold(this)
  }

  /**
   * 更新标题
   * @param title
   */
  updateTitle(title: TreeNodeData['title']) {
    this.opts.data.title = title
    this.updateInfo()
  }

  /**
   * 删除子节点
   * @param subNodeId 子节点ID
   */
  removeSubNode(subNodeId: string) {
    if (!this.data.children) {
      return
    }
    const idx = this.data.children.findIndex(c => c.id === subNodeId)
    if (idx !== -1) {
      this.data.children.splice(idx, 1)
      this.render()
    }
  }

  /**
   * 添加子节点
   * @param subNodeData 子节点数据
   */
  addSubNode(subNodeData: T) {
    if (this.level >= this.opts.maxLevel) {
      const msg = getWokUiExtI18n().buildMsg('tree-max-level', `${this.opts.maxLevel}`)
      showWarning(msg)
      throw new Error(msg)
    }
    if (!this.data.children) {
      this.data.children = []
    }
    // 锁定处理
    const data: T = { ...subNodeData }
    if (data.unmoveable === 'all-descendants') {
      data.unmoveable = 'all-descendants'
    }
    this.data.children.push(data)
    this.render()
    if (!this.data.unfolded) {
      setTimeout(() => this.unfold(), 100)
    }
  }

  /**
   * 插入子节点，到指定位置
   * @param subNodeData 子节点数据
   */
  insertSubNode(subNodeData: T, targetIdx: number) {
    if (this.level >= this.opts.maxLevel) {
      const msg = getWokUiExtI18n().buildMsg('tree-max-level', `${this.opts.maxLevel}`)
      showWarning(msg)
      throw new Error(msg)
    }
    if (!this.data.children) {
      this.data.children = []
    }
    if (targetIdx > this.data.children.length) {
      return
    }
    this.data.children.splice(targetIdx, 0, subNodeData)
    this.render()
  }

  /**
   * 获取子节点
   */
  getSubNodes() {
    return this.subNodes
  }

  /**
   * 获取父节点模块
   */
  getParentNode() {
    return this.opts.parent
  }

  /**
   * 处理拖动悬浮并反应调整样式
   * @param sourceNode 源节点，即要移动的节点
   * @param clientX 横坐标
   * @param clientY 纵坐标
   * @returns
   */
  handleDragOverAndReact(
    sourceNode: TreeNodeData,
    clientX: number,
    clientY: number
  ): false | 'before' | 'after' | 'in' {
    // 如果不可移动，不反应
    if (this.opts.data.unmoveable) {
      return false
    }
    if (!this.nodeInfo) {
      return false
    }
    // 如果源节点就是本节点，不反应
    if (sourceNode.id === this.opts.data.id) {
      this.nodeInfo.removeMovingStyle()
      return false
    }
    return this.nodeInfo.handleDragOverAndReact(clientX, clientY)
  }
}
