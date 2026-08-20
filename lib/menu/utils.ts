import { MenuItemData } from './types'

/**
 * 子菜单箭头 SVG。
 * @internal
 */
export function getArrowSvg(open: boolean): string {
  return open
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><polyline points="6 9 12 15 18 9"></polyline></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><polyline points="9 18 15 12 9 6"></polyline></svg>`
}

/**
 * 检查指定菜单项是否有子节点被选中。
 * @internal
 */
export function hasSelectedDescendant(
  item: MenuItemData,
  selectedKey?: string
): boolean {
  if (!selectedKey || !item.children) return false
  return item.children.some(child => {
    if (child.key === selectedKey) return true
    if (child.children) return hasSelectedDescendant(child, selectedKey)
    return false
  })
}
