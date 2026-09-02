import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkWarningTriangleAlert: Icon = createIcon('DkWarningTriangleAlert', [
  [
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M12 4.5L20.5 19.5H3.5L12 4.5Z'
    }
  ],
  [
    'line',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'x1': '12',
      'y1': '10',
      'x2': '12',
      'y2': '14.5'
    }
  ],
  [
    'circle',
    {
      'stroke': 'none',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'cx': '12',
      'cy': '17',
      'r': '0.9',
      'fill': 'currentColor'
    }
  ]
])
