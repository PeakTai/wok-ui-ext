import { FullRenderingModule, SubModulesOpt } from 'wok-ui'
import {
  CalendarDay,
  compareDate,
  getCalendarDays,
  isSameDay,
  MONTH_NAMES,
  WEEK_DAYS
} from './date-utils'

/**
 * 共享日历面板组件。
 * 负责月/年导航和 42 格日历渲染，不关心单选还是范围选择。
 */
export class CalendarPanel extends FullRenderingModule {
  private year: number
  private month: number
  private readonly today: Date
  private readonly selectedDates: () => Date[]
  private readonly hoveredDate: () => Date | undefined
  private readonly disabledDate?: (date: Date) => boolean
  private readonly onDayClick: (date: Date) => void
  private readonly onDayHover?: (date: Date) => void
  private readonly onMonthChange?: (year: number, month: number) => void

  constructor(opts: {
    year: number
    month: number
    selectedDates: () => Date[]
    hoveredDate?: () => Date | undefined
    today?: Date
    disabledDate?: (date: Date) => boolean
    onDayClick: (date: Date) => void
    onDayHover?: (date: Date) => void
    onMonthChange?: (year: number, month: number) => void
  }) {
    super('wok-ui-ext-calendar-panel')
    this.year = opts.year
    this.month = opts.month
    this.today = opts.today ?? new Date()
    this.selectedDates = opts.selectedDates
    this.hoveredDate = opts.hoveredDate ?? (() => undefined)
    this.disabledDate = opts.disabledDate
    this.onDayClick = opts.onDayClick
    this.onDayHover = opts.onDayHover
    this.onMonthChange = opts.onMonthChange
    this.render()
  }

  protected buildContent(): void {
    this.addChild(this.buildHeader())
    this.addChild(this.buildWeekdays())
    this.addChild(this.buildGrid())
  }

  private buildHeader(): SubModulesOpt {
    return {
      classNames: 'wok-ui-ext-calendar-header',
      children: [
        {
          classNames: 'wok-ui-ext-calendar-nav-btn',
          children: '◀',
          onClick: () => this.goToPrevMonth()
        },
        {
          classNames: 'wok-ui-ext-calendar-month-label',
          children: `${this.year}年 ${MONTH_NAMES[this.month]}`
        },
        {
          classNames: 'wok-ui-ext-calendar-nav-btn',
          children: '▶',
          onClick: () => this.goToNextMonth()
        }
      ]
    }
  }

  private buildWeekdays(): SubModulesOpt {
    return {
      classNames: 'wok-ui-ext-calendar-weekdays',
      children: WEEK_DAYS.map(day => ({
        classNames: 'wok-ui-ext-calendar-weekday',
        children: day
      }))
    }
  }

  private buildGrid(): SubModulesOpt {
    const days = getCalendarDays(this.year, this.month)
    const selected = this.selectedDates()
    const hovered = this.hoveredDate()

    return {
      classNames: 'wok-ui-ext-calendar-grid',
      children: add => {
        for (const day of days) {
          add(this.buildDayCell(day, selected, hovered))
        }
      }
    }
  }

  private buildDayCell(
    day: CalendarDay,
    selected: Date[],
    hovered: Date | undefined
  ): SubModulesOpt {
    const classNames = ['wok-ui-ext-calendar-day']
    const isToday = isSameDay(day.date, this.today)
    const isDisabled = this.disabledDate?.(day.date) ?? false

    if (!day.isCurrentMonth) {
      classNames.push('adjacent-month')
    }
    if (isToday) {
      classNames.push('today')
    }
    if (isDisabled) {
      classNames.push('disabled')
    }

    // 选中状态（单选或范围两端）
    const selectedIdx = selected.findIndex(s => isSameDay(s, day.date))
    if (selectedIdx !== -1) {
      classNames.push('selected')
      if (selected.length > 1) {
        classNames.push(selectedIdx === 0 ? 'range-start' : 'range-end')
      }
    }

    // 范围内中间状态（仅范围选择）
    if (selected.length === 2 && !isDisabled) {
      const [s1, s2] = selected
      const cmp1 = compareDate(day.date, s1)
      const cmp2 = compareDate(day.date, s2)
      if (cmp1 > 0 && cmp2 < 0) {
        classNames.push('in-range')
      }
    }

    // hover 范围预览
    if (
      hovered &&
      selected.length === 1 &&
      !isDisabled &&
      classNames.indexOf('selected') === -1
    ) {
      const cmp1 = compareDate(day.date, selected[0])
      const cmp2 = compareDate(day.date, hovered)
      if ((cmp1 > 0 && cmp2 < 0) || (cmp1 < 0 && cmp2 > 0)) {
        classNames.push('in-range-hover')
      }
    }

    return {
      classNames,
      children: String(day.day),
      onClick: isDisabled ? undefined : () => this.onDayClick(day.date),
      postHandle: el => {
        if (!isDisabled && this.onDayHover) {
          el.addEventListener('mouseenter', () => this.onDayHover!(day.date))
        }
      }
    }
  }

  private goToPrevMonth(): void {
    if (this.month === 0) {
      this.year -= 1
      this.month = 11
    } else {
      this.month -= 1
    }
    this.render()
    this.onMonthChange?.(this.year, this.month)
  }

  private goToNextMonth(): void {
    if (this.month === 11) {
      this.year += 1
      this.month = 0
    } else {
      this.month += 1
    }
    this.render()
    this.onMonthChange?.(this.year, this.month)
  }

  /**
   * 公开的刷新方法，供外部强制重绘面板（如 hover 预览变化）。
   */
  refresh(): void {
    this.render()
  }
}
