import { FullRenderingModule } from 'wok-ui'
import { showModal } from '../modal'
import { IconChevronLeft, IconChevronRight, IconTimes } from '../icons'
import './style.less'

export interface ImagePreviewItem {
  src: string
  alt?: string
}

/**
 * 图片预览模块
 *
 * 渲染图片、页码与导航控件，键盘导航和遮罩点击关闭等监听在模块生命周期内管理。
 */
class ImagePreview extends FullRenderingModule {
  private currentIdx: number
  private keydownListener?: (e: KeyboardEvent) => void
  private containerClickListener?: (e: MouseEvent) => void

  constructor(
    private readonly list: ImagePreviewItem[],
    initialIndex: number,
    private readonly onClose: () => void
  ) {
    super('wok-ui-ext-preview')
    this.currentIdx = initialIndex
    this.render()
  }

  buildContent(): void {
    // 关闭按钮（右上角 X）
    this.addChild({
      tag: 'button',
      classNames: ['wok-ui-ext-preview-close'],
      attrs: { 'aria-label': 'Close preview' },
      children: new IconTimes(),
      onClick: () => this.onClose()
    })

    // 图片容器
    this.addChild({
      classNames: ['wok-ui-ext-preview-body'],
      children: add => {
        if (this.list.length > 1) {
          add({
            classNames: ['wok-ui-ext-preview-counter'],
            children: `${this.currentIdx + 1} / ${this.list.length}`
          })
        }
        add({
          tag: 'img',
          classNames: ['wok-ui-ext-preview-img'],
          attrs: {
            src: this.list[this.currentIdx].src,
            alt: this.list[this.currentIdx].alt ?? ''
          }
        })
      }
    })

    // 左右导航箭头
    if (this.list.length > 1) {
      this.addChild(
        {
          tag: 'button',
          classNames: ['wok-ui-ext-preview-nav', 'wok-ui-ext-preview-nav-prev'],
          attrs: { 'aria-label': 'Previous image' },
          children: new IconChevronLeft(),
          onClick: () => this.navigate(-1)
        },
        {
          tag: 'button',
          classNames: ['wok-ui-ext-preview-nav', 'wok-ui-ext-preview-nav-next'],
          attrs: { 'aria-label': 'Next image' },
          children: new IconChevronRight(),
          onClick: () => this.navigate(1)
        }
      )
    }
  }

  private navigate(dir: -1 | 1) {
    const next = this.currentIdx + dir
    if (next < 0 || next >= this.list.length) return
    this.currentIdx = next
    this.render()
  }

  mount(parentEl: Element): void {
    super.mount(parentEl)
    // 键盘左右方向键导航
    this.keydownListener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        this.navigate(-1)
      } else if (e.key === 'ArrowRight') {
        this.navigate(1)
      }
    }
    document.addEventListener('keydown', this.keydownListener)
    // 点击遮罩关闭：容器（preview-active）占满全屏，点击容器空白区域即视为点击遮罩
    const container = this.el.parentElement
    if (container) {
      this.containerClickListener = (e: MouseEvent) => {
        if (e.target === container) {
          this.onClose()
        }
      }
      container.addEventListener('click', this.containerClickListener)
    }
  }

  destroy(): void {
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener)
      this.keydownListener = undefined
    }
    if (this.containerClickListener) {
      const container = this.el.parentElement
      container?.removeEventListener('click', this.containerClickListener)
      this.containerClickListener = undefined
    }
    super.destroy()
  }
}

/**
 * 打开图片预览
 *
 * 全屏遮罩查看图片，支持单张/多张预览、键盘导航。
 *
 * @example
 * ```ts
 * // 单张预览
 * previewImage({ src: 'https://...' })
 *
 * // 多张预览
 * previewImage([
 *   { src: 'https://...', alt: '图1' },
 *   { src: 'https://...', alt: '图2' }
 * ])
 *
 * // 指定初始索引
 * previewImage(images, 2)
 * ```
 */
export function previewImage(
  images: ImagePreviewItem | ImagePreviewItem[],
  initialIndex?: number
): void {
  const list = Array.isArray(images) ? images : [images]
  const handle = showModal({
    replaceByBody: true,
    className: 'wok-ui-ext-preview-active',
    body: new ImagePreview(list, initialIndex ?? 0, () => handle.close())
  })
}
