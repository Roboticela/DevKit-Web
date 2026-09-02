export type { BrandAttr, BrandGlyph, BrandNode, Icon, IconNode, IconProps } from './types'
export { createBrandIcon, createIcon } from './create-icon'
export { describeIcon, iconTags } from './tags'

export * from './icons/index'

import type { Icon } from './types'
import * as icons from './icons/index'

export { icons }

function isIconExport(value: unknown): value is Icon {
  return typeof value === 'function'
}

export const ICON_NAMES = Object.keys(icons)
  .filter((name) => name.startsWith('Dk') && isIconExport(icons[name as keyof typeof icons]))
  .sort()
export { PROVIDER_ICON_NAMES } from './icons/provider/index'
export { BRAND_ICON_NAMES } from './icons/brand/index'
