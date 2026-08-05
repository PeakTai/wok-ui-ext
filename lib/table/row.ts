import { Module } from 'wok-ui'
import { TableColumn } from './column'

/**
 * 行
 */
export class Row<T> extends Module {
  constructor(opts: {
    /**
     * 列设置.
     */
    cols: TableColumn<T>[]
    /**
     * 数据，如果没有数据就表示是头部
     */
    data?: T
    /**
     * 行索引，如果没有则表示是头部
     */
    rowIdx?: number
    /**
     * 是否为表头行
     */
    isHeader?: boolean
  }) {
    super(document.createElement('tr'))
    this.el.classList.add('wok-ui-ext-table-row')

    // 计算左右连续固定列的数量
    let leftFixedCount = 0
    for (const col of opts.cols) {
      if (col.setting.fixed) {
        leftFixedCount++
      } else {
        break
      }
    }
    let rightFixedCount = 0
    for (let i = opts.cols.length - 1; i >= 0; i--) {
      if (opts.cols[i].setting.fixed) {
        rightFixedCount++
      } else {
        break
      }
    }

    for (let idx = 0; idx < opts.cols.length; idx++) {
      const col = opts.cols[idx]
      const { name } = col.setting
      this.addChild({
        tag: opts.isHeader ? 'th' : 'td',
        classNames: 'table-cell',
        preHandle: el => {
          // 宽度
          const width = col.setting.width && col.setting.width > 0 ? col.setting.width : 80
          el.style.width = `${width}px`
          // 列固定处理
          if (col.setting.fixed) {
            const isLeft = idx < leftFixedCount
            const isRight = idx >= opts.cols.length - rightFixedCount
            if (isLeft) {
              el.classList.add('wok-ui-ext-fixed-left')
              let left = 0
              for (let i = 0; i < idx; i++) {
                if (opts.cols[i].setting.fixed) {
                  left += opts.cols[i].setting.width || 80
                }
              }
              if (left > 0) {
                el.style.left = `${left}px`
              }
            } else if (isRight) {
              el.classList.add('wok-ui-ext-fixed-right')
              let right = 0
              for (let i = idx + 1; i < opts.cols.length; i++) {
                if (opts.cols[i].setting.fixed) {
                  right += opts.cols[i].setting.width || 80
                }
              }
              if (right > 0) {
                el.style.right = `${right}px`
              }
            }
          }
        },
        children:
          opts.data && typeof opts.rowIdx === 'number'
            ? col.setting.content(opts.data, opts.rowIdx)
            : name
      })
    }
  }
}
