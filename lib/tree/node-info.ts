import { ConvertibleModule, FullRenderingModule } from 'wok-ui'
import { IconFolderOpen, IconFolder, IconLock, IconEllipsisH } from '../icons'
import { TreeNodeData } from '.'
import { showContextMenu, ShowContextMenuOpts } from '../context-menu'

/**
 * 节点信息模块
 */
export class NodeInfo<T extends TreeNodeData> extends FullRenderingModule {
  private mouseDownTimerId: any
  constructor(
    private opts: {
      /**
       * 层级，从 1 开始
       */
      level: number
      /**
       * 是否已经达到最大层级，如果是则不支持拖动放入，只能拖动到前面或后面
       */
      isMaxLevel: boolean
      /**
       * 数据
       */
      data: T
      /**
       * 启动拖动
       */
      enableDrag?: boolean
      /**
       * 开始拖动的监听
       * @param listener
       */
      onDragStart: (coord: { x: number; y: number }) => void
      /**
       * 点击回调
       * @returns
       */
      onClick: () => void
      /**
       * 切换折叠状态回调
       */
      onToggleFold: () => void
      /**
       * 构造节点的操作项，如果未定义，或返回的空数组，都不会显示出菜单项
       */
      buildActions?: () => ShowContextMenuOpts['menu']
      /**
       * 构造节点的标题模块，默认显示 title 属性文本
       * @returns
       */
      buildTitleModule?: (data: T) => ConvertibleModule
    }
  ) {
    super('wok-ui-ext-node-info')
    // 拖动事件处理
    this.el.onmousedown = ev => {
      if (ev.button !== 0) return
      ev.preventDefault()
      ev.stopPropagation()
      // 为了避免冲突（与点击同时触发），在按下一定时间后才触发拖动
      this.mouseDownTimerId = setTimeout(() => {
        this.mouseDownTimerId = undefined
        if (opts.enableDrag) {
          opts.onDragStart({ x: ev.clientX, y: ev.clientY })
        }
      }, 300)

      this.el.onmouseleave = ev => {
        if (ev.button !== 0) return
        clearTimeout(this.mouseDownTimerId)
      }
      this.el.onmouseup = ev => {
        if (ev.button !== 0) return
        if (this.mouseDownTimerId) {
          clearTimeout(this.mouseDownTimerId)
          this.mouseDownTimerId = undefined
          opts.onClick()
        }
      }
    }
    this.render()
  }

  protected buildContent(): void {
    // 折叠图标
    if (this.opts.data.children && this.opts.data.children.length) {
      // 折叠图标
      this.addChild({
        classNames: 'wok-ui-ext-icon-fold',
        children: this.opts.data.unfolded ? new IconFolderOpen() : new IconFolder(),
        events: {
          mousedown: e => e.stopPropagation(),
          mouseleave: e => e.stopPropagation(),
          mouseup: e => e.stopPropagation()
        },
        onClick: e => {
          e.stopPropagation()
          e.preventDefault()
          this.opts.onToggleFold()
        }
      })
    }
    // 节点名称
    this.addChild({
      classNames: 'wok-ui-ext-node-name',
      children: this.opts.buildTitleModule?.(this.opts.data) || this.opts.data.title
    })
    // 如果全局开启了移动，但是又节点又锁住了，则显示一个锁的图标
    if (this.opts.enableDrag && this.opts.data.unmoveable) {
      this.addChild(new IconLock())
    }
    // 操作项
    const menu = this.opts.buildActions?.()
    if (menu && menu.length) {
      this.addChild({
        classNames: 'wok-ui-ext-icon-manage',
        children: new IconEllipsisH(),
        events: {
          mousedown: e => e.stopPropagation(),
          mouseleave: e => e.stopPropagation(),
          mouseup: e => e.stopPropagation()
        },
        onClick(e) {
          e.stopPropagation()
          // 弹出操作项
          showContextMenu({
            menu,
            evt: e
          })
        }
      })
    }
  }

  /**
   * 判定是否包含一个指定的坐标，并做出反应
   * @param pageX
   * @param pageY
   * @returns 不包含，或者包含的情况下，是在上部分还是下部分
   */
  handleDragOverAndReact(pageX: number, pageY: number): false | 'before' | 'after' | 'in' {
    this.removeMovingStyle()
    const rect = this.el.getBoundingClientRect()
    // 向右偏出 100px 也可以支持，这是为了移动端拖动时，手指拖动到旁边也可以成功
    if (pageX < rect.x || pageX > rect.x + rect.width + 100) {
      return false
    }
    const offsetY = pageY - rect.y
    if (offsetY < 0 || offsetY > rect.height) {
      return false
    }
    // 上中下
    if (offsetY < rect.height / 3) {
      this.el.classList.add('wok-ui-ext-moving-before')
      return 'before'
    } else if (offsetY < (rect.height / 3) * 2) {
      if (this.opts.isMaxLevel) {
        return false
      }
      this.el.classList.add('wok-ui-ext-moving-in')
      return 'in'
    } else {
      this.el.classList.add('wok-ui-ext-moving-after')
      return 'after'
    }
  }

  removeMovingStyle() {
    this.el.classList.remove('wok-ui-ext-moving-before', 'wok-ui-ext-moving-after', 'wok-ui-ext-moving-in')
  }
}
