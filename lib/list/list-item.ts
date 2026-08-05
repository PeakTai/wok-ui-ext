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
  constructor(private opts: ListItemOptions) {
    super('wok-ui-ext-list-item')

    // 左侧内容区
    const body = document.createElement('div')
    body.style.cssText = 'flex:1;min-width:0'

    // 标题
    const titleDiv = document.createElement('div')
    titleDiv.style.cssText =
      'font-size:var(--font-size-normal);color:var(--text-primary);font-weight:500'
    if (typeof opts.title === 'string') {
      titleDiv.textContent = opts.title
    }
    body.appendChild(titleDiv)

    // 描述
    if (opts.description) {
      const descDiv = document.createElement('div')
      descDiv.style.cssText =
        'font-size:var(--font-size-small);color:var(--text-tertiary);margin-top:2px'
      if (typeof opts.description === 'string') {
        descDiv.textContent = opts.description
      }
      body.appendChild(descDiv)
    }

    this.addChild({
      children: body
    })

    // 右侧额外内容
    if (opts.extra) {
      this.addChild({
        children: opts.extra
      })
    }
  }
}
