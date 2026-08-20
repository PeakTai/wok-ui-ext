import { DivModule, SubModulesOpt, type CreateDomModuleOptions } from 'wok-ui'
import './style.less'

export interface DescriptionItem {
  label: SubModulesOpt
  content: SubModulesOpt
  /**
   * 条目独占一行.
   */
  exclusiveRow?: boolean
}

/**
 * 布局方式.
 * vertical: 标题在内容上方；horizontal: 标题在内容左侧.
 */
export type DescriptionListLayout = 'vertical' | 'horizontal'

export class DescriptionList extends DivModule {
  constructor(opts: {
    items: DescriptionItem[] | ((add: (...item: DescriptionItem[]) => void) => void)
    cols?: number
    /**
     * 间距（px），默认 24，bordered 模式下固定为 0
     */
    gap?: number
    /**
     * 布局方式，默认 vertical
     */
    layout?: DescriptionListLayout
    /**
     * 标题宽度（px），仅 layout 为 horizontal 时生效，默认 120
     */
    labelWidth?: number
    /**
     * 是否带边框，默认 false
     */
    bordered?: boolean
  }) {
    // 外层容器，bordered 时负责圆角裁剪
    super('wok-ui-ext-description-list')
    const { items, cols = 3, gap = 24, layout = 'vertical', labelWidth, bordered = false } = opts

    this.el.style.setProperty('--dl-gap', `${gap}px`)
    if (layout === 'horizontal') {
      this.el.classList.add('layout-horizontal')
    }
    if (bordered) {
      this.el.classList.add('bordered')
    }

    // 构建 items
    const finalItems: DescriptionItem[] = []
    if (Array.isArray(items)) {
      finalItems.push(...items)
    } else {
      function add(...items: DescriptionItem[]) {
        finalItems.push(...items)
      }
      items(add)
    }

    // table：colgroup 控制列宽（horizontal 每列拆为 label 列 + content 列），tbody 动态构建
    this.addChild({
      tag: 'table',
      classNames: 'wok-ui-ext-description-table',
      children: [
        {
          tag: 'colgroup',
          children: Array.from({ length: layout === 'horizontal' ? cols * 2 : cols }, (_, i) =>
            layout === 'horizontal' && i % 2 === 0
              ? { tag: 'col', style: { width: `${labelWidth ?? 120}px` } }
              : { tag: 'col' }
          )
        },
        {
          tag: 'tbody',
          children: add => {
            if (layout === 'horizontal') {
              // 标题在左：label/content 为单元格，每行 cols 对
              const perRow = cols * 2
              let rowCells: CreateDomModuleOptions[] = []
              const flushRow = () => {
                if (rowCells.length > 0) {
                  if (rowCells.length < perRow) {
                    // 行尾条目占满剩余列：最后一个 content 合并剩余列
                    const last = rowCells[rowCells.length - 1]
                    last.attrs = { colspan: String(perRow - rowCells.length + 1) }
                  }
                  add({ tag: 'tr', children: rowCells })
                  rowCells = []
                }
              }
              for (const item of finalItems) {
                if (item.exclusiveRow) {
                  flushRow()
                  add({
                    tag: 'tr',
                    children: [
                      { tag: 'td', classNames: 'wok-ui-ext-description-label', children: item.label },
                      {
                        tag: 'td',
                        classNames: 'wok-ui-ext-description-content',
                        attrs: { colspan: String(perRow - 1) },
                        children: item.content
                      }
                    ]
                  })
                } else {
                  rowCells.push(
                    { tag: 'td', classNames: 'wok-ui-ext-description-label', children: item.label },
                    { tag: 'td', classNames: 'wok-ui-ext-description-content', children: item.content }
                  )
                  if (rowCells.length >= perRow) {
                    flushRow()
                  }
                }
              }
              flushRow()
            } else {
              // 标题在上：每组 cols 个条目，label 一行、content 一行
              let group: DescriptionItem[] = []
              const flushGroup = () => {
                if (group.length > 0) {
                  add({
                    tag: 'tr',
                    children: group.map(item => ({
                      tag: 'td',
                      classNames: 'wok-ui-ext-description-label',
                      children: item.label
                    }))
                  })
                  add({
                    tag: 'tr',
                    children: group.map(item => ({
                      tag: 'td',
                      classNames: 'wok-ui-ext-description-content',
                      children: item.content
                    }))
                  })
                  group = []
                }
              }
              for (const item of finalItems) {
                if (item.exclusiveRow) {
                  // 独占一行：label 单独一行、content 单独一行，均占满整行
                  flushGroup()
                  add({
                    tag: 'tr',
                    children: [
                      {
                        tag: 'td',
                        classNames: 'wok-ui-ext-description-label',
                        attrs: { colspan: String(cols) },
                        children: item.label
                      }
                    ]
                  })
                  add({
                    tag: 'tr',
                    children: [
                      {
                        tag: 'td',
                        classNames: 'wok-ui-ext-description-content',
                        attrs: { colspan: String(cols) },
                        children: item.content
                      }
                    ]
                  })
                } else {
                  group.push(item)
                  if (group.length >= cols) {
                    flushGroup()
                  }
                }
              }
              flushGroup()
            }
          }
        }
      ]
    })
  }
}
