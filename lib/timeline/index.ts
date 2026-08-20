import { DivModule, SubModulesOpt } from 'wok-ui'
import './style.less'

/**
 * 时间轴条目选项
 */
export interface TimelineItem {
  /**
   * 条目标题
   */
  title: string
  /**
   * 条目内容
   */
  content: SubModulesOpt
}

/**
 * 时间轴组件
 * 展示一系列按时间顺序排列的条目
 */
export class Timeline extends DivModule {
  constructor(opts: {
    // 显示序号
    showIndex?: boolean
    /**
     * 时间轴条目列表
     */
    items: TimelineItem[]
  }) {
    super('wok-ui-ext-timeline')

    for (const [index, item] of opts.items.entries()) {
      this.addChild({
        classNames: 'wok-ui-ext-timeline-item',
        children: [
          {
            classNames: 'wok-ui-ext-timeline-dot',
            innerText: opts.showIndex ? (index + 1).toString() : ''
          },
          {
            classNames: 'wok-ui-ext-timeline-content',
            children: [
              {
                classNames: 'wok-ui-ext-timeline-title',
                innerText: item.title
              },
              {
                classNames: 'wok-ui-ext-timeline-body',
                children: item.content
              }
            ]
          }
        ]
      })
    }
  }
}
