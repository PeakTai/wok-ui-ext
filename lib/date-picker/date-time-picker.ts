import { FormInput, getI18n, SubModulesOpt, ValidateResult } from 'wok-ui'
import { CalendarPanel } from './calendar-panel'
import { DatePickerLayer } from './layer'
import { TimePanel } from './time-panel'
import {
  combineDateConstraints,
  compareDate,
  formatDateTime,
  setTime,
  startOfDay
} from './date-utils'

/**
 * 日期时间选择器。交互方式：点选日期、调整时间都不会立即提交，
 * 点击底部「确定」后才写入值并触发 onChange；点外部或 Esc 视为取消。
 */
export class DateTimePicker extends FormInput {
  private value?: Date
  private panelYear = 0
  private panelMonth = 0
  private popup?: DatePickerLayer
  private triggerEl!: HTMLElement
  private confirmBtn?: HTMLButtonElement

  /** 弹层内的草稿：日期（零时）与时分 */
  private draftDate?: Date
  private draftHour = 0
  private draftMinute = 0

  constructor(
    private readonly opts: {
      value?: Date
      placeholder?: string
      required?: boolean | string
      min?: Date | { min: Date; errMsg: string }
      max?: Date | { max: Date; errMsg: string }
      disabled?: boolean
      disabledDate?: (date: Date) => boolean
      /** 未选择时间时使用的默认时分 */
      defaultTime?: { hour: number; minute: number }
      /** 分钟选项间隔，默认 1 */
      minuteStep?: number
      onChange?: (date?: Date) => void
    }
  ) {
    super('wok-ui-ext-date-picker')
    this.el.classList.add('wok-ui-ext-date-time-picker')
    this.value = opts.value
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
      children: this.value ? formatDateTime(this.value) : (this.opts.placeholder ?? '请选择日期时间'),
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
    // 已打开则关闭（取消本次修改）
    if (this.popup) {
      this.popup.destroy()
      return
    }
    this.initDraft()

    const panel = new CalendarPanel({
      year: this.panelYear,
      month: this.panelMonth,
      selectedDates: () => (this.draftDate ? [this.draftDate] : []),
      today: new Date(),
      disabledDate: this.dayConstraints(),
      onDayClick: date => this.handleDayClick(date),
      onMonthChange: (year, month) => {
        this.panelYear = year
        this.panelMonth = month
      }
    })

    const popup = new DatePickerLayer({
      target: this.el,
      panels: [panel],
      footer: this.buildFooter(),
      onClose: () => {
        if (this.popup === popup) {
          this.popup = undefined
        }
      }
    })
    this.popup = popup
    popup.mount(document.body)
  }

  private initDraft(): void {
    const base = this.value
    const fallback = this.opts.defaultTime ?? { hour: 0, minute: 0 }
    this.draftDate = base ? startOfDay(base) : undefined
    this.draftHour = base ? base.getHours() : fallback.hour
    this.draftMinute = base ? base.getMinutes() : fallback.minute

    const target = base ?? new Date()
    this.panelYear = target.getFullYear()
    this.panelMonth = target.getMonth()
  }

  private buildFooter(): SubModulesOpt {
    const timePanel = new TimePanel({
      hour: this.draftHour,
      minute: this.draftMinute,
      minuteStep: this.opts.minuteStep,
      onChange: (hour, minute) => {
        this.draftHour = hour
        this.draftMinute = minute
      }
    })
    // 分钟可能与 minuteStep 不对齐，以下拉框实际值为准同步草稿
    const { hour, minute } = timePanel.getValue()
    this.draftHour = hour
    this.draftMinute = minute

    return {
      classNames: 'wok-ui-ext-date-time-footer',
      children: [
        timePanel,
        {
          tag: 'button',
          classNames: 'wok-ui-ext-date-time-confirm',
          attrs: { type: 'button' },
          children: '确定',
          onClick: () => this.confirm(),
          postHandle: el => {
            this.confirmBtn = el as HTMLButtonElement
            this.confirmBtn.disabled = !this.draftDate
          }
        }
      ]
    }
  }

  private handleDayClick(date: Date): void {
    if (this.dayConstraints()(date)) return
    this.draftDate = date
    this.popup?.refresh()
    if (this.confirmBtn) {
      this.confirmBtn.disabled = false
    }
  }

  private confirm(): void {
    if (!this.draftDate) return
    const value = setTime(this.draftDate, this.draftHour, this.draftMinute)
    this.value = value
    this.popup?.destroy()
    this.render()
    this.validate()
    this.opts.onChange?.(value)
  }

  /**
   * 面板禁用按「天」比较，避免 min/max 带时分后整天被置灰；
   * 精确到时分的时间比较留给 validate。
   */
  private dayConstraints(): (date: Date) => boolean {
    const { min, max } = this.opts
    const minDay = min ? startOfDay(min instanceof Date ? min : min.min) : undefined
    const maxDay = max ? startOfDay(max instanceof Date ? max : max.max) : undefined
    return combineDateConstraints(minDay, maxDay, this.opts.disabledDate)
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
              ? getI18n().buildMsg('form-err-min', formatDateTime(minDate))
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
              ? getI18n().buildMsg('form-err-max', formatDateTime(maxDate))
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
