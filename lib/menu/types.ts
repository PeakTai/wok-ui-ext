import { IconInput } from '../icons'

/**
 * 菜单项数据。
 */
export interface MenuItemData {
  /** 唯一标识 */
  key: string
  /** 图标（可选，支持 SvgIcon / RemoteSvgIcon 实例、CSS class、内联 SVG 或图片 URL） */
  icon?: IconInput
  /** 显示文本 */
  label: string
  /** 是否禁用 */
  disabled?: boolean
  /** 子菜单项 */
  children?: MenuItemData[]
}

/**
 * 菜单配置选项。
 */
export interface MenuOptions {
  /** 菜单数据 */
  items: MenuItemData[]
  /** 当前选中项 key */
  selectedKey?: string
  /** 是否折叠（仅显示图标） */
  collapsed?: boolean
  /** 菜单宽度（px，数字）。不设置时自适应父容器 */
  width?: number
  /** 点击菜单项回调 */
  onClick?: (key: string) => void
}

/** @internal 菜单内部上下文 */
export interface ItemContext {
  selectedKey?: string
  collapsed: boolean
  onClick?: (key: string) => void
  setSelectedKey: (key: string) => void
  /** 注册子节点，便于 collapsed 切换时通知 */
  registerNode: (node: { setCollapsed: (v: boolean) => void }) => void
}
