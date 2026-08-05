import { ContextMenu, ContextMenuItem, type MenuPosition, type MenuAlign } from './context-menu'
import './style.less'

export interface ShowContextMenuOpts {
  /**
   * 菜单
   */
  menu: ContextMenuItem[] | ((add: (...item: ContextMenuItem[]) => void) => void)
  /**
   * 事件，用于定位
   */
  evt: MouseEvent
  /**
   * 菜单位置模式。
   * - 'cursor'：跟随指针（默认）
   * - 'top' | 'bottom' | 'left' | 'right'：锚定在触发元素的四边，空间不够时会自动调整
   */
  position?: MenuPosition
  /**
   * 次轴对齐方式。
   * - 'start'：top/bottom 时左对齐，left/right 时顶对齐（默认）
   * - 'end'：top/bottom 时右对齐，left/right 时底对齐
   */
  align?: MenuAlign
}

// 实例数组
const instances: ContextMenu[] = []

/**
 * 显示上下文菜单
 * @param opts
 */
export function showContextMenu(opts: ShowContextMenuOpts) {
  opts.evt.stopPropagation()
  // 先销毁所有实例
  instances.forEach(instance => instance.destroy())
  let menu: ContextMenuItem[] = []
  if (Array.isArray(opts.menu)) {
    menu = opts.menu
  } else {
    const add = (...item: ContextMenuItem[]) => {
      menu.push(...item)
    }
    opts.menu(add)
  }
  if (!menu.length) {
    console.warn('showContextMenu: menu is empty, skip showing')
    return
  }
  const instance = new ContextMenu({
    menu,
    evt: opts.evt,
    position: opts.position,
    align: opts.align,
    onDestroy: () => {
      const index = instances.indexOf(instance)
      if (index !== -1) {
        instances.splice(index, 1)
      }
    }
  })
  instance.mount(document.body)
  instances.push(instance)
}

export * from './context-menu'
