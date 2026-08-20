import { DivModule, SubModulesOpt } from 'wok-ui'
import { IconInput, resolveIcon, IconTimes } from '../icons'
import './style.less'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type TagSize = 'small' | 'default' | 'large'

/**
 * 标签组件
 */
export class Tag extends DivModule {
  private selected = false
  private readonly checkable: boolean
  private readonly disabled: boolean
  private readonly onClose?: (evt: MouseEvent) => void
  private readonly onChange?: (selected: boolean) => void
  private readonly onClick?: (evt: MouseEvent) => void

  /**
   * 标签组件，用于状态标记和分类展示。
   * @param opts
   * @param opts.text 标签内容
   * @param opts.type 语义类型：default 默认、primary 主要、success 成功、warning 警告、danger 危险、info 信息
   * @param opts.plain 是否描边样式（透明底 + 语义色边框），默认 false 为浅色底样式
   * @param opts.size 标签尺寸，默认 default
   * @param opts.round 是否圆角，默认 true
   * @param opts.closable 是否可关闭，显示关闭图标，点击后销毁标签并触发 onClose
   * @param opts.icon 标签图标，可选
   * @param opts.checkable 是否可选中，开启后点击切换选中状态
   * @param opts.selected 初始选中状态，仅 checkable 时生效，默认 false
   * @param opts.disabled 是否禁用，禁用后不可点击、不可切换、不可关闭
   * @param opts.onClick 点击回调
   * @param opts.onChange 选中状态变化回调，仅 checkable 时触发，参数为最新的选中状态
   * @param opts.onClose 关闭回调，点击关闭图标时触发，标签随后会被销毁
   */
  constructor(opts: {
    text: SubModulesOpt
    type?: TagType
    plain?: boolean
    size?: TagSize
    round?: boolean
    closable?: boolean
    icon?: IconInput
    checkable?: boolean
    selected?: boolean
    disabled?: boolean
    onClick?: (evt: MouseEvent) => void
    onChange?: (selected: boolean) => void
    onClose?: (evt: MouseEvent) => void
  }) {
    super('wok-ui-ext-tag')
    this.checkable = !!opts.checkable
    this.disabled = !!opts.disabled
    this.selected = !!opts.selected
    this.onClick = opts.onClick
    this.onChange = opts.onChange
    this.onClose = opts.onClose

    if (opts.type && opts.type !== 'default') {
      this.el.classList.add(`wok-ui-ext-tag-${opts.type}`)
    }
    if (opts.plain) {
      this.el.classList.add('plain')
    }
    if (opts.size && opts.size !== 'default') {
      this.el.classList.add(`wok-ui-ext-tag-${opts.size}`)
    }
    if (opts.round === false) {
      this.el.classList.add('no-round')
    }
    if (this.checkable) {
      this.el.classList.add('checkable')
    }
    if (this.selected) {
      this.el.classList.add('selected')
    }
    if (this.disabled) {
      this.el.classList.add('disabled')
    }

    if (opts.icon) {
      this.addChild({ classNames: 'wok-ui-ext-tag-icon', children: resolveIcon(opts.icon) })
    }

    this.addChild({ classNames: 'wok-ui-ext-tag-text', children: opts.text })

    if (opts.closable) {
      this.addChild({
        classNames: 'wok-ui-ext-tag-close',
        children: new IconTimes(),
        onClick: (evt: MouseEvent) => {
          evt.stopPropagation()
          if (this.disabled) {
            return
          }
          this.onClose?.(evt)
          this.destroy()
        }
      })
    }

    this.el.addEventListener('click', (evt: MouseEvent) => {
      if (this.disabled) {
        return
      }
      if (this.checkable) {
        this.selected = !this.selected
        this.updateSelected()
        this.onChange?.(this.selected)
      }
      this.onClick?.(evt)
    })
  }

  /** 设置选中状态，仅 checkable 标签生效 */
  setSelected(selected: boolean): void {
    if (!this.checkable || this.selected === selected) {
      return
    }
    this.selected = selected
    this.updateSelected()
  }

  /** 获取当前选中状态 */
  isSelected(): boolean {
    return this.selected
  }

  private updateSelected(): void {
    this.el.classList.toggle('selected', this.selected)
  }
}
