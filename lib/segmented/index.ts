import { DivModule } from 'wok-ui'
import './style.less'

export interface SegmentedItem {
  label: string
  value: string
}

/**
 * 分段控件
 *
 * 用于筛选条件切换，支持字符串数组或 { label, value } 对象数组。
 *
 * @example
 * ```ts
 * // 简单字符串数组
 * new Segmented({
 *   items: ['全部', '启用', '禁用'],
 *   activeValue: '启用',
 *   onChange: v => console.log(v)
 * })
 *
 * // 指定 label/value
 * new Segmented({
 *   items: [{ label: '全部', value: '' }, { label: '启用', value: '1' }],
 *   activeValue: '',
 *   onChange: v => console.log(v)
 * })
 * ```
 */
export class Segmented extends DivModule {
  private activeValue: string
  private items: SegmentedItem[]

  constructor(
    private opts: {
      items: Array<SegmentedItem | string>
      activeValue: string
      onChange: (activeValue: string) => void
    }
  ) {
    super('wok-ui-ext-segmented')

    this.items = opts.items.map(item =>
      typeof item === 'string' ? { label: item, value: item } : item
    )
    this.activeValue = opts.activeValue

    for (const item of this.items) {
      const isActive = item.value === this.activeValue
      this.addChild({
        tag: 'span',
        classNames: ['wok-ui-ext-segmented-item', isActive ? 'active' : ''],
        innerText: item.label,
        onClick: () => {
          if (item.value === this.activeValue) return
          this.activeValue = item.value
          // 更新 active 样式
          this.el.querySelectorAll('.wok-ui-ext-segmented-item').forEach((el, i) => {
            el.classList.toggle('active', this.items[i].value === this.activeValue)
          })
          this.opts.onChange(item.value)
        }
      })
    }
  }

  /** 获取当前选中值 */
  getValue(): string {
    return this.activeValue
  }

  /** 设置当前选中值 */
  setValue(value: string): void {
    this.activeValue = value
    this.el.querySelectorAll('.wok-ui-ext-segmented-item').forEach((el, i) => {
      el.classList.toggle('active', this.items[i].value === value)
    })
  }
}
