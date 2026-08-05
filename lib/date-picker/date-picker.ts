import { FullRenderingModule } from 'wok-ui'
import { CalendarPanel } from './calendar-panel'
import { formatDate, compareDate } from './date-utils'

export class DatePicker extends FullRenderingModule {
  private value?: Date
  private popupOpen = false
  private panelYear: number
  private panelMonth: number
  private docClickHandler?: (evt: MouseEvent) => void

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
    const today = new Date()
    const panel = new CalendarPanel({
      year: this.panelYear,
      month: this.panelMonth,
      selectedDates: () => (this.value ? [this.value] : []),
      today,
      disabledDate: this.opts.disabledDate,
      onDayClick: date => this.selectDate(date),
      onMonthChange: (year, month) => {
        this.panelYear = year
        this.panelMonth = month
      }
    })

    this.addChild(
      {
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
      },
      {
        classNames: ['wok-ui-ext-date-picker-popup', this.popupOpen ? 'open' : ''],
        children: this.popupOpen ? panel : []
      }
    )
  }

  private selectDate(date: Date): void {
    if (this.opts.disabledDate?.(date)) return

    this.value = date
    this.popupOpen = false
    this.render()
    this.opts.onChange?.(date)
  }

  private togglePopup(): void {
    this.popupOpen = !this.popupOpen
    if (this.popupOpen) {
      const target = this.value ?? new Date()
      this.panelYear = target.getFullYear()
      this.panelMonth = target.getMonth()
      this.setupDocClickHandler()
    } else {
      this.removeDocClickHandler()
    }
    this.render()
  }

  private setupDocClickHandler(): void {
    if (this.docClickHandler) return
    this.docClickHandler = (evt: MouseEvent) => {
      if (!this.el.contains(evt.target as Node)) {
        this.popupOpen = false
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