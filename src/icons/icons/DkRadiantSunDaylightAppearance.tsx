import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkRadiantSunDaylightAppearance: Icon = createIcon('DkRadiantSunDaylightAppearance', [
  [
    'circle',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'cx': '12',
      'cy': '12',
      'r': '3.5'
    }
  ],
  [
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M12 3V5.5M12 18.5V21M3 12H5.5M18.5 12H21M5.6 5.6L7.5 7.5M16.5 16.5L18.4 18.4M18.4 5.6L16.5 7.5M7.5 16.5L5.6 18.4'
    }
  ]
])
