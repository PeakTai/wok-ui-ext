import { FullRenderingModule } from 'wok-ui'
import { CalendarPanel } from './calendar-panel'
import { formatDate, compareDate, addMonths } from './date-utils'

export type DateRange = [Date, Date]

export class DateRangePicker extends FullRenderingModule {
  private value?: DateRange
  private hoveredDate?: Date
  private popupOpen = false
  private docClickHandler?: (evt: MouseEvent) => void

  constructor(
    private readonly opts: {
      value?: DateRange
      placeholder?: [string, string]
      required?: boolean | string
      min?: Date | { min: Date; errMsg: string }
      max?: Date | { max: Date; errMsg: string }
      disabled?: boolean
      disabledDate?: (date: Date) => boolean
      onChange?: (range?: DateRange) => void
    }
  ) {
    super('wok-ui-ext-date-range-picker wok-ui-ext-date-picker')
    this.render()
  }

  protected buildContent(): void {
    const [phStart = '开始日期', phEnd = '结束日期'] = this.opts.placeholder ?? []
    const today = new Date()

    const selected = () => this.value ?? []
    const hovered = () => this.hoveredDate

    const panels = this.popupOpen ? this.buildPanels(selected, hovered, today) : []

    this.addChild(
      {
        classNames: ['wok-ui-ext-date-picker-trigger', this.opts.disabled ? 'disabled' : ''],
        children: this.value ? formatDate(this.value[0]) : phStart,
        onClick: () => {
          if (this.opts.disabled) return
          this.togglePopup()
        },
        postHandle: el => {
          if (!this.value) {
            el.classList.add('placeholder')
          }
        }
      },
      {
        classNames: 'wok-ui-ext-date-range-separator',
        children: '—'
      },
      {
        classNames: ['wok-ui-ext-date-picker-trigger', this.opts.disabled ? 'disabled' : ''],
        children: this.value ? formatDate(this.value[1]) : phEnd,
        onClick: () => {
          if (this.opts.disabled) return
          this.togglePopup()
        },
        postHandle: el => {
          if (!this.value) {
            el.classList.add('placeholder')
          }
        }
      },
      {
        classNames: ['wok-ui-ext-date-picker-popup', 'wok-ui-ext-date-range-popup', this.popupOpen ? 'open' : ''],
        children: panels
      }
    )
  }

  private buildPanels(
    selected: () => Date[],
    hovered: () => Date | undefined,
    today: Date
  ): any[] {
    const target = this.value?.[0] ?? today
    const leftYear = target.getFullYear()
    const leftMonth = target.getMonth()
    const rightDate = addMonths(new Date(leftYear, leftMonth, 1), 1)

    return [
      {
        classNames: 'wok-ui-ext-date-range-panel',
        children: new CalendarPanel({
          year: leftYear,
          month: leftMonth,
          selectedDates: selected,
          hoveredDate: hovered,
          today,
          disabledDate: this.opts.disabledDate,
          onDayClick: date => this.handleDayClick(date),
          onDayHover: date => {
            this.hoveredDate = date
            this.render()
          },
          onMonthChange: () => {}
        })
      },
      {
        classNames: 'wok-ui-ext-date-range-panel',
        children: new CalendarPanel({
          year: rightDate.getFullYear(),
          month: rightDate.getMonth(),
          selectedDates: selected,
          hoveredDate: hovered,
          today,
          disabledDate: this.opts.disabledDate,
          onDayClick: date => this.handleDayClick(date),
          onDayHover: date => {
            this.hoveredDate = date
            this.render()
          },
          onMonthChange: () => {}
        })
      }
    ]
  }

  private togglePopup(): void {
    this.popupOpen = !this.popupOpen
    this.hoveredDate = undefined
    if (this.popupOpen) {
      this.setupDocClickHandler()
    } else {
      this.removeDocClickHandler()
    }
    this.render()
  }

  private handleDayClick(date: Date): void {
    if (this.opts.disabledDate?.(date)) return

    if (!this.value) {
      this.value = [date, date]
      this.hoveredDate = undefined
      this.render()
      return
    }

    const [prevStart, prevEnd] = this.value
    if (compareDate(prevStart, prevEnd) === 0) {
      if (compareDate(date, prevStart) < 0) {
        this.value = [date, prevStart]
      } else {
        this.value = [prevStart, date]
      }
      this.hoveredDate = undefined
      this.popupOpen = false
      this.removeDocClickHandler()
      this.render()
      this.opts.onChange?.(this.value)
    } else {
      this.value = [date, date]
      this.hoveredDate = undefined
      this.render()
    }
  }

  private setupDocClickHandler(): void {
    if (this.docClickHandler) return
    this.docClickHandler = (evt: MouseEvent) => {
      if (!this.el.contains(evt.target as Node)) {
        this.popupOpen = false
        this.hoveredDate = undefined
        this.removeDocClickHandler()
        this.render()
      }
    }
    document.addEventListener('click', this.docClickHandler)
  }

  private removeDocClickHandler(): void {
    if (this.docClickHandler) {
      document.removeEventListener('click', this.docClickHandler)
      this.docClickHandler = undefined
    }
  }

  destroy(): void {
    this.removeDocClickHandler()
    super.destroy()
  }
}