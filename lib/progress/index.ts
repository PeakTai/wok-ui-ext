import {
  DivModule, SubModulesOpt
} from 'wok-ui'
import './style.less'

/**
 * 进度条支持的状态颜色
 */
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger'

/**
 * 格式化进度值，保留最多两位小数
 */
function formatProgress(progress: number): string {
  const fixed = progress.toFixed(2)
  // 去掉多余的末尾 0，如 "75.00" 显示为 "75"
  return fixed.replace(/\.?0+$/, '')
}

/**
 * 进度条组件
 * 
 <div class="progress-item">
    <div class="progress-label"><span>任务进度</span> <span>75%</span></div>
    <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:75%"></div>
    </div>
</div>
 */
export class Progress extends DivModule {
  /**
   * 进度条组件
   * @param opts.label 进度条标签，支持字符串或子模块
   * @param opts.progress 进度条进度，0-100
   * @param opts.showProgress 是否显示进度数字
   * @param opts.color 进度条颜色，默认 primary
   * @param opts.text 自定义进度文本，如 "85/100分"，设置后将替代百分比显示
   */
  constructor(opts: { label?: SubModulesOpt; progress: number; showProgress?: boolean; color?: ProgressColor; text?: string }) {
    super('wok-ui-ext-progress-item')
    if (opts.color && opts.color !== 'primary') {
      this.el.classList.add(`wok-ui-ext-progress-${opts.color}`)
    }
    if (opts.label || opts.showProgress || opts.text) {
      this.addChild({
        classNames: 'wok-ui-ext-progress-label',
        children: [
          {
            tag: 'span',
            children: opts.label || ''
          },
          {
            tag: 'span',
            classNames: 'wok-ui-ext-progress-percent',
            innerText: opts.text ?? (opts.showProgress ? `${formatProgress(opts.progress)}%` : '')
          }
        ]
      })
    }
    this.addChild({
      classNames: 'wok-ui-ext-progress-bar-bg',
      children: [
        {
          classNames: 'wok-ui-ext-progress-bar-fill',
          style: {
            width: `${formatProgress(opts.progress)}%`
          }
        }
      ]
    })
  }

  setProgress(progress: number, text?: string) {
    this.el.querySelector('.wok-ui-ext-progress-bar-fill')?.setAttribute('style', `width: ${formatProgress(progress)}%`)
    const percent = this.el.querySelector('.wok-ui-ext-progress-percent')
    if (percent) {
      percent.textContent = text ?? `${formatProgress(progress)}%`
    }
  }
}
