import { Module } from 'wok-ui'
import './style.less'

/**
 * 文本对齐方式
 */
export type TextAlign = 'left' | 'center' | 'right'

/**
 * 文本组件基础选项
 */
interface TextOptions {
  text: string
  align?: TextAlign
  onClick?: (evt: MouseEvent) => void
}

/**
 * 标题组件基础类 - 使用 heading 元素 (h1-h6)
 */
abstract class HeadingComponent extends Module {
  constructor(
    tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
    className: string,
    opts: string | TextOptions
  ) {
    super(document.createElement(tagName))
    const options = typeof opts === 'string' ? { text: opts } : opts
    this.el.classList.add(className)
    this.el.innerText = options.text
    if (options.align) {
      this.el.style.textAlign = options.align
    }
    if (options.onClick) {
      this.el.addEventListener('click', options.onClick)
      this.el.classList.add('clickable')
    }
  }
}

/**
 * 内联文本组件基础类 - 使用 span 元素
 */
abstract class SpanComponent extends Module {
  constructor(className: string, opts: string | TextOptions) {
    super(document.createElement('span'))
    const options = typeof opts === 'string' ? { text: opts } : opts
    this.el.classList.add(className)
    this.el.innerText = options.text
    if (options.align) {
      this.el.style.textAlign = options.align
    }
    if (options.onClick) {
      this.el.addEventListener('click', options.onClick)
      this.el.classList.add('clickable')
    }
  }
}

/**
 * 大标题组件 - H1
 * 用于页面主标题、模块标题
 */
export class TitleLarge extends HeadingComponent {
  constructor(opts: string | TextOptions) {
    super('h1', 'wok-ui-ext-text-title-large', opts)
  }
}

/**
 * 标准标题组件 - H2
 * 用于卡片标题、区域标题
 */
export class Title extends HeadingComponent {
  constructor(opts: string | TextOptions) {
    super('h2', 'wok-ui-ext-text-title', opts)
  }
}

/**
 * 副标题组件 - H3
 * 用于标题辅助说明、分类标题
 */
export class Subtitle extends HeadingComponent {
  constructor(opts: string | TextOptions) {
    super('h3', 'wok-ui-ext-text-subtitle', opts)
  }
}

/**
 * 正文文本组件 - span
 * 用于主要内容、描述文字
 */
export class BodyText extends SpanComponent {
  constructor(opts: string | TextOptions) {
    super('wok-ui-ext-text-body', opts)
  }
}

/**
 * 次要文本组件 - span
 * 用于辅助信息、说明文字
 */
export class SecondaryText extends SpanComponent {
  constructor(opts: string | TextOptions) {
    super('wok-ui-ext-text-secondary', opts)
  }
}

/**
 * 三级文本组件 - span
 * 用于备注、附加信息
 */
export class TertiaryText extends SpanComponent {
  constructor(opts: string | TextOptions) {
    super('wok-ui-ext-text-tertiary', opts)
  }
}

/**
 * 小型文本组件 - span
 * 用于标签、时间戳
 */
export class SmallText extends SpanComponent {
  constructor(opts: string | TextOptions) {
    super('wok-ui-ext-text-small', opts)
  }
}

/**
 * 超小文本组件 - span
 * 用于角标、提示文字
 */
export class TinyText extends SpanComponent {
  constructor(opts: string | TextOptions) {
    super('wok-ui-ext-text-tiny', opts)
  }
}

/**
 * 弱化文本组件 - span
 * 用于占位符提示、非重要信息
 */
export class MutedText extends SpanComponent {
  constructor(opts: string | TextOptions) {
    super('wok-ui-ext-text-muted', opts)
  }
}

/**
 * 禁用文本组件 - span
 * 用于禁用状态的文字显示
 */
export class DisabledText extends Module {
  constructor(opts: string | Omit<TextOptions, 'onClick'>) {
    super(document.createElement('span'))
    const options = typeof opts === 'string' ? { text: opts } : opts
    this.el.classList.add('wok-ui-ext-text-disabled')
    this.el.innerText = options.text
    if (options.align) {
      this.el.style.textAlign = options.align
    }
  }
}

/**
 * 强调文本组件 - span
 * 用于重点内容突出显示
 */
export class StrongText extends SpanComponent {
  constructor(opts: string | TextOptions) {
    super('wok-ui-ext-text-strong', opts)
  }
}
