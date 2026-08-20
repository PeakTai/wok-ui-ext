import { FullRenderingModule } from 'wok-ui'
import { CalendarPanel } from './calendar-panel'
import { DatePickerLayer } from './layer'
import { formatDate, combineDateConstraints } from './date-utils'

export class DatePicker extends FullRenderingModule {
  private value?: Date
  private panelYear: number
  private panelMonth: number
  private popup?: DatePickerLayer

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

  protected buildContent(): void {
    this.addChild({
      classNames: ['wok-ui-ext-date-picker-trigger', this.opts.disabled ? 'disabled' : ''],
      children: this.value ? formatDate(this.value) : (this.opts.placeholder ?? '请选择日期'),
      onClick: () => {
        if (this.opts.disabled) return
        this.togglePopup()
      },
      postHandle: el => {
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
    this.opts.onChange?.(date)
  }

  override destroy(): void {
    this.popup?.destroy()
    super.destroy()
  }
}
