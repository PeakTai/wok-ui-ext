import { DivModule } from 'wok-ui'
import { IconInput, resolveIcon } from '../icons'
import './style.less'

export interface BreadcrumbItem {
  text: string
  onClick?: () => void
  icon?: IconInput
}

/**
 * 面包屑导航组件
 */
export class Breadcrumb extends DivModule {
  constructor(
    private readonly opts: {
      /**
       * 面包屑项列表
       */
      items: BreadcrumbItem[]
      /**
       * 分隔符，默认 '/'
       */
      separator?: string
    }
  ) {
    super('wok-ui-ext-breadcrumb')
    this.render()
  }

  private render(): void {
    const { items, separator = '/' } = this.opts
    const lastIndex = items.length - 1

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const isLast = i === lastIndex

      if (isLast) {
        // 当前页：纯文本，不可点击
        this.addChild({
          classNames: 'wok-ui-ext-breadcrumb-item wok-ui-ext-breadcrumb-item-current',
          children: item.icon
            ? [resolveIcon(item.icon), { children: item.text }]
            : item.text
        })
      } else {
        // 上级页面：可点击链接
        this.addChild({
          tag: 'a',
          classNames: 'wok-ui-ext-breadcrumb-item',
          attrs: { href: 'javascript:void(0)' },
          children: item.icon
            ? [resolveIcon(item.icon), { children: item.text }]
            : item.text,
          onClick: () => item.onClick?.()
        })

        // 分隔符
        this.addChild({
          classNames: 'wok-ui-ext-breadcrumb-separator',
          children: separator
        })
      }
    }
  }
}
