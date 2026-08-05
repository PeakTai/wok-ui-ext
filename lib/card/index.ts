import { DivModule, SubModulesOpt } from 'wok-ui'
import './style.less'

/**
 * 通用卡片组件
 */
export class Card extends DivModule {
  constructor(
    opts: {
      /**
       * 卡片头部内容
       */
      header?: SubModulesOpt
      /**
       * 卡片主体内容
       */
      content: SubModulesOpt
      /**
       * 卡片脚部内容
       */
      footer?: SubModulesOpt
      /**
       * 额外的 CSS 类名
       */
      classNames?: string[]
    }
  ) {
    super('wok-ui-ext-card')
    if (opts.classNames) {
      this.el.classList.add(...opts.classNames)
    }
    if (opts.header) {
      this.addChild({
        classNames: 'wok-ui-ext-card-header',
        children: opts.header
      })
    }
    this.addChild({
      classNames: 'wok-ui-ext-card-content',
      children: opts.content
    })
    if (opts.footer) {
      this.addChild({
        classNames: 'wok-ui-ext-card-footer',
        children: opts.footer
      })
    }
  }
}
