import { DivModule } from 'wok-ui'
import { MenuItemData, ItemContext } from './types'

/**
 * 叶子菜单项模块。
 * @internal
 */
export class LeafItem extends DivModule {
  private key: string

  constructor(item: MenuItemData, level: number, ctx: ItemContext) {
    const classes = ['wok-ui-ext-menu-item']
    if (item.disabled) classes.push('disabled')
    if (ctx.selectedKey === item.key) classes.push('selected')
    super(...classes)

    this.key = item.key
    this.el.dataset.key = item.key
    if (level > 0) this.el.dataset.level = String(level)

    // 图标
    this.addChild({
      classNames: 'wok-ui-ext-menu-item-icon',
      children: item.icon ?? []
    })

    // 标签
    this.addChild({
      classNames: 'wok-ui-ext-menu-item-label',
      innerText: item.label
    })

    // 点击
    if (!item.disabled) {
      this.el.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation()
        ctx.setSelectedKey(item.key)
        ctx.onClick?.(item.key)
      })
    }
  }

  /** 更新选中态 */
  setSelected(sk?: string) {
    this.el.classList.toggle('selected', sk === this.key)
  }
}
