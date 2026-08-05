import { DivModule } from 'wok-ui'
import './style.less'
import { IconCircleNotch, IconImage } from '../icons'

export interface ImageOptions {
  src: string
  alt?: string
  /** object-fit 属性，默认 cover */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  width?: number | string
  height?: number | string
  /** 加载失败时的兜底图片 */
  fallbackSrc?: string
  /** 点击回调 */
  onClick?: () => void
}

/**
 * 图片组件
 *
 * 支持加载中占位、加载失败兜底、object-fit 控制。
 *
 * @example
 * ```ts
 * new Image({
 *   src: 'https://example.com/photo.jpg',
 *   fit: 'cover',
 *   width: 200,
 *   height: 150,
 *   fallbackSrc: '/assets/fallback.png',
 *   onClick: () => previewImage([{ src: 'https://...' }])
 * })
 * ```
 */
export class Image extends DivModule {
  constructor(private opts: ImageOptions) {
    super('wok-ui-ext-image')

    const { src, alt, fit, width, height, onClick } = opts

    // 尺寸
    if (width) {
      this.el.style.width = typeof width === 'number' ? `${width}px` : width
    }
    if (height) {
      this.el.style.height = typeof height === 'number' ? `${height}px` : height
    }
    // 点击
    if (onClick) {
      this.el.addEventListener('click', onClick)
      this.el.style.cursor = 'pointer'
    }

    // 加载中占位（默认可见）
    this.addChild({
      classNames: ['wok-ui-ext-image-placeholder'],
      children: new IconCircleNotch()
    })

    // 加载失败占位（默认隐藏）
    this.addChild({
      classNames: ['wok-ui-ext-image-error'],
      children: new IconImage()
    })

    // 真实图片
    this.addChild({
      tag: 'img',
      classNames: ['wok-ui-ext-image-img'],
      attrs: {
        src,
        alt: alt ?? ''
      },
      style: {
        objectFit: fit || undefined
      },
      preHandle: el => {
        const img = el as HTMLImageElement
        img.addEventListener('load', () => {
          this.el.classList.add('loaded')
        })
        img.addEventListener('error', () => {
          this.handleError()
        })
      }
    })
  }

  private handleError(): void {
    if (this.opts.fallbackSrc) {
      // 有 fallbackSrc，替换 img 的 src 再试一次
      const imgEl = this.el.querySelector('img')
      if (imgEl) {
        imgEl.src = this.opts.fallbackSrc
        // fallback 也失败则显示错误状态
        imgEl.addEventListener('error', () => {
          this.el.classList.add('error')
        })
        imgEl.addEventListener('load', () => {
          this.el.classList.add('loaded')
        })
      }
    } else {
      this.el.classList.add('error')
    }
  }

  /** 更新图片 src */
  setSrc(src: string): void {
    this.el.classList.remove('loaded', 'error')
    const imgEl = this.el.querySelector('img')
    if (imgEl) {
      imgEl.src = src
    }
  }
}
