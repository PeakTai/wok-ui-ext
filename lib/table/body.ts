import { Module } from 'wok-ui'
import { getWokUiExtI18n } from '../i18n'
import { TableColumn } from './column'
import { Row } from './row'
import { Empty } from '../empty'

/**
 * 躯干
 */
export class Body<T> extends Module {
  constructor(opts: {
    /**
     * 数据列表.
     */
    list: T[]
    /**
     * 列设置.
     */
    cols: TableColumn<T>[]

    /**
     * 空状态的描述
     */
    emptyDesc?: string
  }) {
    super(document.createElement('tbody'))
    this.el.classList.add('wok-ui-ext-table-body')
    if (opts.list.length) {
      opts.list.forEach((data, idx) => {
        this.addChild(
          new Row({
            cols: opts.cols,
            data,
            rowIdx: idx
          })
        )
      })
    } else {
      // 空状态
      const visibleCount = opts.cols.length
      const emptyText = opts.emptyDesc || getWokUiExtI18n().buildMsg('table-empty')
      this.addChild({
        tag: 'tr',
        children: {
          tag: 'td',
          attrs: { colspan: String(visibleCount || 1) },
          children: new Empty({ text: emptyText, noBorder: true })
        }
      })
    }
  }
}
