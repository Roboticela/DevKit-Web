import { createBrandIcon } from '../../create-icon'
import type { BrandGlyph, Icon } from '../../types'

const FACEBOOK_BRAND_LOGO_GLYPH: BrandGlyph = {
  a: { viewBox: '0 0 24 24' },
  c: [
    {
      t: 'path',
      a: {
        fill: '#1877F2',
        d: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97H15.83c-1.491 0-1.956.93-1.956 1.885v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z',
      },
    },
  ],
}

export const DkFacebookBrandLogo: Icon = createBrandIcon('DkFacebookBrandLogo', FACEBOOK_BRAND_LOGO_GLYPH)
