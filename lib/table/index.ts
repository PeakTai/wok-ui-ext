import { FullRenderingModule } from 'wok-ui'
import { Body } from './body'
import { TableColumn } from './column'
import { Header } from './header'
import './style.less'

/**
 * 表格
 */
export class Table<T> extends FullRenderingModule {
  /**
   * 展开后的列数组
   */
  private cols: TableColumn<T>[]

  constructor(
    private opts: {
      /**
       * 数据列表.
       */
      list: T[]
      /**
       * 列设置，支持数组或动态构建函数。
       */
      cols: TableColumn<T>[] | ((add: (col: TableColumn<T>) => void) => void)
      /**
       * 固定头部，开启后表头在滚动时保持固定，需配合 height 使用（未指定时默认 300px）
       */
      fixedHeader?: boolean
      /**
       * 表格高度，超出后容器内部滚动
       */
      height?: number | string
      /**
       * 表格的标题
       */
      caption?: string
      /**
       * 空状态的描述
       */
      emptyDesc?: string
    }
  ) {
    // 外层为滚动容器，内部是原生 table 布局
    super(document.createElement('div'))
    this.el.classList.add('wok-ui-ext-table')
    // 高度控制
    const { height } = opts
    if (typeof height === 'number') {
      this.el.style.height = `${height}px`
    } else if (typeof height === 'string') {
      this.el.style.height = height
    } else if (opts?.fixedHeader) {
      this.el.style.height = '300px'
    }
    if (opts?.fixedHeader) {
      this.el.classList.add('wok-ui-ext-fixed-header')
    }

    // 展开列
    if (typeof opts.cols === 'function') {
      const cols: TableColumn<T>[] = []
      opts.cols(col => cols.push(col))
      this.cols = cols
    } else {
      this.cols = opts.cols
    }

    // 校验
    if (!this.cols.length) {
      throw new Error('必须设置列')
    }
    // 检查列名称是否有重复
    const colNames: string[] = []
    let fixedColCount = 0
    for (const col of this.cols) {
      if (fixedColCount > 4) {
        throw new Error('被固定的列不能超过4个')
      }
      if (col.setting.fixed) {
        fixedColCount++
      }
      const { name } = col.setting
      if (typeof name !== 'string') {
        continue
      }
      if (colNames.includes(name)) {
        throw new Error(`列名称“${name}”重复`)
      }
      colNames.push(name)
    }

    // 立即渲染， render() 无参是异步的，当表格内容过长时，会丢失滚动位置
    this.render()
  }

  protected buildContent(): void {
    this.addChild({
      tag: 'table',
      classNames: 'wok-ui-ext-table-inner',
      children: add => {
        if (this.opts.caption) {
          add({
            tag: 'caption',
            innerText: this.opts.caption
          })
        }
        add(new Header({ cols: this.cols }))
        add(
          new Body<T>({
            emptyDesc: this.opts.emptyDesc,
            list: this.opts.list,
            cols: this.cols
          })
        )
      }
    })
  }
}

export * from './column'
