import { DivModule } from 'wok-ui'

/**
 * 时间选择控件：小时 + 分钟两个下拉框。
 */
export class TimePanel extends DivModule {
  private hourSelect!: HTMLSelectElement
  private minuteSelect!: HTMLSelectElement

  constructor(
    private readonly opts: {
      hour: number
      minute: number
      /** 分钟间隔，默认 1 */
      minuteStep?: number
      onChange?: (hour: number, minute: number) => void
    }
  ) {
    super('wok-ui-ext-time-panel')
    const step = opts.minuteStep ?? 1
    const hours = Array.from({ length: 24 }, (_, h) => h)
    const minutes: number[] = []
    for (let m = 0; m < 60; m += step) {
      minutes.push(m)
    }

    this.addChild(
      {
        tag: 'select',
        classNames: 'wok-ui-ext-time-select',
        attrs: { 'aria-label': '小时' },
        children: hours.map(h => ({
          tag: 'option',
          attrs: { value: String(h) },
          children: TimePanel.pad(h)
        })),
        postHandle: el => {
          this.hourSelect = el as HTMLSelectElement
          this.applyValue(this.hourSelect, opts.hour)
          this.hourSelect.addEventListener('change', () => this.emitChange())
        }
      },
      { classNames: 'wok-ui-ext-time-separator', children: ':' },
      {
        tag: 'select',
        classNames: 'wok-ui-ext-time-select',
        attrs: { 'aria-label': '分钟' },
        children: minutes.map(m => ({
          tag: 'option',
          attrs: { value: String(m) },
          children: TimePanel.pad(m)
        })),
        postHandle: el => {
          this.minuteSelect = el as HTMLSelectElement
          this.applyValue(this.minuteSelect, opts.minute)
          this.minuteSelect.addEventListener('change', () => this.emitChange())
        }
      }
    )
  }

  getValue(): { hour: number; minute: number } {
    return {
      hour: Number(this.hourSelect.value),
      minute: Number(this.minuteSelect.value)
    }
  }

  private emitChange(): void {
    const { hour, minute } = this.getValue()
    this.opts.onChange?.(hour, minute)
  }

  /** 目标值不在选项里（如分钟与 minuteStep 不对齐）时回落到第一项 */
  private applyValue(select: HTMLSelectElement, value: number): void {
    select.value = String(value)
    if (!select.value && select.options.length) {
      select.selectedIndex = 0
    }
  }

  private static pad(n: number): string {
    return String(n).padStart(2, '0')
  }
}
