import { getDocsI18n } from '@docs/i18n'
import { showContextMenu } from '@lib'
import { ResponsiveModule, ResponsiveSize, SearchInput, SubModulesOpt } from 'wok-ui'
import type { FontAwesomeIconClass } from './font-awesome'
import { FontAwesomeIcon } from './font-awesome'
import './style.less'
import { ThemeManager } from './theme'

export interface PageInfo {
  name: string
  path: string
  title: string
  lang: string
  order?: number
  description?: string
  icon?: string
  /** 所属分类，用于侧边栏分组 */
  category?: string
}

interface DocsLayoutOpts {
  /** 当前语言 */
  lang: string
  /** 当前激活的页面名称 */
  activePage: string
  /** 全部语言的所有页面 */
  pages: PageInfo[]
}

/** 支持的语言列表 */
const SUPPORTED_LANGS: { code: string; label: string }[] = [
  { code: 'zh-CN', label: '中' },
  { code: 'en', label: 'EN' }
]

/**
 * 文档布局：Header（标题 + 搜索 + 语言切换 + 主题切换）+ 侧边栏菜单 + 内容区。
 * PC 端菜单常驻左侧，移动端抽屉式收起。
 */
export abstract class DocsLayout extends ResponsiveModule {
  private opts: DocsLayoutOpts
  private themeManager: ThemeManager

  constructor(opts: DocsLayoutOpts) {
    super('docs-layout')
    this.opts = opts
    this.themeManager = new ThemeManager()
    this.render()
  }

  // ===== 侧边栏滚动位置管理 =====

  /** 初始化菜单的滚动恢复和保存逻辑 */
  private initMenuScroll(menuEl: HTMLElement): void {
    // 滚动时保存
    menuEl.addEventListener(
      'scroll',
      () => {
        sessionStorage.setItem('docs-menu-scroll-top', String(menuEl.scrollTop))
      },
      { passive: true }
    )
    // 等 DOM 渲染完成后恢复
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const saved = sessionStorage.getItem('docs-menu-scroll-top')
        if (saved) {
          menuEl.scrollTop = parseInt(saved, 10)
        }
      })
    })
  }

  buildContent(_sizeInfo: { respSize: ResponsiveSize; windowWidth: number }): void {
    const { lang, activePage, pages } = this.opts
    const docsI18n = getDocsI18n()

    // 仅当前语言的页面，用于 sidebar
    const currentLangPages = pages
      .filter(p => p.lang === lang)
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))

    // ---- Header ----
    this.addChild({
      tag: 'header',
      classNames: 'docs-header',
      children: [
        // 左侧：站点标题
        {
          tag: 'div',
          classNames: 'docs-header-left',
          children: [
            {
              tag: 'a',
              classNames: 'docs-header-title',
              attrs: { href: `/${lang}/index.html` },
              innerText: 'wok-ui-ext'
            }
          ]
        },
        // 中间：搜索框（占位）
        {
          tag: 'div',
          classNames: 'docs-header-center',
          children: [
            new SearchInput({
              placeholder: docsI18n.buildMsg('docs-search-placeholder')
            })
          ]
        },
        // 右侧：语言切换 + 主题切换
        {
          tag: 'div',
          classNames: 'docs-header-right',
          children: [
            // 主题切换
            {
              tag: 'div',
              classNames: 'docs-header-theme',
              onClick: (e: MouseEvent) => {
                e.stopPropagation()
                this.showThemeMenu(e)
              },
              children: [
                new FontAwesomeIcon({
                  iconClass: 'fa-palette',
                  title: docsI18n.buildMsg('docs-theme-toggle-title')
                }),
                docsI18n.buildMsg('docs-theme-label')
              ]
            },
            // 语言切换
            {
              tag: 'div',
              classNames: 'docs-header-theme',
              onClick: (e: MouseEvent) => {
                e.stopPropagation()
                this.showLangMenu(e)
              },
              children: [
                new FontAwesomeIcon({
                  iconClass: 'fa-globe'
                }),
                docsI18n.buildMsg('docs-lang-label')
              ]
            },
            // GitHub
            {
              tag: 'a',
              classNames: 'docs-header-theme',
              attrs: {
                href: 'https://github.com/PeakTai/wok-ui-ext',
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              children: [
                new FontAwesomeIcon({
                  iconClass: 'fa-code'
                }),
                'GitHub'
              ]
            }
          ]
        }
      ]
    })

    // ---- Body（sidebar + 内容区，并排） ----
    this.addChild({
      tag: 'div',
      classNames: 'docs-body',
      children: [
        // 移动端遮罩
        {
          tag: 'div',
          classNames: 'docs-menu-overlay',
          onClick: () => this.closeMenu()
        },
        // 移动端菜单按钮
        {
          tag: 'div',
          classNames: 'docs-menu-toggle',
          onClick: () => this.toggleMenu()
        },
        // 侧边菜单（按 category 分组）
        {
          tag: 'nav',
          classNames: 'docs-menu',
          postHandle: el => this.initMenuScroll(el),
          children: this.buildMenuItems(currentLangPages, activePage)
        },
        // 内容区
        {
          tag: 'div',
          classNames: 'docs-content',
          children: this.buildMainContent()
        }
      ]
    })
  }

  // ===== 主题切换 =====

  /** 显示主题选择上下文菜单 */
  private showThemeMenu(e: MouseEvent): void {
    this.themeManager.showThemeMenu(e)
  }

  // ===== 语言切换 =====

  /** 显示语言选择上下文菜单 */
  private showLangMenu(e: MouseEvent): void {
    showContextMenu({
      evt: e,
      position: 'bottom',
      align: 'end',
      menu: SUPPORTED_LANGS.map(l => ({
        label: l.label === '中' ? '中文' : 'English',
        active: l.code === this.opts.lang,
        callback: () => {
          if (l.code === this.opts.lang) return
          this.switchLang(l.code, this.opts.activePage)
        }
      }))
    })
  }

  /**
   * 切换语言：跳转到目标语言的同名页面，若不存在则跳转到首页。
   */
  private switchLang(targetLang: string, currentName: string): void {
    const samePage = this.opts.pages.find(p => p.lang === targetLang && p.name === currentName)
    if (samePage) {
      location.href = '/' + samePage.path
    } else {
      location.href = `/${targetLang}/index.html`
    }
  }

  private toggleMenu(): void {
    this.el.classList.toggle('menu-open')
  }

  private closeMenu(): void {
    this.el.classList.remove('menu-open')
  }

  /**
   * 构建侧边栏菜单项，支持按 category 分组。
   */
  private buildMenuItems(pages: PageInfo[], activePage: string): SubModulesOpt {
    // 按 category 分组
    const categorized = new Map<string, PageInfo[]>()
    const uncategorized: PageInfo[] = []
    for (const p of pages) {
      if (p.category) {
        const list = categorized.get(p.category)
        if (list) list.push(p)
        else categorized.set(p.category, [p])
      } else {
        uncategorized.push(p)
      }
    }

    // 分类排序：以该类首个页面的 order 为准
    const sortedCats = [...categorized.entries()].sort(
      (a, b) => (a[1][0]?.order ?? Infinity) - (b[1][0]?.order ?? Infinity)
    )

    const result: SubModulesOpt[] = []

    // 无分类项
    for (const p of uncategorized) {
      result.push(this.createMenuItem(p, activePage))
    }

    // 分类组
    for (const [catName, catPages] of sortedCats) {
      result.push({
        tag: 'div',
        classNames: 'docs-menu-category',
        innerText: catName
      })
      for (const p of catPages) {
        result.push(this.createMenuItem(p, activePage, true))
      }
    }

    return result as SubModulesOpt
  }

  /**
   * 创建单个菜单项。
   * @param sub 是否为分类下的子项
   */
  private createMenuItem(p: PageInfo, activePage: string, sub?: boolean): SubModulesOpt {
    const classes = ['docs-menu-item']
    if (sub) classes.push('docs-menu-item-sub')
    if (p.name === activePage) classes.push('active')
    return {
      tag: 'a',
      classNames: classes,
      attrs: { href: '/' + p.path },
      children: p.icon
        ? [
            new FontAwesomeIcon({ iconClass: p.icon as FontAwesomeIconClass }),
            { tag: 'span', innerText: p.title }
          ]
        : { tag: 'span', innerText: p.title },
      onClick: () => this.closeMenu()
    }
  }

  protected abstract buildMainContent(): SubModulesOpt
}
