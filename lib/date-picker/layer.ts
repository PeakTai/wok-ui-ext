import { FloatingLayer } from '../floating-layer'
import { CalendarPanel } from './calendar-panel'

/**
 * 日期选择浮层。挂载到 body，由 FloatingLayer 提供定位、滚动跟随、自动关闭。
 * 单选包含一个日历面板，范围选择包含两个。
 */
export class DatePickerLayer extends FloatingLayer {
  private readonly panels: CalendarPanel[]

  constructor(opts: {
    target: HTMLElement
    panels: CalendarPanel[]
    onClose?: () => void
  }) {
    super({ target: opts.target, placement: 'bottomLeft', offset: 6, onClose: opts.onClose })
    this.el.classList.add('wok-ui-ext-date-picker-popup')
    if (opts.panels.length > 1) {
      this.el.classList.add('wok-ui-ext-date-range-popup')
    }
    this.panels = opts.panels
  }

  protected buildContent(): void {
    if (this.panels.length > 1) {
      this.panels.forEach(panel => {
        this.addChild({
          classNames: 'wok-ui-ext-date-range-panel',
          children: panel
        })
      })
    } else {
      this.addChild(this.panels[0])
    }
  }

  /** 重绘面板，用于切换月份等需要整体重新构建内容的场景 */
  refresh(): void {
    this.panels.forEach(p => p.refresh())
  }

  /** 局部更新每个面板的 hover 预览 class */
  setHoveredDate(hovered: Date | undefined): void {
    this.panels.forEach(p => p.setHoveredDate(hovered))
  }
}
