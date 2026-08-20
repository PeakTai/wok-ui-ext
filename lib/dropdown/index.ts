import { DivModule, SubModulesOpt } from 'wok-ui'
import { FloatingLayer, FloatingPlacement } from '../floating-layer'
import { IconInput, resolveIcon } from '../icons'
import './style.less'

/** 当前打开的下拉菜单，全局同时只存在一个 */
let activeDropdown: DropdownMenuLayer | null = null

interface DropdownItem {
  /**
   * 图标工厂函数。wok-ui 的模块实例不可复用（挂载过的实例销毁后无法再次挂载），
   * 而 Dropdown 每次打开菜单都会重建内容，因此这里传函数，每次执行返回新的图标实例。
   */
  icon?: () => IconInput
  text: string
  active?: boolean
}

/**
 * 下拉菜单浮层。挂载到 body，由 FloatingLayer 提供定位、滚动跟随、自动关闭。
 */
class DropdownMenuLayer extends FloatingLayer {
  private readonly items: DropdownItem[]
  private readonly onSelect?: (index: number) => void

  constructor(opts: {
    target: HTMLElement
    placement: FloatingPlacement
    items: DropdownItem[]
    onSelect?: (index: number) => void
    onClose?: () => void
  }) {
    super({ target: opts.target, placement: opts.placement, offset: 8, onClose: opts.onClose })
    this.el.classList.add('wok-ui-ext-dropdown-menu')
    this.items = opts.items
    this.onSelect = opts.onSelect
  }

  protected buildContent(): void {
    this.items.forEach((item, index) => {
      this.addChild({
        classNames: ['wok-ui-ext-dropdown-item', item.active ? 'active' : ''],
        children: add => {
          if (item.icon) {
            add(resolveIcon(item.icon()))
          }
          add(` ${item.text}`)
        },
        onClick: () => {
          // 先关闭菜单再回调，保证回调执行时菜单已消失
          this.destroy()
          this.onSelect?.(index)
        }
      })
    })
  }

  override destroy(): void {
    if (activeDropdown === this) {
      activeDropdown = null
    }
    super.destroy()
  }
}

/**
 * 下拉菜单组件
 */
export class Dropdown extends DivModule {
  private readonly __align: 'left' | 'right'
  private readonly __items: DropdownItem[]
  private readonly __onSelect?: (index: number) => void
  private __menu: DropdownMenuLayer | null = null

  /**
   * 下拉菜单组件
   * @param opts
   * @param opts.align 对齐方式，默认左对齐
   * @param opts.children 子模块配置（触发元素）
   * @param opts.items 下拉菜单项目
   * @param opts.onSelect 选择项目回调，传递项目索引
   */
  constructor(opts: {
    align?: 'left' | 'right'
    children: SubModulesOpt
    items: DropdownItem[]
    onSelect?: (index: number) => void
  }) {
    super()
    this.el.classList.add('wok-ui-ext-dropdown')
    this.__align = opts.align ?? 'left'
    this.__items = opts.items
    this.__onSelect = opts.onSelect
    this.addChild(opts.children)
    // 点击触发元素切换菜单开合
    this.el.addEventListener('click', () => this.__toggleMenu())
  }

  private __toggleMenu(): void {
    // 当前菜单已打开则关闭（点击外部关闭后引用已被清空，无需处理）
    if (this.__menu) {
      this.__menu.destroy()
      return
    }
    // 关闭其他 Dropdown 打开的菜单
    if (activeDropdown) {
      activeDropdown.destroy()
    }
    const menu = new DropdownMenuLayer({
      target: this.el,
      placement: this.__align === 'right' ? 'bottomRight' : 'bottomLeft',
      items: this.__items,
      onSelect: this.__onSelect,
      onClose: () => {
        if (this.__menu === menu) {
          this.__menu = null
        }
      }
    })
    this.__menu = menu
    activeDropdown = menu
    menu.mount(document.body)
  }

  override destroy(): void {
    if (this.__menu) {
      this.__menu.destroy()
      this.__menu = null
    }
    super.destroy()
  }
}
