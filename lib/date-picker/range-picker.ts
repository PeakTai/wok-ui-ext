import { DivModule } from 'wok-ui'
import { CalendarPanel } from './calendar-panel'
import { DatePickerLayer } from './layer'
import { formatDate, compareDate, addMonths, combineDateConstraints } from './date-utils'

export type DateRange = [Date, Date]

export class DateRangePicker extends DivModule {
  private value?: DateRange
  /** 是否已选好开始日期、正在等待选择结束日期 */
  private picking = false
  private hoveredDate?: Date
  private popup?: DatePickerLayer
  private textEl?: HTMLElement

  constructor(
    private readonly opts: {
      value?: DateRange
      placeholder?: string
      required?: boolean | string
      min?: Date | { min: Date; errMsg: string }
      max?: Date | { max: Date; errMsg: string }
      disabled?: boolean
      disabledDate?: (date: Date) => boolean
      onChange?: (range?: DateRange) => void
    }
  ) {
    super('wok-ui-ext-date-range-picker wok-ui-ext-date-picker')
    this.value = opts.value
    this.addChild({
      classNames: ['wok-ui-ext-date-picker-trigger', this.opts.disabled ? 'disabled' : ''],
      children: {
        tag: 'span',
        classNames: 'wok-ui-ext-date-picker-text',
        innerText: this.rangeText(),
        postHandle: el => {
          this.textEl = el
          if (!this.value) {
            el.parentElement?.classList.add('placeholder')
          }
        }
      },
      onClick: () => {
        if (this.opts.disabled) return
        this.togglePopup()
      }
    })
  }

  private rangeText(): string {
    if (!this.value) {
      return this.opts.placeholder ?? '请选择日期范围'
    }
    const [start, end] = this.value
    if (this.picking) {
      return `${formatDate(start)} ~ 结束日期`
    }
    return `${formatDate(start)} ~ ${formatDate(end)}`
  }

  private updateText(): void {
    if (this.textEl) {
      this.textEl.innerText = this.rangeText()
      if (this.value) {
        this.textEl.parentElement?.classList.remove('placeholder')
      } else {
        this.textEl.parentElement?.classList.add('placeholder')
      }
    }
  }

  private togglePopup(): void {
    if (this.popup) {
      this.popup.destroy()
      return
    }
    this.hoveredDate = undefined
    this.picking = false
    const valueOnOpen = this.value

    const today = new Date()
    // 选择过程中只高亮已选的开始日期，便于 hover 预览剩余范围
    const selected = () => (this.picking && this.value ? [this.value[0]] : (this.value ?? []))
    const target = this.value?.[0] ?? today
    const leftYear = target.getFullYear()
    const leftMonth = target.getMonth()
    const rightDate = addMonths(new Date(leftYear, leftMonth, 1), 1)
    const disabledDate = combineDateConstraints(this.opts.min, this.opts.max, this.opts.disabledDate)

    const buildPanel = (year: number, month: number) =>
      new CalendarPanel({
        year,
        month,
        selectedDates: selected,
        today,
        disabledDate,
        onDayClick: date => this.handleDayClick(date, disabledDate),
        onDayHover: date => {
          this.hoveredDate = date
          this.popup?.setHoveredDate(date)
        },
        onMonthChange: () => {}
      })

    const popup = new DatePickerLayer({
      target: this.el,
      panels: [buildPanel(leftYear, leftMonth), buildPanel(rightDate.getFullYear(), rightDate.getMonth())],
      onClose: () => {
        if (this.popup !== popup) {
          return
        }
        this.popup = undefined
        this.hoveredDate = undefined
        // 未选完结束日期就关闭弹层，放弃这次选择，回到打开前的范围
        if (this.picking) {
          this.picking = false
          this.value = valueOnOpen
          this.updateText()
        }
      }
    })
    this.popup = popup
    popup.mount(document.body)
  }

  private handleDayClick(date: Date, disabledDate: (date: Date) => boolean): void {
    if (disabledDate(date)) return

    if (!this.picking) {
      // 选择开始日期；若已有完整范围，则从新的开始日期重新选择
      this.value = [date, date]
      this.picking = true
      this.hoveredDate = date
      this.updateText()
      this.popup?.refresh()
      this.popup?.setHoveredDate(date)
      return
    }

    const start = this.value ? this.value[0] : date
    this.value = compareDate(date, start) < 0 ? [date, start] : [start, date]
    this.picking = false
    this.hoveredDate = undefined
    this.popup?.destroy()
    this.updateText()
    this.opts.onChange?.(this.value)
  }

  override destroy(): void {
    this.popup?.destroy()
    super.destroy()
  }
}
