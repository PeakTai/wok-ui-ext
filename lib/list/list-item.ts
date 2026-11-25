import { DivModule, SubModulesOpt } from 'wok-ui'

export interface ListItemOptions {
  /** 标题 */
  title: string | SubModulesOpt
  /** 描述（可选） */
  description?: string | SubModulesOpt
  /** 右侧额外内容 */
  extra?: SubModulesOpt
}

/**
 * 列表项
 *
 * 配合 List 使用的标准列表项，包含标题、描述和额外操作区。
 *
 * @example
 * ```ts
 * new ListItem({
 *   title: '用户名称',
 *   description: 'user@example.com',
 *   extra: new Tag({ text: '管理员' })
 * })
 * ```
 */
export class ListItem extends DivModule {
  constructor(opts: ListItemOptions) {
    super('wok-ui-ext-list-item')

    this.addChild({
      classNames: 'wok-ui-ext-list-item-body',
      children: add => {
        add({
          classNames: 'wok-ui-ext-list-item-title',
          children: opts.title
        })
        if (opts.description) {
          add({
            classNames: 'wok-ui-ext-list-item-desc',
            children: opts.description
          })
        }
      }
    })

    // 右侧额外内容
    if (opts.extra) {
      this.addChild(opts.extra)
    }
  }
}
