import { DivModule, ConvertibleModule } from 'wok-ui'
import { IconInput, resolveIcon } from '../icons'
import './style.less'

export interface StepItem {
  title: string
  description?: string
  icon?: IconInput
}

/**
 * 步骤条组件
 */
export class Steps extends DivModule {
  constructor(
    private readonly opts: {
      /**
       * 步骤项列表
       */
      items: StepItem[]
      /**
       * 当前步骤索引（从 0 开始），默认 0
       */
      current?: number
      /**
       * 步骤状态：'process' 表示正在处理中，'error' 表示出错
       * 默认会自动根据 current 推断
       */
      status?: 'process' | 'error'
      /**
       * 方向，默认 'horizontal'
       */
      direction?: 'horizontal' | 'vertical'
    }
  ) {
    super('wok-ui-ext-steps')
    const { direction = 'horizontal' } = opts
    this.el.classList.add(direction === 'vertical' ? 'wok-ui-ext-steps-vertical' : 'wok-ui-ext-steps-horizontal')
    this.render()
  }

  private render(): void {
    const { items, current = 0, status = 'process' } = this.opts
    const lastIndex = items.length - 1

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      // 推断步骤状态
      let stepStatus: string
      if (i < current) {
        stepStatus = status === 'error' && i === current - 1 ? 'error' : 'finish'
      } else if (i === current) {
        stepStatus = status
      } else {
        stepStatus = 'wait'
      }

      // 构建步骤 body 子元素
      const bodyChildren: Array<{ classNames: string; children: string }> = [
        { classNames: 'wok-ui-ext-step-title', children: item.title }
      ]
      if (item.description) {
        bodyChildren.push({ classNames: 'wok-ui-ext-step-description', children: item.description })
      }

      this.addChild({
        classNames: ['wok-ui-ext-step-item', `wok-ui-ext-step-${stepStatus}`],
        children: add => {
          // 步骤头：包含连接线与图标
          add({
            classNames: 'wok-ui-ext-step-head',
            children: addHead => {
              // 连接线
              if (i < lastIndex) {
                addHead({
                  classNames: [
                    'wok-ui-ext-step-tail',
                    i < current ? 'wok-ui-ext-step-tail-active' : ''
                  ]
                })
              }
              // 图标/序号
              addHead({
                classNames: 'wok-ui-ext-step-icon',
                children: this.buildHeadContent(stepStatus, i, item)
              })
            }
          })
          // 步骤主体
          add({
            classNames: 'wok-ui-ext-step-body',
            children: addBody => {
              for (const child of bodyChildren) {
                addBody(child)
              }
            }
          })
        }
      })
    }
  }

  private buildHeadContent(
    status: string,
    index: number,
    item: StepItem
  ): ConvertibleModule {
    if (item.icon && (status === 'finish' || status === 'error')) {
      return resolveIcon(item.icon)
    }
    return String(index + 1)
  }
}
