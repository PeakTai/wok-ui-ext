import { DivModule } from 'wok-ui'
import { MenuItemData, ItemContext } from './types'
import { attachTooltip, TooltipBinding } from '../tooltip'

/**
 * 叶子菜单项模块。
 * @internal
 */
export class LeafItem extends DivModule {
  private key: string
  private label: string
  private tooltip?: TooltipBinding

  constructor(item: MenuItemData, level: number, ctx: ItemContext) {
    const classes = ['wok-ui-ext-menu-item']
    if (item.disabled) classes.push('disabled')
    if (ctx.selectedKey === item.key) classes.push('selected')
    super(...classes)

    this.key = item.key
    this.label = item.label
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

    // 折叠态下绑定 tooltip
    if (ctx.collapsed) this.bindTooltip()
    ctx.registerNode(this)
  }

  /** 更新选中态 */
  setSelected(sk?: string) {
    this.el.classList.toggle('selected', sk === this.key)
  }

  /** 折叠状态变化 */
  setCollapsed(v: boolean) {
    if (v) this.bindTooltip()
    else this.unbindTooltip()
  }

  private bindTooltip() {
    if (this.tooltip) return
    this.tooltip = attachTooltip({
      target: this.el,
      content: this.label,
      placement: 'right'
    })
  }

  private unbindTooltip() {
    this.tooltip?.destroy()
    this.tooltip = undefined
  }

  destroy(): void {
    this.unbindTooltip()
    super.destroy()
  }
}
