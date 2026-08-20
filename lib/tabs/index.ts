import './style.less'

import { ConvertibleModule, convertToModule, FullRenderingModule, SubModulesOpt } from 'wok-ui'

/**
 * 标签页项
 */
export interface TabsItem {
  /**
   * 唯一标识
   */
  key: string
  /**
   * 标签页标题
   */
  label: SubModulesOpt
  /**
   * 标签页内容
   */
  content: ConvertibleModule | (() => ConvertibleModule)
  /**
   * 是否禁用
   */
  disabled?: boolean
}

/**
 * 标签页组件
 */
export class Tabs extends FullRenderingModule {
  private activeKey: string

  constructor(
    private readonly opts: {
      /**
       * 标签页项
       */
      items: TabsItem[]
      /**
       * 当前激活的标签页 key
       */
      activeKey?: string
      /**
       * 标签切换回调
       */
      onChange?: (key: string) => void
    }
  ) {
    const firstEnabled = opts.items.find(item => !item.disabled)
    const activeKey = opts.activeKey ?? firstEnabled?.key ?? opts.items[0]?.key ?? ''
    super('wok-ui-ext-tabs')
    this.activeKey = activeKey
    this.render()
  }

  protected buildContent(): void {
    // 标签导航
    this.addChild({
      classNames: 'wok-ui-ext-tabs-nav',
      attrs: { role: 'tablist' },
      children: add => {
        for (const item of this.opts.items) {
          const active = item.key === this.activeKey
          add({
            tag: 'button',
            classNames: ['wok-ui-ext-tabs-tab', active ? 'active' : '', item.disabled ? 'disabled' : ''],
            attrs: {
              role: 'tab',
              'aria-selected': String(active),
              tabindex: active ? '0' : '-1',
              disabled: item.disabled ? 'true' : undefined
            },
            children: item.label,
            onClick: () => {
              if (item.disabled || item.key === this.activeKey) {
                return
              }
              this.setActiveKey(item.key)
              if (this.opts.onChange) {
                this.opts.onChange(item.key)
              }
            }
          })
        }
      }
    })

    // 标签内容
    const activeItem = this.opts.items.find(item => item.key === this.activeKey)
    if (activeItem) {
      this.addChild({
        classNames: 'wok-ui-ext-tabs-content',
        attrs: { role: 'tabpanel' },
        children: this.cacheModule({
          key: `tabs-content-${activeItem.key}`,
          module: () => {
            const content = activeItem.content
            return convertToModule(typeof content === 'function' ? content() : content)
          }
        })
      })
    }
  }

  /**
   * 设置当前激活的标签页
   */
  setActiveKey(key: string): void {
    if (this.activeKey === key) {
      return
    }
    const target = this.opts.items.find(item => item.key === key)
    if (!target || target.disabled) {
      return
    }
    this.activeKey = key
    this.render()
  }
}
