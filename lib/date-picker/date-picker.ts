import { FormInput, getI18n, ValidateResult } from 'wok-ui'
import { CalendarPanel } from './calendar-panel'
import { DatePickerLayer } from './layer'
import { compareDate, combineDateConstraints, formatDate } from './date-utils'

export class DatePicker extends FormInput {
  private value?: Date
  private panelYear: number
  private panelMonth: number
  private popup?: DatePickerLayer
  private triggerEl!: HTMLElement

  constructor(
    private readonly opts: {
      value?: Date
      placeholder?: string
      required?: boolean | string
      min?: Date | { min: Date; errMsg: string }
      max?: Date | { max: Date; errMsg: string }
      disabled?: boolean
      disabledDate?: (date: Date) => boolean
      onChange?: (date?: Date) => void
    }
  ) {
    super('wok-ui-ext-date-picker')
    const today = new Date()
    this.value = opts.value
    const initDate = this.value ?? today
    this.panelYear = initDate.getFullYear()
    this.panelMonth = initDate.getMonth()
    this.render()
  }

  /**
   * 清空后重新构建内容
   */
  private render(): void {
    this.empty()
    this.buildContent()
  }

  private buildContent(): void {
    this.addChild({
      classNames: ['wok-ui-ext-date-picker-trigger', this.opts.disabled ? 'disabled' : ''],
      children: this.value ? formatDate(this.value) : (this.opts.placeholder ?? '请选择日期'),
      onClick: () => {
        if (this.opts.disabled) return
        this.togglePopup()
      },
      postHandle: el => {
        this.triggerEl = el
        if (!this.value) {
          el.classList.add('placeholder')
        }
      }
    })
  }

  private togglePopup(): void {
    // 已打开则关闭
    if (this.popup) {
      this.popup.destroy()
      return
    }
    const target = this.value ?? new Date()
    this.panelYear = target.getFullYear()
    this.panelMonth = target.getMonth()

    const today = new Date()
    const panel = new CalendarPanel({
      year: this.panelYear,
      month: this.panelMonth,
      selectedDates: () => (this.value ? [this.value] : []),
      today,
      disabledDate: combineDateConstraints(this.opts.min, this.opts.max, this.opts.disabledDate),
      onDayClick: date => this.selectDate(date),
      onMonthChange: (year, month) => {
        this.panelYear = year
        this.panelMonth = month
      }
    })
    this.openPopup([panel])
  }

  private openPopup(panels: CalendarPanel[]): void {
    const popup = new DatePickerLayer({
      target: this.el,
      panels,
      onClose: () => {
        if (this.popup === popup) {
          this.popup = undefined
        }
      }
    })
    this.popup = popup
    popup.mount(document.body)
  }

  private selectDate(date: Date): void {
    if (combineDateConstraints(this.opts.min, this.opts.max, this.opts.disabledDate)(date)) return

    this.value = date
    this.popup?.destroy()
    this.render()
    this.validate()
    this.opts.onChange?.(date)
  }

  private validateResult(): ValidateResult {
    if (!this.value) {
      if (this.opts.required) {
        return {
          valid: false,
          msg:
            typeof this.opts.required === 'string'
              ? this.opts.required
              : getI18n().buildMsg('form-err-required')
        }
      }
      return { valid: true }
    }
    if (this.opts.min) {
      const minDate = this.opts.min instanceof Date ? this.opts.min : this.opts.min.min
      if (compareDate(this.value, minDate) < 0) {
        return {
          valid: false,
          msg:
            this.opts.min instanceof Date
              ? getI18n().buildMsg('form-err-min', formatDate(minDate))
              : this.opts.min.errMsg
        }
      }
    }
    if (this.opts.max) {
      const maxDate = this.opts.max instanceof Date ? this.opts.max : this.opts.max.max
      if (compareDate(this.value, maxDate) > 0) {
        return {
          valid: false,
          msg:
            this.opts.max instanceof Date
              ? getI18n().buildMsg('form-err-max', formatDate(maxDate))
              : this.opts.max.errMsg
        }
      }
    }
    return { valid: true }
  }

  validate(): boolean {
    const validateRes = this.validateResult()
    // 根据是否有效，显示反馈信息
    if (validateRes.valid) {
      this.triggerEl.classList.remove('invalid')
      this.hideInvalidFeedback()
    } else {
      this.triggerEl.classList.add('invalid')
      this.showInvalidFeedback(validateRes.msg)
    }
    return validateRes.valid
  }

  override destroy(): void {
    this.popup?.destroy()
    super.destroy()
  }
}
