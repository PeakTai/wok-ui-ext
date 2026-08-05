import { Module } from 'wok-ui'
import { TableColumn } from './column'
import { Row } from './row'

/**
 * 头部
 */
export class Header<T> extends Module {
  constructor(opts: {
    /**
     * 列设置.
     */
    cols: TableColumn<T>[]
  }) {
    super(document.createElement('thead'))
    this.el.classList.add('wok-ui-ext-table-header')
    this.addChild(
      new Row({
        cols: opts.cols,
        isHeader: true
      })
    )
  }
}
