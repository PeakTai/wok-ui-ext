import { Form as WokUIForm, FormOpts as WokUIFormOpts } from 'wok-ui'

export interface FormOpts extends WokUIFormOpts {
  /**
   * 输入框标题的宽度
   */
  labelWidth?: string | number
  /**
   * 输入框标题在上还是在左，默认在左
   */
  labelPosition?: 'top' | 'left'
  /**
   * label 是否加粗，默认false
   */
  labelBold?: boolean
}

/**
 * 表单，在原 wok-ui 表单的基础上增加了输入框标题相关的选项，配合 FormItem 使用
 */
export class Form extends WokUIForm {
  constructor(opt: FormOpts) {
    super(opt)
    let labelWidth = '120px'
    if (opt.labelPosition === 'top') {
      labelWidth = '100%'
    } else if (opt.labelWidth) {
      if (typeof opt.labelWidth === 'number') {
        labelWidth = `${opt.labelWidth}px`
      } else {
        labelWidth = opt.labelWidth
      }
    }
    this.el.style.setProperty('--form-label-width', labelWidth)
    if (opt.labelPosition === 'top') {
      this.el.classList.add('wok-ui-ext-form-label-top')
    }
    if (opt.labelBold) {
      this.el.classList.add('wok-ui-ext-form-label-bold')
    }
  }
}
