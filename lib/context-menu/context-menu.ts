import { ConvertibleModule } from 'wok-ui'
import { FloatingLayer, FloatingLayerOptions, FloatingPlacement } from '../floating-layer'
import { IconInput, resolveIcon, IconAngleRight } from '../icons'

/**
 * 菜单位置模式。
 * - 'cursor': 跟随指针（默认）
 * - 'top' | 'bottom' | 'left' | 'right': 锚定在触发元素的四边，空间不够时会自动调整
 */
export type MenuPosition = 'cursor' | 'top' | 'bottom' | 'left' | 'right'

/**
 * 菜单在次轴上的对齐方式。
 * - 'start': top/bottom 时左对齐，left/right 时顶对齐（默认）
 * - 'end': top/bottom 时右对齐，left/right 时底对齐
 */
export type MenuAlign = 'start' | 'end'

/**
 * 上下文菜单条目.
 */
export interface ContextMenuItem {
  /**
   * 菜单图标，可选.
   */
  icon?: IconInput
  /**
   * 菜单标题，太长会显示省略号.
   */
  label: ConvertibleModule
  /**
   * 是否是激活状态，可选.激活状态的菜单会显示为选中状态.不会触发点击回调.
   */
  active?: boolean
  /**
   * 菜单点击后的回调.
   */
  callback?: () => void
  /**
   * 子菜单，如果有值，则点击菜单会继续显示子菜单.如果没值，则点击菜单后会关闭掉上下文菜单.
   */
  children?: ContextMenuItem[]
}

interface ContextMenuOpts {
  /**
   * 父菜单
   */
  parent?: ContextMenu
  /**
   * 菜单
   */
  menu: ContextMenuItem[]
  /**
   * 事件，用于定位和阻止冒泡
   */
  evt: MouseEvent
  /**
   * 菜单位置模式，默认 'cursor'
   */
  position?: MenuPosition
  /**
   * 次轴对齐方式，默认 'start'
   */
  align?: MenuAlign
  /**
   * 销毁时的回调
   */
  onDestroy?: () => void
}

/**
 * 上下文菜单，基于 FloatingLayer 实现定位、自动翻转、外部点击/Esc/滚动自动关闭。
 * 上下文菜单可以有无限深的层级。每个上下文菜单中包含了菜单条目列表，
 * 每个条目点击后有可能直接触发回调，也有可能触发弹出子菜单，子菜单是新的上下文菜单实例。
 * 每个上下文菜单之间是单独的模块，独自挂载到 body 上，没有从属关系，内部通过记录关联，适当的进行销毁操作。
 * 每个上下文菜单销毁，都会自动销毁弹出的子菜单。
 */
export class ContextMenu extends FloatingLayer {
  /**
   * 每个上下文永远只能同一时刻弹出一个子菜单，如果其它条目再次触发弹出子菜单，则销毁已经弹出的子菜单
   */
  private subMenu?: ContextMenu

  constructor(private readonly opts: ContextMenuOpts) {
    super(ContextMenu.__resolveLayerOpts(opts))
    this.el.classList.add('wok-ui-ext-context-menu')
  }

  protected buildContent(): void {
    for (const item of this.opts.menu) {
      this.addChild({
        classNames: ['wok-ui-ext-context-menu-item', item.active ? 'active' : ''],
        children: add => {
          if (item.icon) {
            add({
              classNames: 'icon',
              children: resolveIcon(item.icon)
            })
          }
          add({
            classNames: 'text',
            children: item.label
          })
          if (item.children && item.children.length) {
            add(new IconAngleRight())
          }
        },
        onClick: ev => {
          ev.stopPropagation()
          if (item.children && item.children.length) {
            if (this.subMenu) {
              this.subMenu.destroy()
            }
            this.subMenu = new ContextMenu({
              evt: ev,
              menu: item.children,
              parent: this
            })
            this.subMenu.mount(document.body)
            return
          }
          // 销毁所有上下文菜单，销毁根菜单，就会自动销毁所有
          this.getRoot().destroy()
          if (item.callback) {
            item.callback()
          }
        }
      })
    }
    // 菜单内部滚动不冒泡，避免触发外层滚动相关逻辑
    this.el.onscroll = ev => ev.stopPropagation()
  }

  /**
   * 覆写内部区域判定：子菜单也属于菜单内部，点击子菜单不关闭父菜单。
   * 注意不包含触发元素（target），点击触发元素同样视为外部点击并关闭菜单。
   */
  protected override containsTarget(target: Node): boolean {
    if (this.el.contains(target)) return true
    if (this.subMenu && this.subMenu.containsTarget(target)) return true
    return false
  }

  getParent() {
    return this.opts.parent
  }
  /**
   * 获取根菜单模块
   * @returns
   */
  getRoot() {
    let root: ContextMenu = this
    while (true) {
      const parent = root.getParent()
      if (parent) {
        root = parent
      } else {
        break
      }
    }
    return root
  }
  /**
   * 判定指定的元素是否在模块内部，如果在子菜单的模块中，也算包含
   * @param el
   */
  containsEl(el: HTMLElement): boolean {
    return this.containsTarget(el)
  }

  override destroy(): void {
    if (this.subMenu) {
      this.subMenu.destroy()
      this.subMenu = undefined
    }
    this.el.onscroll = null
    super.destroy()
  }

  /**
   * 根据菜单位置模式解析 FloatingLayer 的定位参数。
   * cursor 模式用点击坐标作为锚点；锚定模式用触发元素定位。
   */
  private static __resolveLayerOpts(opts: ContextMenuOpts): FloatingLayerOptions {
    const position = opts.position || 'cursor'
    const align = opts.align || 'start'
    const triggerEl = opts.evt.currentTarget instanceof HTMLElement ? opts.evt.currentTarget : null
    // 跟随指针，或触发元素不可用时回退到指针定位
    if (position === 'cursor' || !triggerEl) {
      return {
        anchor: { x: opts.evt.clientX, y: opts.evt.clientY },
        placement: 'bottomLeft',
        offset: 0,
        scrollBehavior: 'destroy'
      }
    }
    const placement = ContextMenu.__resolvePlacement(position, align)
    return {
      target: triggerEl,
      placement,
      offset: 0,
      scrollBehavior: 'destroy'
    }
  }

  /**
   * position + align 映射为 FloatingLayer 的 placement。
   */
  private static __resolvePlacement(position: Exclude<MenuPosition, 'cursor'>, align: MenuAlign): FloatingPlacement {
    switch (position) {
      case 'bottom':
        return align === 'end' ? 'bottomRight' : 'bottomLeft'
      case 'top':
        return align === 'end' ? 'topRight' : 'topLeft'
      case 'left':
        return align === 'end' ? 'leftBottom' : 'leftTop'
      case 'right':
        return align === 'end' ? 'rightBottom' : 'rightTop'
    }
  }
}

/**
 * @deprecated 拼写错误，请使用 ContextMenu
 */
export const ConextMenu = ContextMenu
