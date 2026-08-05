import { RemoteSvgIcon } from 'wok-ui'
import { getDocsI18n } from '@docs/i18n'
import type { DocsI18nMessages } from '@docs/i18n'
import { applyTheme, getAllThemes, showContextMenu, type ThemeName } from '@lib'

const ALL_THEMES = getAllThemes()
const STORAGE_KEY = 'theme'
const THEME_ICON_URL: Record<ThemeName, string> = {
  default: '/vendor/fontawesome-5.15.4/svgs/solid/cube.svg',
  dark: '/vendor/fontawesome-5.15.4/svgs/solid/moon.svg',
  orange: '/vendor/fontawesome-5.15.4/svgs/solid/fire.svg',
  purple: '/vendor/fontawesome-5.15.4/svgs/regular/gem.svg',
  green: '/vendor/fontawesome-5.15.4/svgs/solid/tree.svg',
  red: '/vendor/fontawesome-5.15.4/svgs/solid/heart.svg'
}

const THEME_LABEL_KEYS: Record<ThemeName, keyof DocsI18nMessages> = {
  default: 'theme-tech-blue',
  dark: 'theme-night-sky',
  orange: 'theme-orange',
  purple: 'theme-purple',
  green: 'theme-green',
  red: 'theme-red'
}

export class ThemeManager {
  private _theme: ThemeName

  constructor() {
    this._theme = this.load()
  }

  get current(): ThemeName {
    return this._theme
  }

  /** 切换主题 */
  switch(theme: ThemeName): void {
    this._theme = theme
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }

  /** 在事件位置弹出主题选择菜单 */
  showThemeMenu(e: MouseEvent): void {
    showContextMenu({
      evt: e,
      position:'bottom',
      align:'end',
      menu: ALL_THEMES.map(t => ({
        icon: new RemoteSvgIcon({ iconUrl: THEME_ICON_URL[t] }),
        label: getDocsI18n().buildMsg(THEME_LABEL_KEYS[t]),
        active: t === this._theme,
        callback: () => this.switch(t)
      }))
    })
  }

  private load(): ThemeName {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    const theme = (ALL_THEMES as ThemeName[]).includes(stored ?? ('' as ThemeName))
      ? stored!
      : 'default'
    applyTheme(theme)
    return theme
  }
}
