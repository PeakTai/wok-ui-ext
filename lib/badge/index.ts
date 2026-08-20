import { DivModule, SubModulesOpt } from 'wok-ui'
import './style.less'

export type BadgeType = 'danger' | 'primary' | 'success' | 'warning' | 'info'

/**
 * 徽标组件
 */
export class Badge extends DivModule {
  /**
   * 徽标组件，用于在图标/头像等元素右上角标记数量或红点，也可以独立显示。
   * @param opts
   * @param opts.count 显示数量
   * @param opts.max 数量封顶值，count 超过 max 时显示 `max+`，默认 99
   * @param opts.dot 纯红点模式，不显示数字，默认 false
   * @param opts.type 徽标颜色，默认 danger
   * @param opts.showZero count 为 0 时是否显示，默认 false
   * @param opts.hidden 是否隐藏徽标，默认 false
   * @param opts.offset 位置偏移 [水平, 垂直]，默认右上角
   * @param opts.children 被包裹的内容（图标、头像等），不传时徽标独立显示
   * @param opts.onClick 点击徽标回调
   */
  constructor(opts: {
    count?: number
    max?: number
    dot?: boolean
    type?: BadgeType
    showZero?: boolean
    hidden?: boolean
    offset?: [number, number]
    children?: SubModulesOpt
    onClick?: (evt: MouseEvent) => void
  }) {
    super('wok-ui-ext-badge')
    const type = opts.type ?? 'danger'
    const max = opts.max ?? 99
    const count = opts.count ?? 0
    const dot = !!opts.dot
    // 显示逻辑：未隐藏，且（红点模式无条件显示，或 showZero，或 count > 0）
    const visible = !opts.hidden && (dot || opts.showZero || count > 0)
    const displayText = dot ? '' : count > max ? `${max}+` : `${count}`

    if (opts.children) {
      // 包裹模式：角标绝对定位在子元素右上角
      this.addChild(opts.children)
      if (visible) {
        this.addChild({
          tag: 'span',
          classNames: ['wok-ui-ext-badge-sup', `wok-ui-ext-badge-${type}`, dot ? 'dot' : ''],
          innerText: displayText,
          onClick: opts.onClick
        })
        if (opts.offset) {
          const supEl = this.el.querySelector('.wok-ui-ext-badge-sup') as HTMLElement | null
          if (supEl) {
            supEl.style.transform = `translate(calc(50% + ${opts.offset[0]}px), calc(-50% + ${opts.offset[1]}px))`
          }
        }
      }
    } else if (visible) {
      // 独立模式：徽标自身就是角标
      this.el.classList.add(`wok-ui-ext-badge-${type}`, 'standalone')
      if (dot) {
        this.el.classList.add('dot')
      }
      if (displayText) {
        this.el.innerText = displayText
      }
      if (opts.onClick) {
        this.el.addEventListener('click', opts.onClick)
      }
    }
  }
}
