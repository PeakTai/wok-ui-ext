import { Module } from 'wok-ui'

/**
 * 菜单项数据。
 */
export interface MenuItemData {
  /** 唯一标识 */
  key: string
  /** 图标模块（可选，传入 SvgIcon / RemoteSvgIcon 等 Module 实例） */
  icon?: Module
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
  /** 菜单宽度（px，数字）。默认 240 */
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
}
