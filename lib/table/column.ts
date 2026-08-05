import { Checkbox, rem, SubModulesOpt } from 'wok-ui'

/**
 * 列设定.
 */
export interface TableColumnSetting<T> {
  /**
   * 列名称.特殊需要传入模块来处理，比如文字需要变色等.
   */
  name: string | (() => SubModulesOpt)
  /**
   * 将列固定
   */
  fixed?: boolean
  /**
   * 列宽度，默认 80
   */
  width?: number
  /**
   * 内容生成.
   */
  content: (data: T, rowIdx: number) => SubModulesOpt
}

/**
 * 列.
 */
export class TableColumn<T> {
  constructor(readonly setting: TableColumnSetting<T>) {
  }
}

/**
 * 勾选框列.
 */
export class TableCheckboxColumn<T> extends TableColumn<T> {
  private checkAllBox?: Checkbox
  private boxes: Checkbox[] = []

  constructor(
    private opts: {
      /**
       * 将列固定
       */
      fixed?: boolean
      /**
       * 勾选框绑定的值.
       */
      value: (data: T, rowIdx: number) => string
      /**
       * 初始状态，可选.
       */
      checked?: (data: T, rowIdx: number) => boolean
      /**
       * 列名称，可选，如果有值，则不会在头部显示全选的勾选框.
       */
      name?: string
      /**
       * 是否禁用函数, 适用于一些无权限或不支持批量操作的场景
       * @param data
       * @returns
       */
      disabled?: (data: T) => boolean
      /**
       * 更改事件.
       */
      onChange?: (checkedVals: string[]) => void
    }
  ) {
    let name: string | (() => SubModulesOpt) = ''
    if (opts.name) {
      name = opts.name
    } else {
      name = () => {
        const checkbox = new Checkbox({
          status: 'unchecked',
          onChange: status => {
            if (checkbox.isChecked()) {
              // 全选
              this.boxes.forEach(b => b.setStatus('checked'))
            } else {
              // 全不选
              this.boxes.forEach(b => b.setStatus('unchecked'))
            }
            if (opts.onChange) {
              opts.onChange(this.getCheckedValues())
            }
          },
          value: ''
        })
        this.checkAllBox = checkbox
        return checkbox
      }
    }
    super({
      name,
      fixed: opts.fixed,
      content: (data, idx) => {
        const disabled = opts.disabled ? opts.disabled(data) : false
        const value = opts.value(data, idx)
        const checked = opts.checked ? opts.checked(data, idx) : false
        const box = new Checkbox({
          status: checked ? 'checked' : 'unchecked',
          value,
          disabled,
          onChange: () => {
            const checkedValues = this.getCheckedValues()
            if (opts.onChange) {
              opts.onChange(checkedValues)
            }
            this.updateCheckAllBox()
          }
        })
        if (!disabled) {
          this.boxes.push(box)
        }
        this.updateCheckAllBox()
        return box
      },
      width: rem(2)
    })
  }

  /**
   * 更新全选勾选框.
   */
  private updateCheckAllBox() {
    if (!this.checkAllBox) {
      return
    }
    const checkedValues = this.getCheckedValues()
    if (this.boxes.length > 0 && checkedValues.length === this.boxes.length) {
      this.checkAllBox.setStatus('checked')
    } else if (checkedValues.length === 0) {
      this.checkAllBox.setStatus('unchecked')
    } else {
      this.checkAllBox.setStatus('indeterminate')
    }
  }

  getCheckedValues(): string[] {
    return this.boxes.filter(b => b.isChecked()).map(b => b.value)
  }

  checkAll() {
    if (this.checkAllBox) {
      this.checkAllBox.setStatus('checked')
    }
    this.boxes.forEach(b => b.setStatus('checked'))
  }

  uncheckAll() {
    if (this.checkAllBox) {
      this.checkAllBox.setStatus('unchecked')
    }
    this.boxes.forEach(b => b.setStatus('unchecked'))
  }
}

/**
 * 序号列.
 */
export class TableIndexColumn<T> extends TableColumn<T> {
  constructor() {
    super({ name: '#', content: (data, idx) => `${idx + 1}`, width: rem(3) })
  }
}
