import { DivModule, SubModulesOpt } from 'wok-ui'
import { IconChevronDown } from '../icons'
import './style.less'

export interface PanelOptions {
  /** 面板标题（字符串或自定义内容） */
  title: string | SubModulesOpt
  /** 面板内容 */
  content: SubModulesOpt
  /** 默认展开 */
  defaultOpen?: boolean
  /** 禁用 */
  disabled?: boolean
}

export interface CollapseOptions {
  /** 面板列表 */
  items: PanelOptions[]
  /** 手风琴模式（只展开一个） */
  accordion?: boolean
  /** 允许全部折叠（手风琴模式时，点击已展开的可关闭它） */
  collapsible?: boolean
  /** 无边框模式 */
  ghost?: boolean
  /** 展开/折叠回调（参数为当前展开的面板列表） */
  onChange?: (activePanels: Panel[]) => void
}

/**
 * 面板（可单独使用，也可作为 Collapse 的子项）
 *
 * @example
 * ```ts
 * // 单独使用
 * new Panel({ title: '基本信息', content: '内容...', defaultOpen: true })
 *
 * // 在 Collapse 中使用
 * new Collapse({
 *   items: [
 *     { title: '面板1', content: '内容1' },
 *     { title: '面板2', content: '内容2', defaultOpen: true }
 *   ],
 *   accordion: true
 * })
 * ```
 */
export class Panel extends DivModule {
  private _isOpen: boolean
  private bodyWrapperEl!: HTMLElement
  onToggle?: (panel: Panel, nextOpen: boolean) => void

  constructor(private opts: PanelOptions) {
    super('wok-ui-ext-panel')
    this._isOpen = opts.defaultOpen ?? false
    this.render()
  }

  private render(): void {
    // 头部
    this.addChild({
      classNames: ['wok-ui-ext-panel-header'],
      ...(this.opts.disabled ? {} : {}), // disabled class handled below
      preHandle: el => {
        el.addEventListener('click', () => this.toggle())
        if (this.opts.disabled) {
          el.classList.add('disabled')
        }
      },
      children: add => {
        // 标题
        if (typeof this.opts.title === 'string') {
          add({
            tag: 'div',
            classNames: 'wok-ui-ext-panel-header-title',
            innerText: this.opts.title
          })
        } else {
          add({
            tag: 'div',
            classNames: 'panel-header-title',
            children: this.opts.title
          })
        }
        // 箭头
        add({
          tag: 'div',
          classNames: 'wok-ui-ext-panel-header-arrow',
          children: new IconChevronDown()
        })
      }
    })

    // body 容器（用于 max-height 动画）
    this.addChild({
      classNames: 'wok-ui-ext-panel-body-wrapper',
      preHandle: el => {
        this.bodyWrapperEl = el as HTMLElement
      },
      children: {
        classNames: 'wok-ui-ext-panel-body',
        children: this.opts.content
      }
    })

    // 初始状态
    if (this._isOpen) {
      this.el.classList.add('open')
    }
  }

  /** 展开 */
  open(): void {
    if (this.opts.disabled || this._isOpen) return
    this._isOpen = true
    this.el.classList.add('open')
    this.syncBodyHeight()
  }

  /** 折叠 */
  close(): void {
    if (!this._isOpen) return
    this._isOpen = false
    this.el.classList.remove('open')
    this.bodyWrapperEl.style.maxHeight = '0'
  }

  /** 切换（由点击触发） */
  toggle(): void {
    if (this.opts.disabled) return
    const nextOpen = !this._isOpen
    if (this.onToggle) {
      // 由 Collapse 处理
      this.onToggle(this, nextOpen)
    } else {
      // 独立使用时直接切换
      if (nextOpen) this.open()
      else this.close()
    }
  }

  /** 当前是否展开 */
  isOpen(): boolean {
    return this._isOpen
  }

  /** 由 Collapse 直接设置状态（不触发回调） */
  setOpen(open: boolean): void {
    if (this.opts.disabled) return
    this._isOpen = open
    if (open) {
      this.el.classList.add('open')
      this.syncBodyHeight()
    } else {
      this.el.classList.remove('open')
      this.bodyWrapperEl.style.maxHeight = '0'
    }
  }

  private syncBodyHeight(): void {
    const body = this.bodyWrapperEl.querySelector('.wok-ui-ext-panel-body')
    if (body) {
      this.bodyWrapperEl.style.maxHeight = `${body.scrollHeight}px`
    }
  }
}

/**
 * 折叠面板组
 *
 * @example
 * ```ts
 * // 普通多开模式
 * new Collapse({
 *   items: [
 *     { title: '基本信息', content: new Form(...), defaultOpen: true },
 *     { title: '高级设置', content: '...' }
 *   ]
 * })
 *
 * // 手风琴模式
 * new Collapse({
 *   items: [...],
 *   accordion: true,
 *   collapsible: true // 允许全部折叠
 * })
 * ```
 */
export class Collapse extends DivModule {
  readonly panels: Panel[]
  private activePanels: Set<Panel>

  constructor(private opts: CollapseOptions) {
    super('wok-ui-ext-collapse')
    if (opts.ghost) {
      this.el.classList.add('ghost')
    }
    this.activePanels = new Set<Panel>()
    this.panels = []

    opts.items.forEach(item => {
      const panel = new Panel(item)
      this.panels.push(panel)
      this.addChild(panel)

      // 记录初始展开项
      if (item.defaultOpen) {
        this.activePanels.add(panel)
      }

      // 注册切换回调
      panel.onToggle = (p, nextOpen) => this.handleToggle(p, nextOpen)
    })
  }

  private handleToggle(panel: Panel, nextOpen: boolean): void {
    if (this.opts.accordion) {
      if (nextOpen) {
        // 关闭其他全部
        this.panels.forEach(p => {
          if (p !== panel) p.setOpen(false)
        })
        this.activePanels.clear()
        this.activePanels.add(panel)
        panel.setOpen(true)
      } else {
        // 关闭当前（仅允许全部折叠时才可关闭）
        if (this.opts.collapsible) {
          this.activePanels.delete(panel)
          panel.setOpen(false)
        }
      }
    } else {
      // 普通模式，自由切换
      if (nextOpen) {
        panel.open()
        this.activePanels.add(panel)
      } else {
        panel.close()
        this.activePanels.delete(panel)
      }
    }

    this.opts.onChange?.(Array.from(this.activePanels))
  }
}
