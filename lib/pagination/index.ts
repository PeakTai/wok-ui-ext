import { FullRenderingModule } from 'wok-ui'
import './style.less'
import { getWokUiExtI18n } from '../i18n'
import { IconChevronLeft, IconChevronRight } from '../icons'

/**
 * 分页组件
 */
export class Pagination extends FullRenderingModule {
  private pn: number

  /**
   * 分页组件
   * @param opts
   * @param opts.total 总条数
   * @param opts.pz 每页条数
   * @param opts.pn 当前页码
   * @param opts.simple 简洁模式，仅显示上下页 + 页码信息（默认 false）
   * @param opts.onChange 分页回调
   */
  constructor(
    private opts: {
      total: number
      pz: number
      pn: number
      simple?: boolean
      onChange: (pn: number, pz: number) => void
    }
  ) {
    super()
    this.el.classList.add('wok-ui-ext-pagination')
    this.el.setAttribute('role', 'navigation')
    this.el.setAttribute('aria-label', 'Pagination')
    if (opts.simple) {
      this.el.classList.add('wok-ui-ext-pagination-simple')
    }
    this.pn = opts.pn
    this.render()
  }

  private calcPageNumbers(): Array<number | '...' | '<' | '>'> {
    const { total, pz } = this.opts
    const pn = this.pn
    const totalPages = Math.ceil(total / pz)
    const maxPagesToShow = 5
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2)
    const startPage = Math.max(1, pn - halfMaxPagesToShow)
    const endPage = Math.min(totalPages, pn + halfMaxPagesToShow)
    const pageNumbers: Array<number | '...' | '<' | '>'> = []
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
    if (startPage > 1) {
      pageNumbers.unshift('...')
      pageNumbers.unshift(1)
    }
    if (endPage < totalPages) {
      pageNumbers.push('...')
      pageNumbers.push(totalPages)
    }
    if (pn > 1) {
      pageNumbers.unshift('<')
    }
    if (pn < totalPages) {
      pageNumbers.push('>')
    }
    return pageNumbers
  }

  protected buildContent(): void {
    if (this.opts.simple) {
      this.buildSimpleContent()
      return
    }
    this.buildFullContent()
  }

  /** 简洁模式：仅上下页 + 页码信息 */
  private buildSimpleContent(): void {
    const i18n = getWokUiExtI18n()
    const { total, pz } = this.opts
    const totalPages = Math.ceil(total / pz)

    if (totalPages <= 0) {
      return
    }

    const isFirst = this.pn <= 1
    const isLast = this.pn >= totalPages

    this.addChild({
      tag: 'button',
      classNames: ['wok-ui-ext-page-item', 'prev'],
      attrs: {
        type: 'button',
        'aria-label': i18n.buildMsg('pagination-prev-page'),
        disabled: isFirst ? true : undefined
      },
      children: new IconChevronLeft(),
      preHandle: el => {
        if (isFirst) {
          el.classList.add('disabled')
        }
      },
      onClick: () => {
        if (this.pn > 1) {
          this.pn--
          this.render()
          this.opts.onChange(this.pn, this.opts.pz)
        }
      }
    })

    this.addChild({
      classNames: ['wok-ui-ext-page-info'],
      attrs: {
        'aria-current': 'page'
      },
      children: i18n.buildMsg('pagination-simple-format', `${this.pn}`, `${totalPages}`)
    })

    this.addChild({
      tag: 'button',
      classNames: ['wok-ui-ext-page-item', 'next'],
      attrs: {
        type: 'button',
        'aria-label': i18n.buildMsg('pagination-next-page'),
        disabled: isLast ? true : undefined
      },
      children: new IconChevronRight(),
      preHandle: el => {
        if (isLast) {
          el.classList.add('disabled')
        }
      },
      onClick: () => {
        if (this.pn < totalPages) {
          this.pn++
          this.render()
          this.opts.onChange(this.pn, this.opts.pz)
        }
      }
    })
  }

  /** 完整模式：页码按钮 + 省略号 */
  private buildFullContent(): void {
    const i18n = getWokUiExtI18n()
    const { total, pz } = this.opts
    const totalPages = Math.ceil(total / pz)

    this.addChild({
      classNames: ['wok-ui-ext-page-total'],
      children: i18n.buildMsg('pagination-total', `${total}`)
    })

    if (totalPages <= 1) {
      return
    }

    const pageNumbers = this.calcPageNumbers()
    for (const page of pageNumbers) {
      const isPrev = page === '<'
      const isNext = page === '>'
      const isEllipsis = page === '...'
      const pageNumber = typeof page === 'number' ? page : undefined
      const isActive = pageNumber === this.pn

      let label: string
      if (isPrev) {
        label = i18n.buildMsg('pagination-prev-page')
      } else if (isNext) {
        label = i18n.buildMsg('pagination-next-page')
      } else if (pageNumber !== undefined) {
        label = i18n.buildMsg('pagination-page', `${pageNumber}`)
      } else {
        label = ''
      }

      this.addChild({
        tag: 'button',
        classNames: ['wok-ui-ext-page-item'],
        attrs: {
          type: 'button',
          'aria-label': label,
          'aria-current': isActive ? 'page' : undefined,
          disabled: isEllipsis ? true : undefined
        },
        children: add => {
          if (isPrev) {
            add(new IconChevronLeft())
          } else if (isNext) {
            add(new IconChevronRight())
          } else if (pageNumber !== undefined) {
            add(`${pageNumber}`)
          } else {
            add('...')
          }
        },
        preHandle: el => {
          if (isActive) {
            el.classList.add('active')
          }
          if (isEllipsis) {
            el.classList.add('disabled')
          }
        },
        onClick: () => {
          if (isEllipsis) {
            return
          }
          if (isPrev) {
            this.pn = this.pn - 1
            if (this.pn < 1) {
              return
            }
          } else if (isNext) {
            this.pn = this.pn + 1
            if (this.pn > totalPages) {
              return
            }
          } else if (pageNumber !== undefined) {
            this.pn = pageNumber
          }
          this.render()
          this.opts.onChange(this.pn, this.opts.pz)
        }
      })
    }
  }
}
