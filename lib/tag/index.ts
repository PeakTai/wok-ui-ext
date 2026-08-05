import { DivModule, SubModulesOpt } from 'wok-ui'
import { IconInput, resolveIcon, IconTag, IconEdit, IconTimes, IconEllipsisH } from '../icons'
import './style.less'

/**
 * 标签组件
 */
export class Tag extends DivModule {
  /**
   * 标签组件
   * @param opts
   * @param opts.icon 图标，默认 tag 图标
   * @param opts.text 标签文本
   * @param opts.onEdit 编辑回调，有值时显示编辑图标，点击后调用回调
   * @param opts.onDelete 删除回调，有值时显示删除图标，点击后调用回调
   * @param opts.onMenu 菜单回调，有值时显示菜单图标（三个点），点击后调用回调，用于展示更多操作
   * @param opts.block 是否块级元素，默认 false，块级元素时标签会占满整行，编辑和删除图片在悬浮时才出现
   * @param opts.active 是否活跃状态，默认 false
   * @param opts.onClick 点击回调，有值时点击标签调用回调
   */
  constructor(opts: {
    icon?: IconInput
    text: SubModulesOpt
    onEdit?: () => void
    onDelete?: () => void
    onMenu?: (e: MouseEvent) => void
    block?: boolean
    active?: boolean
    onClick?: (evt: MouseEvent) => void
  }) {
    super('wok-ui-ext-tag')
    if (opts.block) {
      this.el.classList.add('block')
    }
    if (opts.active) {
      this.el.classList.add('active')
    }
    const icon = opts.icon ? resolveIcon(opts.icon) : new IconTag()
    this.addChild(icon, {
      classNames: 'wok-ui-ext-tag-name',
      children: opts.text,
      preHandle(el) {
        if (opts.onClick) {
          el.addEventListener('click', opts.onClick)
        }
      }
    })

    // 编辑图标
    if (opts.onEdit) {
      this.addChild({
        classNames: 'icon-action',
        children: new IconEdit(),
        onClick: e => {
          e.stopPropagation()
          opts.onEdit?.()
        }
      })
    }
    // 删除图标
    if (opts.onDelete) {
      this.addChild({
        classNames: 'icon-action',
        children: new IconTimes(),
        onClick: e => {
          e.stopPropagation()
          opts.onDelete?.()
        }
      })
    }

    // 菜单图标
    if (opts.onMenu) {
      this.addChild({
        classNames: 'icon-action',
        children: new IconEllipsisH(),
        onClick: e => {
          e.stopPropagation()
          opts.onMenu?.(e)
        }
      })
    }
  }
}
