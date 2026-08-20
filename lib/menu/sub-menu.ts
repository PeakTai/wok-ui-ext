import { DivModule } from 'wok-ui'
import { MenuItemData, ItemContext } from './types'
import { getArrowSvg, hasSelectedDescendant } from './utils'
import { LeafItem } from './leaf-item'

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
          innerHTML: getArrowSvg(this.open)
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
        this.open = !this.open
        this.childrenContainerEl.style.display = this.open ? '' : 'none'
        const arrow = this.headerEl.querySelector(
          '.wok-ui-ext-menu-item-arrow'
        ) as HTMLElement
        if (arrow) arrow.innerHTML = getArrowSvg(this.open)
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
