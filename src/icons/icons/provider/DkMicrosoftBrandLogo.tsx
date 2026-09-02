import { createBrandIcon } from '../../create-icon'
import type { BrandGlyph, Icon } from '../../types'

const MICROSOFT_BRAND_LOGO_GLYPH: BrandGlyph = {
  a: { viewBox: '0 0 24 24' },
  c: [
    { t: 'path', a: { fill: '#F35325', d: 'M2 2h9.5v9.5H2z' } },
    { t: 'path', a: { fill: '#81BC06', d: 'M12.5 2H22v9.5H12.5z' } },
    { t: 'path', a: { fill: '#05A6F0', d: 'M2 12.5h9.5V22H2z' } },
    { t: 'path', a: { fill: '#FFBA08', d: 'M12.5 12.5H22V22H12.5z' } },
  ],
}

export const DkMicrosoftBrandLogo: Icon = createBrandIcon('DkMicrosoftBrandLogo', MICROSOFT_BRAND_LOGO_GLYPH)
