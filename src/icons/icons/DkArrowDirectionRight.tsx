import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkArrowDirectionRight: Icon = createIcon('DkArrowDirectionRight', [
  [
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M13 6L19 12L13 18'
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
