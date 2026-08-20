import { DivModule, SubModulesOpt } from 'wok-ui'
import { Empty } from '../empty'
import './style.less'

export interface ListOptions {
  /** 列表项 */
  items: SubModulesOpt[]
  /** 空状态文案 */
  emptyText?: string
  /** 是否带边框，默认为 true，传 false 关闭边框 */
  bordered?: boolean
  /** 尺寸 */
  size?: 'default' | 'small' | 'large'
}

/**
 * 通用数据列表
 *
 * 轻量级的数据展示列表，适合作为 Table 的替代方案。
 *
 * @example
 * ```ts
 * new List({
 *   items: users.map(user => new ListItem({
 *     title: user.name,
 *     description: user.email
 *   })),
 *   bordered: true,
 *   size: 'small'
 * })
 * ```
 */
export class List extends DivModule {
  constructor(opts: ListOptions) {
    super('wok-ui-ext-list')

    // 默认带边框，传 bordered: false 关闭边框
    if (opts.bordered !== false) {
      this.el.classList.add('bordered')
    }
    if (opts.size && opts.size !== 'default') {
      this.el.classList.add(opts.size)
    }

    if (!opts.items || opts.items.length === 0) {
      this.addChild(new Empty({ text: opts.emptyText, noBorder: true }))
      return
    }

    opts.items.forEach(item => {
      this.addChild({
        classNames: 'wok-ui-ext-list-item',
        children: item
      })
    })
  }
}
