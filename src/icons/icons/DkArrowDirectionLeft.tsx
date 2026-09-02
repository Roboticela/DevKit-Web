import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkArrowDirectionLeft: Icon = createIcon('DkArrowDirectionLeft', [
  [
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M11 6L5 12L11 18'
    }
  ],
  [
    'line',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'x1': '5',
      'y1': '12',
      'x2': '19',
      'y2': '12'
    }
  ]
])
