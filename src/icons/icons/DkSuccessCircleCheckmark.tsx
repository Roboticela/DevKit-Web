import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkSuccessCircleCheckmark: Icon = createIcon('DkSuccessCircleCheckmark', [
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
      'd': 'M7.5 12.5L10.5 15.5L16.5 9.5'
    }
  ]
])
