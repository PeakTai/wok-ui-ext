import { DivModule } from 'wok-ui'
import { MenuOptions, ItemContext } from './types'
import { createItemModule, SubMenuComp } from './sub-menu'
import { LeafItem } from './leaf-item'
import './style.less'

export type { MenuItemData, MenuOptions } from './types'

/**
 * 导航菜单。
 *
 * 垂直菜单，支持多级嵌套、图标、折叠模式。
 * 适用于侧边栏导航。
 *
 * 菜单宽度默认 240px，可通过构造参数 `width` 指定（数字，单位 px），
 * 或直接覆写 CSS 变量 `--wok-ui-ext-menu-width` 调整。
 *
 * @example
 * ```ts
 * const menu = new Menu({
 *   items: [
 *     { key: 'dashboard', icon: new SvgIcon({ svgHtml: '...' }), label: '仪表盘' },
 *     {
 *       key: 'system', label: '系统设置',
 *       children: [
 *         { key: 'system-basic', label: '基本设置' },
 *         { key: 'system-security', label: '安全设置' },
 *       ]
 *     },
 *   ],
 *   selectedKey: 'dashboard',
 *   onClick: key => router.push(key)
 * })
 * ```
 */
export class Menu extends DivModule {
  private nodes: Array<LeafItem | SubMenuComp> = []

  constructor(opts: MenuOptions) {
    super('wok-ui-ext-menu')

    if (opts.collapsed) this.el.classList.add('wok-ui-ext-menu-collapsed')
    // 指定宽度时写入 CSS 变量，供样式使用（默认 240px）
    if (opts.width) {
      this.el.style.setProperty('--wok-ui-ext-menu-width', `${opts.width}px`)
    }

    const ctx: ItemContext = {
      selectedKey: opts.selectedKey,
      collapsed: opts.collapsed ?? false,
      onClick: opts.onClick,
      setSelectedKey: (key: string) => {
        ctx.selectedKey = key
        this.nodes.forEach(n => n.setSelected(key))
      }
    }

    opts.items.forEach(item => {
      const node = createItemModule(item, 0, ctx)
      this.nodes.push(node)
      this.addChild(node)
    })
  }

  /** 设置选中项 */
  setSelectedKey(key: string) {
    this.nodes.forEach(n => n.setSelected(key))
  }

  /** 设置折叠模式 */
  setCollapsed(collapsed: boolean) {
    this.el.classList.toggle('wok-ui-ext-menu-collapsed', collapsed)
  }

  /** 获取当前选中 key */
  getSelectedKey(): string | undefined {
    const el = this.el.querySelector(
      '.wok-ui-ext-menu-item.selected'
    ) as HTMLElement
    return el?.dataset.key
  }
}
