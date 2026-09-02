import { createBrandIcon } from '../../create-icon'
import type { BrandGlyph, Icon } from '../../types'

const DEVKIT_BRAND_LOGO_GLYPH: BrandGlyph = {
  a: { viewBox: '0 0 24 24' },
  c: [
    {
      t: 'rect',
      a: {
        x: '3',
        y: '3',
        width: '18',
        height: '18',
        rx: '3',
        stroke: '#8b5cf6',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
      },
    },
    {
      t: 'path',
      a: {
        d: 'M10 8L6 12L10 16',
        stroke: '#10b981',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
      },
    },
    {
      t: 'path',
      a: {
        d: 'M14 8L18 12L14 16',
        stroke: '#10b981',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
      },
    },
  ],
}

export const DkDevKitBrandLogo: Icon = createBrandIcon('DkDevKitBrandLogo', DEVKIT_BRAND_LOGO_GLYPH)
