import { DivModule } from 'wok-ui'
import { getWokUiExtI18n } from '../i18n'
import { IconCheckCircle, IconExclamationTriangle, IconTimesCircle, IconInfoCircle, IconTimes } from '../icons'
import './style.less'

export interface ToastOpts {
  /**
   * 类型
   */
  type: 'success' | 'warning' | 'error' | 'info'
  /**
   * 消息内容
   */
  text: string
  /**
   * 持续时间
   */
  duration?: number
}

class Item extends DivModule {
  private timer: any = 0
  constructor(opts: ToastOpts) {
    super('wok-ui-ext-toast-item')
    this.el.classList.add(opts.type)
    // 图标
    switch (opts.type) {
      case 'success':
        this.addChild(new IconCheckCircle())
        break
      case 'warning':
        this.addChild(new IconExclamationTriangle())
        break
      case 'error':
        this.addChild(new IconTimesCircle())
        break
      case 'info':
        this.addChild(new IconInfoCircle())
        break
    }
    this.addChild(
      {
        tag: 'span',
        style: {
          flex: '1'
        },
        innerText: opts.text
      },
      {
        tag: 'span',
        classNames: 'wok-ui-ext-toast-close',
        children: new IconTimes(),
        onClick: () => this.destroy()
      }
    )
    const duration = opts.duration ?? 3000
    // 自动关闭
    this.timer = setTimeout(() => this.destroy(), opts.duration ?? 3000)

    // 实现鼠标悬停不会自动关闭
    this.el.addEventListener('mouseenter', () => clearTimeout(this.timer))
    // 鼠标离开后重新开始倒计时
    this.el.addEventListener('mouseleave', () => {
      this.timer = setTimeout(() => this.destroy(), duration)
    })
  }

  destroy() {
    clearTimeout(this.timer)
    super.destroy()
  }
}

class Container extends DivModule {
  constructor() {
    super('wok-ui-ext-toast-container')
  }

  addChild(child: Item): void {
    super.addChild(child)
  }
}

let container: Container | undefined

/**
 * 获取弹出式消息容器
 * @returns
 */
function getContainer() {
  if (!container) {
    container = new Container()
    container.mount(document.body)
  }
  return container
}

/**
 * 显示弹出式消息
 * @param opts
 */
export function showToast(opts: {
  /**
   * 类型
   */
  type: 'success' | 'warning' | 'error' | 'info'
  /**
   * 消息内容
   */
  text: string
  /**
   * 持续时间
   */
  duration?: number
}): void {
  getContainer().addChild(new Item(opts))
}

/**
 * 显示信息消息
 * @param text 消息内容
 */
export function showInfo(text: string): void {
  showToast({
    type: 'info',
    text
  })
}

function processErrMsg(errMsg: any): string {
  let message = ''
  if (typeof errMsg === 'string') {
    message = errMsg
  } else if (errMsg instanceof Error) {
    message = errMsg.message
    console.error(errMsg)
  } else {
    message = JSON.stringify(errMsg)
  }
  return message
}
/**
 * 显示错误消息
 * @param errMsg 错误消息内容
 */
export function showError(errMsg: any): void {
  showToast({
    type: 'error',
    text: processErrMsg(errMsg)
  })
}

/**
 * 显示警告消息
 * @param errMsg 警告消息内容
 */
export function showWarning(errMsg: any): void {
  showToast({
    type: 'warning',
    text: processErrMsg(errMsg)
  })
}
/**
 * 显示成功消息
 * @param text 成功消息内容
 */
export function showSuccess(text: string): void {
  showToast({
    type: 'success',
    text
  })
}
