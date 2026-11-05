import { getDocsI18n } from '@docs/i18n'
import type { DocsI18nMessages } from '@docs/i18n'
import { applyTheme, getAllThemes, showPopover, Switch, type ThemeName } from '@lib'
import { DivModule } from 'wok-ui'
import type { FontAwesomeIconClass } from './font-awesome'

const ALL_THEMES = getAllThemes()
const STORAGE_KEY = 'theme'
const STORAGE_KEY_AUTO = 'theme-auto-dark'
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

const THEME_ICONS: Record<ThemeName, FontAwesomeIconClass> = {
  default: 'fa-cube',
  dark: 'fa-moon',
  orange: 'fa-fire',
  purple: 'fa-gem',
  green: 'fa-seedling',
  red: 'fa-heart'
}

const THEME_LABEL_KEYS: Record<ThemeName, keyof DocsI18nMessages> = {
  default: 'theme-tech-blue',
  dark: 'theme-night-sky',
  orange: 'theme-orange',
  purple: 'theme-purple',
  green: 'theme-green',
  red: 'theme-red'
}

/** 主题设置面板：主题列表 + 自动深色模式开关 */
class ThemePanel extends DivModule {
  private readonly itemEls = new Map<ThemeName, HTMLElement>()
  private readonly autoSwitch: Switch

  constructor(private readonly manager: ThemeManager) {
    super('docs-theme-panel')
    const docsI18n = getDocsI18n()

    // 主题列表
    for (const t of ALL_THEMES) {
      const item = document.createElement('div')
      item.className = 'docs-theme-item'

      const icon = document.createElement('i')
      icon.className = `fas ${THEME_ICONS[t]}`
      item.appendChild(icon)

      const label = document.createElement('span')
      label.innerText = docsI18n.buildMsg(THEME_LABEL_KEYS[t])
      item.appendChild(label)

      const check = document.createElement('i')
      check.className = 'fas fa-check docs-theme-check'
      item.appendChild(check)

      item.addEventListener('click', () => {
        this.manager.switch(t)
        this.refresh()
      })
      this.itemEls.set(t, item)
      this.addChild(item)
    }

    // 分割线
    const divider = document.createElement('div')
    divider.className = 'docs-theme-divider'
    this.addChild(divider)

    // 自动深色模式开关行
    this.autoSwitch = new Switch({
      checked: manager.autoDark,
      onChange: on => {
        this.manager.setAutoDark(on)
        this.refresh()
      }
    })
    this.addChild({
      tag: 'div',
      classNames: 'docs-theme-auto',
      children: [
        { tag: 'i', classNames: 'fas fa-adjust' },
        { tag: 'span', innerText: docsI18n.buildMsg('theme-auto-dark') },
        this.autoSwitch
      ]
    })

    this.refresh()
  }

  /** 刷新主题选中态与开关状态 */
  private refresh(): void {
    for (const [t, el] of this.itemEls) {
      el.classList.toggle('active', t === this.manager.current)
    }
    this.autoSwitch.setChecked(this.manager.autoDark)
  }
}

export class ThemeManager {
  private _theme: ThemeName
  private _autoDark: boolean
  private readonly media = window.matchMedia(DARK_MODE_QUERY)
  private readonly onSystemThemeChange = () => {
    if (this._autoDark) {
      applyTheme(this.effectiveTheme())
    }
  }

  constructor() {
    this._theme = this.loadTheme()
    this._autoDark = localStorage.getItem(STORAGE_KEY_AUTO) === '1'
    applyTheme(this.effectiveTheme())
    this.media.addEventListener('change', this.onSystemThemeChange)
  }

  get current(): ThemeName {
    return this._theme
  }

  /** 是否开启自动深色模式（跟随系统） */
  get autoDark(): boolean {
    return this._autoDark
  }

  /** 切换主题；手动选择时关闭自动深色模式 */
  switch(theme: ThemeName): void {
    this._theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
    if (this._autoDark) {
      this._autoDark = false
      localStorage.setItem(STORAGE_KEY_AUTO, '0')
    }
    applyTheme(theme)
  }

  /** 开关自动深色模式：开启后跟随系统 prefers-color-scheme 切换深色 */
  setAutoDark(on: boolean): void {
    this._autoDark = on
    localStorage.setItem(STORAGE_KEY_AUTO, on ? '1' : '0')
    applyTheme(this.effectiveTheme())
  }

  /** 在锚点元素下方弹出主题设置面板 */
  showThemePanel(target: HTMLElement): void {
    showPopover({
      target,
      placement: 'bottomRight',
      width: 200,
      content: new ThemePanel(this)
    })
  }

  /** 实际生效的主题：自动深色开启且系统为深色时强制 dark */
  private effectiveTheme(): ThemeName {
    return this._autoDark && this.media.matches ? 'dark' : this._theme
  }

  private loadTheme(): ThemeName {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    return (ALL_THEMES as ThemeName[]).includes(stored ?? ('' as ThemeName))
      ? stored!
      : 'default'
  }
}
