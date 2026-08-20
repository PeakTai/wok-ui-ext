/**
 * 获取指定年月的天数
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * 获取指定年月第一天是星期几（0=周日, 6=周六）
 */
export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

/**
 * 判断两个日期是否是同一天
 */
export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

/**
 * 判断 date 是否在 [start, end] 范围内（含边界）
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime()
  return t >= start.getTime() && t <= end.getTime()
}

/**
 * 比较两个日期：返回负数表示 a < b，0 表示相等，正数表示 a > b
 */
export function compareDate(a: Date, b: Date): number {
  return a.getTime() - b.getTime()
}

/**
 * 日期增加/减少月份
 */
export function addMonths(date: Date, n: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + n)
  return d
}

/**
 * 格式化日期为 yyyy-MM-dd
 */
export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * 格式化日期为 yyyy年M月d日
 */
export function formatDateCN(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

/**
 * 将 min / max / disabledDate 合并为一个统一的日期禁用回调。
 * min 和 max 支持传 Date 或带错误信息的对象。
 */
export function combineDateConstraints(
  min?: Date | { min: Date; errMsg: string },
  max?: Date | { max: Date; errMsg: string },
  disabledDate?: (date: Date) => boolean
): (date: Date) => boolean {
  const minDate = min instanceof Date ? min : min?.min
  const maxDate = max instanceof Date ? max : max?.max
  return (date: Date) => {
    if (minDate && compareDate(date, minDate) < 0) return true
    if (maxDate && compareDate(date, maxDate) > 0) return true
    return disabledDate?.(date) ?? false
  }
}

/**
 * 解析 yyyy-MM-dd 字符串为 Date
 */
export function parseDate(str: string): Date | null {
  const match = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (!match) return null
  const d = new Date(+match[1], +match[2] - 1, +match[3])
  if (isNaN(d.getTime())) return null
  return d
}

/**
 * 生成日历网格数据，固定 42 个格子（6行×7列）
 */
export interface CalendarDay {
  date: Date
  /** 该日期实际所属的月份（可能与当前视图月份不同） */
  month: number
  day: number
  /** 是否属于当前视图月份 */
  isCurrentMonth: boolean
}

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)
  const days: CalendarDay[] = []

  // 填充上月末尾
  const prevMonthDays = getDaysInMonth(year, month - 1) // month-1 可能为 -1，但 Date 会自动处理
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    days.push({
      date: new Date(prevYear, prevMonth, day),
      month: prevMonth,
      day,
      isCurrentMonth: false
    })
  }

  // 当月
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: new Date(year, month, d),
      month,
      day: d,
      isCurrentMonth: true
    })
  }

  // 填充下月开头
  const remaining = 42 - days.length
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  for (let d = 1; d <= remaining; d++) {
    days.push({
      date: new Date(nextYear, nextMonth, d),
      month: nextMonth,
      day: d,
      isCurrentMonth: false
    })
  }

  return days
}

/** 中文星期缩写 */
export const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

/** 中文月份名 */
export const MONTH_NAMES = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
]
