import { DivModule } from 'wok-ui'
import { getWokUiExtI18n } from '../i18n'
import { IconCircleNotch } from '../icons'
import './style.less'

/**
 * <div class="wok-ui-ext-fullscreen-loading">
 * <span class="wok-ui-ext-loading-spinner"></span>
 * <span>Loading...</span>
 * </div>
 */
class FullscreenLoading extends DivModule {
  constructor(text?: string) {
    super('wok-ui-ext-fullscreen-loading')
    this.addChild({
      classNames: 'wok-ui-ext-loading-spinner',
      children: new IconCircleNotch()
    })
    if (text) {
      this.addChild({
        tag: 'span',
        innerText: text
      })
    }
  }
}

let fullscreenLoadingInstance: FullscreenLoading | undefined
/**
 * 显示全屏 loading
 *
 */
export function showLoading(msg?: string): void {
  if (fullscreenLoadingInstance) {
    hideLoading()
  }
  fullscreenLoadingInstance = new FullscreenLoading(msg || getWokUiExtI18n().buildMsg('loading-text'))
  fullscreenLoadingInstance.mount(document.body)
}

/**
 * 关闭全屏 loading
 */
export function hideLoading(): void {
  if (fullscreenLoadingInstance) {
    fullscreenLoadingInstance.destroy()
    fullscreenLoadingInstance = undefined
  }
}
