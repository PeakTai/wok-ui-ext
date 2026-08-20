import { ConvertibleModule, DivModule, SubModulesOpt } from 'wok-ui'
import './style.less'

/**
 * 表单条目，水平布局，左边标题，右边是输入框
 */
export class FormItem extends DivModule {
  constructor(
    private opts: {
      /**
       * 标题
       */
      label: ConvertibleModule
      /**
       * 标题宽度，单位像素
       */
      labelWidth?: number
      /**
       * 必填标识，如果为 true ，则会在标题上显示出一个红色星号来提示用户条目必填
       */
      required?: boolean
      /**
       * 内容输入模块
       */
      input: SubModulesOpt
    }
  ) {
    super('wok-ui-ext-form-item')
    if (typeof opts.labelWidth === 'number') {
      this.el.style.setProperty('--form-label-width', `${opts.labelWidth}px`)
    }
    this.addChild(
      {
        classNames: ['wok-ui-ext-form-label', opts.required ? 'required' : ''],
        children: this.opts.label
      },
      {
        classNames: ['wok-ui-ext-form-field'],
        children: this.opts.input
      }
    )
  }
}
