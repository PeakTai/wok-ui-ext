import { FormInput, getI18n, getSize, ValidateResult } from 'wok-ui'
import './style.less'

export interface SelectOpts {
  /**
   * 尺寸
   */
  size?: 'sm' | 'default' | 'lg'
  /**
   * 必填
   */
  required?: boolean | string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 默认值
   */
  value?: string
  /**
   * 选项
   */
  options: Array<{ label: string; value: string } | string>
  /**
   * 变化监听
   * @param val
   */
  onChange?: (val: string) => void
}

/**
 * 下拉选择，用法与 wok-ui 的 Select 完全一致，可无缝替换。
 *
 * 与 wok-ui Select 的区别：
 * 1. 下拉箭头使用主题色（跟随 --color-primary），而不是 wok-ui 的固定灰色箭头
 * 2. 内部用一层 wrapper 只包裹原生 select，主题色箭头挂在 wrapper 上，
 *    因此校验反馈（invalid-feedback）出现时，箭头不会因为容器被撑高而偏移
 */
export class Select extends FormInput {
  private select!: HTMLSelectElement

  constructor(private readonly opts: SelectOpts) {
    super('wok-ui-ext-select')
    this.addChild({
      classNames: ['wok-ui-ext-select-wrap'],
      children: {
        tag: 'select',
        classNames: ['wok-ui-select'],
        attrs: { disabled: !!opts.disabled },
        postHandle: el => {
          this.select = el as HTMLSelectElement
          if (opts.value) {
            this.select.value = opts.value
          }
          this.select.addEventListener('change', () => {
            if (this.opts.onChange) {
              this.opts.onChange(this.select.value)
            }
            this.validate()
          })
        },
        children: opts.options.map(opt => {
          if (typeof opt === 'string') {
            return {
              tag: 'option',
              innerText: opt,
              attrs: { value: opt }
            }
          } else {
            return {
              tag: 'option',
              innerText: opt.label,
              attrs: { value: opt.value }
            }
          }
        })
      }
    })
    // 尺寸
    const size = getSize()
    switch (opts.size) {
      case 'lg':
        this.select.style.setProperty('--select-font-size', `${size.textLg}px`)
        break
      case 'sm':
        this.select.style.setProperty('--select-font-size', `${size.textSm}px`)
        break
      default:
        this.select.style.setProperty('--select-font-size', `${size.text}px`)
        break
    }
  }

  private __validate(val: string): ValidateResult {
    if (this.opts.required) {
      if (!val) {
        return {
          valid: false,
          msg:
            typeof this.opts.required === 'string'
              ? this.opts.required
              : getI18n().buildMsg('form-err-required')
        }
      }
    }
    return { valid: true }
  }

  validate(): boolean {
    const validateRes = this.__validate(this.select.value)
    // 根据是否有效，显示反馈信息
    if (validateRes.valid) {
      this.select.classList.remove('invalid')
      this.hideInvalidFeedback()
    } else {
      this.select.classList.add('invalid')
      this.showInvalidFeedback(validateRes.msg)
    }
    return validateRes.valid
  }

  setDisabled(disabled: boolean): void {
    this.select.disabled = disabled
  }
}
