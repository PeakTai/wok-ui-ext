import { DivModule } from 'wok-ui'
import './style.less'

/**
 * 开关组件
 */
export class Switch extends DivModule {
  private checked = false
  private disabled: boolean

  constructor(
    private opts: {
      /**
       * 开关标签
       */
      label?: string
      /**
       * 是否默认选中
       */
      checked?: boolean
      /**
       * 切换回调
       */
      onChange?: (checked: boolean) => void
      /**
       * 是否禁用
       */
      disabled?: boolean
    }
  ) {
    super()
    this.disabled = !!opts.disabled
    this.checked = !!opts.checked
    this.el.classList.add('wok-ui-ext-switch')
    if (this.checked) {
      this.el.classList.add('checked')
    }
    if (this.disabled) {
      this.el.classList.add('disabled')
    }

    const switchBtn = document.createElement('button')
    switchBtn.className = 'wok-ui-ext-switch-button'
    switchBtn.type = 'button'
    switchBtn.setAttribute('role', 'switch')
    switchBtn.setAttribute('aria-checked', this.checked ? 'true' : 'false')
    if (this.disabled) {
      switchBtn.disabled = true
      switchBtn.setAttribute('aria-disabled', 'true')
    }
    switchBtn.appendChild(document.createElement('span'))
    switchBtn.addEventListener('click', () => this.toggle())
    switchBtn.addEventListener('keydown', (ev) => {
      if (ev.key === ' ' || ev.key === 'Enter') {
        ev.preventDefault()
        this.toggle()
      }
    })
    this.addChild(switchBtn)

    if (opts.label) {
      this.addChild({
        tag: 'label',
        classNames: 'wok-ui-ext-switch-label',
        attrs: {
          for: undefined
        },
        children: opts.label
      })
    }
  }

  private toggle(): void {
    if (this.disabled) {
      return
    }
    this.checked = !this.checked
    this.update()
    this.opts.onChange?.(this.checked)
  }

  private update(): void {
    this.el.classList.toggle('checked', this.checked)
    const btn = this.el.querySelector('.wok-ui-ext-switch-button') as HTMLButtonElement | null
    if (btn) {
      btn.setAttribute('aria-checked', this.checked ? 'true' : 'false')
    }
  }

  setChecked(checked: boolean): void {
    if (this.checked === checked) {
      return
    }
    this.checked = checked
    this.update()
  }

  isChecked(): boolean {
    return this.checked
  }
}
