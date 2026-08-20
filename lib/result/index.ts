import { DivModule, SubModulesOpt, SvgIcon } from 'wok-ui'
import './style.less'
import { IconCheckCircle, IconTimesCircle, IconInfoCircle, IconExclamationTriangle } from '../icons'

function getStatusIcon(status: string): SvgIcon {
  switch (status) {
      case 'success':
        return new IconCheckCircle()
      case 'error':
        return new IconTimesCircle()
      case 'warning':
        return new IconInfoCircle()
      case 'info':
      default:
        return new IconInfoCircle()
  }
}

export interface ResultOptions {
  /** 结果状态 */
  status: 'success' | 'error' | 'info' | 'warning'
  /** 主标题 */
  title: string
  /** 副标题（可选） */
  subTitle?: string
  /** 操作区（通常放按钮） */
  extra?: SubModulesOpt
}

/**
 * 结果页组件
 *
 * 用于操作反馈的结果展示，支持成功/失败/信息/警告四种状态。
 *
 * @example
 * ```ts
 * // 成功结果
 * new Result({
 *   status: 'success',
 *   title: '操作成功',
 *   subTitle: '数据已保存',
 *   extra: new Button({ text: '返回列表', onClick: () => router.back() })
 * })
 *
 * // 错误结果
 * new Result({
 *   status: 'error',
 *   title: '提交失败',
 *   subTitle: '请检查网络后重试'
 * })
 * ```
 */
export class Result extends DivModule {
  constructor(private opts: ResultOptions) {
    super('wok-ui-ext-result')

    // 图标
    this.addChild({
      classNames: ['wok-ui-ext-result-icon', opts.status],
      children: getStatusIcon(opts.status)
    })

    // 标题
    this.addChild({
      tag: 'div',
      classNames: 'wok-ui-ext-result-title',
      innerText: opts.title
    })

    // 副标题
    if (opts.subTitle) {
      this.addChild({
        tag: 'div',
        classNames: 'wok-ui-ext-result-subtitle',
        innerText: opts.subTitle
      })
    }

    // 操作区
    if (opts.extra) {
      this.addChild({
        classNames: 'wok-ui-ext-result-extra',
        children: opts.extra
      })
    }
  }
}
