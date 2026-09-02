import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkAnalogClockTime: Icon = createIcon('DkAnalogClockTime', [
  [
    'circle',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'cx': '12',
      'cy': '12',
      'r': '9'
    }
  ],
  [
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M12 7V12L15.5 14'
    }
  ]
])
