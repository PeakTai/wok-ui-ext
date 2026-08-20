import { FullRenderingModule, ConvertibleModule } from 'wok-ui'
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
export class Steps extends FullRenderingModule {
  /**
   * 当前步骤索引（从 0 开始）
   */
  private current: number
  private readonly status: 'process' | 'error'
  private readonly direction: 'horizontal' | 'vertical'
  private readonly onChange?: (index: number) => void

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
      /**
       * 点击步骤时触发，参数为步骤索引
       */
      onChange?: (index: number) => void
    }
  ) {
    super('wok-ui-ext-steps')
    const { current = 0, status = 'process', direction = 'horizontal', onChange } = opts
    this.current = current
    this.status = status
    this.direction = direction
    this.onChange = onChange
    this.el.classList.add(direction === 'vertical' ? 'wok-ui-ext-steps-vertical' : 'wok-ui-ext-steps-horizontal')
    this.render()
  }

  protected buildContent(): void {
    const { items } = this.opts
    const lastIndex = items.length - 1
    const hasCallback = !!this.onChange

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      // 推断步骤状态
      let stepStatus: string
      if (i < this.current) {
        stepStatus = this.status === 'error' && i === this.current - 1 ? 'error' : 'finish'
      } else if (i === this.current) {
        stepStatus = this.status
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
        classNames: ['wok-ui-ext-step-item', `wok-ui-ext-step-${stepStatus}`, hasCallback ? 'wok-ui-ext-step-clickable' : ''],
        style: this.direction === 'horizontal' ? { width: `${100 / items.length}%` } : undefined,
        onClick: hasCallback
          ? () => {
              this.current = i
              this.render()
              this.onChange?.(i)
            }
          : undefined,
        children: add => {
          // 步骤头：包含连接线与图标
          add({
            classNames: 'wok-ui-ext-step-head',
            children: addHead => {
              // 连接线
              if (i < lastIndex) {
                const isErrorTail = this.status === 'error' && i === this.current - 1
                addHead({
                  classNames: [
                    'wok-ui-ext-step-tail',
                    i < this.current ? 'wok-ui-ext-step-tail-active' : '',
                    isErrorTail ? 'wok-ui-ext-step-tail-error' : ''
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
