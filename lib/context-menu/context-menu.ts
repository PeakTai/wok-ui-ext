import { ConvertibleModule, DivModule } from 'wok-ui'
import { IconInput, resolveIcon, IconAngleRight } from '../icons'

/**
 * 菜单位置模式。
 * - 'cursor': 跟随指针（默认）
 * - 'top' | 'bottom' | 'left' | 'right': 锚定在触发元素的四边，空间不够时会自动调整
 */
export type MenuPosition = 'cursor' | 'top' | 'bottom' | 'left' | 'right'

/**
 * 菜单在次轴上的对齐方式。
 * - 'start': top/bottom 时左对齐，left/right 时顶对齐（默认）
 * - 'end': top/bottom 时右对齐，left/right 时底对齐
 */
export type MenuAlign = 'start' | 'end'

/**
 * 上下文菜单条目.
 */
export interface ContextMenuItem {
  /**
   * 菜单图标，可选.
   */
  icon?: IconInput
  /**
   * 菜单标题，太长会显示省略号.
   */
  label: ConvertibleModule
  /**
   * 是否是激活状态，可选.激活状态的菜单会显示为选中状态.不会触发点击回调.
   */
  active?: boolean
  /**
   * 菜单点击后的回调.
   */
  callback?: () => void
  /**
   * 子菜单，如果有值，则点击菜单会继续显示子菜单.如果没值，则点击菜单后会关闭掉上下文菜单.
   */
  children?: ContextMenuItem[]
}

/**
 * 上下文菜单，根据事件的反馈在适合的位置进行展示，避免遮挡。
 * 上下文的菜单可以有无限深的层级。每个上下文菜单中包含了菜单条目列表，每个条目点击后有可能直接触发回调，
 * 也有可能触发弹出子菜单，子菜单是新的上下文菜单实例。
 * 每个上下文菜单之间是单独的模块，独自挂载到 body 上，没有从属关系，内部通过记录关联，适当的进行销毁操作。
 * 每个上下文菜单销毁，都会自动销毁弹出的子菜单。
 */
export class ContextMenu extends DivModule {
  /**
   * 每个上下文永远只能同一时刻弹出一个子菜单，如果其它条目再次触发弹出子菜单，则销毁已经弹出的子菜单
   */
  private subMenu?: ContextMenu
  // 事件处理器
  private clickHandler?: (evt: Event) => void
  private scrollHandler?: () => void

  constructor(
    private readonly opts: {
      /**
       * 父菜单
       */
      parent?: ContextMenu
      /**
       * 菜单
       */
      menu: ContextMenuItem[]
      /**
       * 事件，用于定位和阻止冒泡
       */
      evt: MouseEvent
      /**
       * 菜单位置模式，默认 'cursor'
       */
      position?: MenuPosition
      /**
       * 次轴对齐方式，默认 'start'
       */
      align?: MenuAlign
      /**
       * 销毁时的回调
       * @returns
       */
      onDestroy?: () => void
    }
  ) {
    super('wok-ui-ext-context-menu')
    for (const item of opts.menu) {
      this.addChild({
        classNames: ['wok-ui-ext-context-menu-item', item.active ? 'active' : ''],
        children: add => {
          if (item.icon) {
            add({
              classNames: 'icon',
              children: resolveIcon(item.icon)
            })
          }
          add({
            classNames: 'text',
            children: item.label
          })
          if (item.children && item.children.length) {
            add(
              new IconAngleRight()
            )
          }
        },
        onClick: ev => {
          ev.stopPropagation()
          if (item.children && item.children.length) {
            if (this.subMenu) {
              this.subMenu.destroy()
            }
            this.subMenu = new ContextMenu({
              evt: ev,
              menu: item.children,
              parent: this
            })
            this.subMenu.mount(document.body)
            return
          }
          // 销毁所有上下文菜单，销毁根菜单，就会自动销毁所有
          this.getRoot().destroy()
          if (item.callback) {
            item.callback()
          }
        }
      })
    }
  }

  /**
   * 获取定位锚点的触发元素，通过事件获取
   */
  private getTriggerEl(): HTMLElement | null {
    if (this.opts.evt.currentTarget instanceof HTMLElement) return this.opts.evt.currentTarget
    return null
  }

  mount(parentEl: Element): void {
    const position = this.opts.position || 'cursor'
    const align = this.opts.align || 'start'
    // 1. 设置初始位置（插入 DOM 之前）
    if (position === 'cursor') {
      this.el.style.left = this.opts.evt.clientX + 'px'
      this.el.style.top = this.opts.evt.clientY + 'px'
    } else {
      const triggerEl = this.getTriggerEl()
      if (triggerEl) {
        const triggerRect = triggerEl.getBoundingClientRect()
        switch (position) {
          case 'bottom':
            this.el.style.left = (align === 'end' ? triggerRect.right : triggerRect.left) + 'px'
            this.el.style.top = triggerRect.bottom + 'px'
            break
          case 'top':
            // 先放在触发元素顶部，插入后测量高度再上移
            this.el.style.left = (align === 'end' ? triggerRect.right : triggerRect.left) + 'px'
            this.el.style.top = triggerRect.top + 'px'
            break
          case 'left':
            this.el.style.left = triggerRect.left + 'px'
            this.el.style.top = (align === 'end' ? triggerRect.bottom : triggerRect.top) + 'px'
            break
          case 'right':
            this.el.style.left = triggerRect.right + 'px'
            this.el.style.top = (align === 'end' ? triggerRect.bottom : triggerRect.top) + 'px'
            break
        }
      } else {
        // fallback: 触发元素不可用，跟随指针
        this.el.style.left = this.opts.evt.clientX + 'px'
        this.el.style.top = this.opts.evt.clientY + 'px'
      }
    }

    // 2. 插入 DOM
    super.mount(parentEl)

    // 3. 测量真实尺寸，进行方向感知的溢出修正
    const menuRect = this.el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    if (position === 'cursor') {
      // 跟随指针模式：沿用原有的简单贴边修正
      if (menuRect.left + menuRect.width > vw) {
        this.el.style.right = '10px'
        this.el.style.left = 'auto'
      }
      if (menuRect.top + menuRect.height > vh) {
        this.el.style.bottom = '0'
        this.el.style.top = 'auto'
      }
    } else {
      // 锚定模式：方向感知修正
      const triggerEl = this.getTriggerEl()
      if (triggerEl) {
        const triggerRect = triggerEl.getBoundingClientRect()
        this.adjustPlacement(position, align, triggerRect, menuRect, vw, vh)
      }
    }
    this.el.onscroll = ev => ev.stopPropagation()
    // 如果当前的上下文菜单是根菜单，则进行事件处理
    // 后续再有弹出的子菜单不会再进行事件处理
    if (!this.opts.parent) {
      this.clickHandler = evt => {
        const el = evt.target as HTMLElement
        if (this.containsEl(el)) {
          return
        }
        // 触发点击的元素不在菜单内，销毁所有上下文菜单
        this.destroy()
      }
      document.body.addEventListener('click', this.clickHandler)
      document.body.addEventListener('touchstart', this.clickHandler)
      // 如果页面发生滚动，销毁上下文菜单，页面位置一旦变动，菜单的定位就不准了
      this.scrollHandler = () => this.destroy()
      window.addEventListener('scroll', this.scrollHandler)
    }
  }

  /**
   * 锚定定位的方向感知溢出修正。
   * 主方向放不下时尝试对向，仍然放不下则回退到贴边。
   */
  private adjustPlacement(
    position: string,
    align: string,
    triggerRect: DOMRect,
    menuRect: DOMRect,
    vw: number,
    vh: number
  ) {
    const overflowsRight = menuRect.left + menuRect.width > vw + 2
    const overflowsBottom = menuRect.top + menuRect.height > vh + 2
    const overflowsLeft = menuRect.left < -2
    const overflowsTop = menuRect.top < -2

    // 修正 top 和 left 的初始位置（插入前无法知道菜单尺寸，放到了触发元素位置，现在上移/左移）
    if (position === 'top') {
      this.el.style.top = Math.max(0, triggerRect.top - menuRect.height) + 'px'
    } else if (position === 'left') {
      this.el.style.left = Math.max(0, triggerRect.left - menuRect.width) + 'px'
    }

    // 应用次轴对齐修正
    if (align === 'end') {
      if (position === 'bottom' || position === 'top') {
        // top/bottom: 右对齐 → 菜单右边缘对齐触发元素右边缘
        this.el.style.left = Math.max(0, triggerRect.right - menuRect.width) + 'px'
      } else {
        // left/right: 底对齐 → 菜单底边缘对齐触发元素底边缘
        this.el.style.top = Math.max(0, triggerRect.bottom - menuRect.height) + 'px'
      }
    }

    // 主方向溢出 → 切换到对向
    if (position === 'bottom' && overflowsBottom) {
      this.el.style.top = Math.max(0, triggerRect.top - menuRect.height) + 'px'
    } else if (position === 'top' && overflowsTop) {
      this.el.style.top = triggerRect.bottom + 'px'
    } else if (position === 'left' && overflowsLeft) {
      this.el.style.left = triggerRect.right + 'px'
    } else if (position === 'right' && overflowsRight) {
      this.el.style.left = Math.max(0, triggerRect.left - menuRect.width) + 'px'
    }

    // 最终边缘修正（防止任何方向跑出视口）
    const finalRect = this.el.getBoundingClientRect()
    if (finalRect.left + finalRect.width > vw) {
      this.el.style.left = 'auto'
      this.el.style.right = '10px'
    }
    if (finalRect.top + finalRect.height > vh) {
      this.el.style.bottom = '0'
      this.el.style.top = 'auto'
    }
    if (finalRect.left < 0) {
      this.el.style.left = '10px'
      this.el.style.right = 'auto'
    }
    if (finalRect.top < 0) {
      this.el.style.top = '10px'
      this.el.style.bottom = 'auto'
    }
  }

  getParent() {
    return this.opts.parent
  }
  /**
   * 获取根菜单模块
   * @returns
   */
  getRoot() {
    let root: ContextMenu = this
    while (true) {
      const parent = root.getParent()
      if (parent) {
        root = parent
      } else {
        break
      }
    }
    return root
  }
  /**
   * 判定指定的元素是否在模块内部，
   * 如果在子菜单的模块中，也算包含
   * @param el
   */
  containsEl(el: HTMLElement): boolean {
    if (this.subMenu) {
      if (this.subMenu.containsEl(el)) {
        return true
      }
    }
    return this.el.contains(el)
  }

  destroy(): void {
    if (this.subMenu) {
      this.subMenu.destroy()
      this.subMenu = undefined
    }
    //  解除事件，删除实例的引用
    if (this.clickHandler) {
      document.body.removeEventListener('click', this.clickHandler)
      document.body.removeEventListener('touchstart', this.clickHandler)
      this.clickHandler = undefined
    }
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler)
      this.scrollHandler = undefined
    }
    this.el.onscroll = null
    super.destroy()
    this.opts.onDestroy?.()
  }
}

/**
 * @deprecated 拼写错误，请使用 ContextMenu
 */
export const ConextMenu = ContextMenu
