import { DivModule } from 'wok-ui'
import { MenuItemData, ItemContext } from './types'
import { getArrowSvg, hasSelectedDescendant } from './utils'
import { LeafItem } from './leaf-item'
import { showContextMenu, ContextMenuItem } from '../context-menu'

/**
 * 子菜单模块。
 * @internal
 */
export class SubMenuComp extends DivModule {
  private open: boolean
  private childNodes: Array<LeafItem | SubMenuComp> = []
  private headerEl: HTMLElement
  private childrenContainerEl: HTMLElement

  constructor(item: MenuItemData, level: number, ctx: ItemContext) {
    super('wok-ui-ext-menu-submenu')
    if (level > 0) this.el.dataset.level = String(level)

    this.open = hasSelectedDescendant(item, ctx.selectedKey)
    if (this.open) this.el.classList.add('expanded')

    // 头部
    const headerClasses = ['wok-ui-ext-menu-item']
    if (this.open) headerClasses.push('sub-active')
    if (item.disabled) headerClasses.push('disabled')

    this.addChild({
      classNames: headerClasses,
      children: add => {
        // 图标
        add({
          classNames: 'wok-ui-ext-menu-item-icon',
          children: item.icon ?? []
        })
        // 标签
        add({
          classNames: 'wok-ui-ext-menu-item-label',
          innerText: item.label
        })
        // 展开箭头
        add({
          classNames: 'wok-ui-ext-menu-item-arrow',
          innerHTML: getArrowSvg()
        })
      }
    })

    // 子节点容器
    this.addChild({
      classNames: 'wok-ui-ext-menu-submenu-children',
      style: { display: this.open ? '' : 'none' },
      children: add => {
        ;(item.children || []).forEach(child => {
          const node = createItemModule(child, level + 1, ctx)
          this.childNodes.push(node)
          add(node)
        })
      }
    })

    // 通过 DOM 查找获取引用，用于后续操作
    this.headerEl = this.el.querySelector('.wok-ui-ext-menu-item') as HTMLElement
    this.childrenContainerEl = this.el.querySelector(
      '.wok-ui-ext-menu-submenu-children'
    ) as HTMLElement

    // 切换展开/收起
    if (!item.disabled) {
      this.headerEl.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation()
        // 折叠态下内联子菜单不可见，用上下文菜单展示子级
        if (ctx.collapsed && item.children && item.children.length) {
          showContextMenu({
            menu: buildContextItems(item.children, ctx),
            evt: e
          })
          return
        }
        this.open = !this.open
        this.el.classList.toggle('expanded', this.open)
        this.childrenContainerEl.style.display = this.open ? '' : 'none'
      })
    }
  }

  /** 更新选中态 */
  setSelected(sk?: string) {
    this.childNodes.forEach(n => n.setSelected(sk))
    const hasSelected = !!this.childrenContainerEl.querySelector(
      '.wok-ui-ext-menu-item.selected'
    )
    this.headerEl.classList.toggle('sub-active', hasSelected)
  }
}

/**
 * 根据菜单项数据创建对应的菜单模块实例。
 * @internal
 */
export function createItemModule(
  item: MenuItemData,
  level: number,
  ctx: ItemContext
): LeafItem | SubMenuComp {
  if (!item.children || item.children.length === 0) {
    return new LeafItem(item, level, ctx)
  }
  return new SubMenuComp(item, level, ctx)
}

/**
 * 将子菜单数据构建为上下文菜单条目（支持多级嵌套）。
 * @internal
 */
function buildContextItems(
  items: MenuItemData[],
  ctx: ItemContext
): ContextMenuItem[] {
  return items.map(item => {
    const hasChildren = !!item.children && item.children.length > 0
    return {
      label: item.label,
      active: item.key === ctx.selectedKey,
      children: hasChildren ? buildContextItems(item.children!, ctx) : undefined,
      // 仅叶子项（且未禁用）触发选中与点击回调
      callback: hasChildren || item.disabled
        ? undefined
        : () => {
            ctx.setSelectedKey(item.key)
            ctx.onClick?.(item.key)
          }
    }
  })
}
