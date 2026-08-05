import { DivModule, SubModulesOpt } from 'wok-ui'
import { IconInput, resolveIcon } from '../icons'
import './style.less'

/**
 * 下拉菜单组件
 */
export class Dropdown extends DivModule {
  private _doc_click_handler: (evt: MouseEvent) => void
  /**
   * 下拉菜单组件
   * @param opts
   * @param opts.align 对齐方式，默认左对齐
   * @param opts.children 子模块配置
   * @param opts.items 下拉菜单项目
   * @param opts.onSelect 选择项目回调，传递项目索引
   */
  constructor(opts: {
    align?: 'left' | 'right'
    children: SubModulesOpt
    items: {
      icon?: IconInput
      text: string
      active?: boolean
    }[]
    onSelect?: (index: number) => void
  }) {
    super()
    this.el.classList.add('wok-ui-ext-dropdown')
    this.addChild(opts.children)
    // 菜单
    this.addChild({
      classNames: ['wok-ui-ext-dropdown-menu', opts.align === 'right' ? 'right' : 'left'],
      onClick: evt => {
        evt.stopPropagation()
      },
      children: opts.items.map((item, index) => ({
        classNames: ['wok-ui-ext-dropdown-item', item.active ? 'active' : ''],
        children: add => {
          if (item.icon) {
            add(resolveIcon(item.icon))
          }
          add(` ${item.text}`)
        },
        onClick: () => {
          this.el.querySelector('.wok-ui-ext-dropdown-menu')?.classList.remove('show')
          opts.onSelect?.(index)
        }
      }))
    })
    this.el.addEventListener('click', () => {
      this.el.querySelector('.wok-ui-ext-dropdown-menu')?.classList.toggle('show')
    })
    this._doc_click_handler = evt => {
      if (!this.el.contains(evt.target as Node)) {
        this.el.querySelector('.wok-ui-ext-dropdown-menu')?.classList.remove('show')
      }
    }
    document.addEventListener('click', this._doc_click_handler)
  }

  destroy() {
    document.removeEventListener('click', this._doc_click_handler)
    super.destroy()
  }
}
